import { View } from './View';
import { PaintEngine } from "./PaintEngine"

/** 图例 */
export class Item {
    /** 视图 */
    view: View | null = null

    /** parent 属性存值函数 */
    private _parent: Item | null = null;
    get parent(): Item | null {
        return this._parent;
    }
    set parent(v: Item | null) {
        // 如果 parent 未变更
        if (this.parent == v) {
            return;
        }
        // 如果原 parent 不为空
        if (this._parent != null) {
            // 将节点从原 parent 节点中摘除
            let i = this._parent.children.indexOf(this);
            this._parent.children.splice(i, 1);
        }
        this._parent = v;
        this.update();
        // 如果新 parent 不为空
        if (this._parent != null) {
            // 将节点加入到新 parent 节点中
            this._parent.children.push(this);
        }
    }

    /** 是否可见 */
    private _visible: boolean = true;
    get visible(): boolean {
        return this._visible;
    }
    set visible(v: boolean) {
        this._visible = v;
        this.update();
    }

    /** 子节点 */
    children: Item[] = [];
    constructor(parent: Item | null = null) {
        if (parent) {
            this.parent = parent;
        }
    }


    /**
     * 更新 Item
     */
    update(): void {
        if (null != this.view) {
            this.view.update();
        }
    }

    /**
     * 在此层级下添加 item
     *
     * @param item  要添加的 item
     */
    addItem(item: Item): void {
        item.parent = this;
    }

    /**
     * 从场景中移除 Item。
     *
     * @param item        被移除的对象
     */
    removeItem(item: Item): void {
        item.parent = null;
    }


    /**
    * Item 绘制框架
    *
    * @param painter   绘制对象
    */
    onPaint(painter: PaintEngine): void {
        this.onDraw(painter);
        for (let item of this.children) {
            // 如果 item 不可见
            if (!item.visible) {
                continue;
            }
            // 保存画布状态
            painter.save();
            try {
                item.onPaint(painter);
            } catch (e) {
                console.log(e);
            }
            // 恢复画布状态
            painter.restore();
        }
    }

    /**
     * Item 绘制操作
     *
     * @param painter    绘制对象
     */
    onDraw(painter: PaintEngine): void {

    }
}