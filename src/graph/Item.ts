import { View } from './View';
import { PaintEngine } from "./PaintEngine"
import { SMatrix } from "./until/SMatrix"

/** 图例 */
export class Item {


    /** 视图 */
    view: View | null = null;

    /** 是否符合移动条件 */
    _isMoving: boolean = false;
    /** 是否可移动 */
    moveable: boolean = false;

    //当前图例的矩阵
    SMatrix: SMatrix = new SMatrix()






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
     * Item 对象边界区域
     *
     * @return 对象边界区域
     */
    boundingRect(): any {
        return {
            x: 0,
            y: 0,
            width: 10,
            height: 10
        }
    }

    /**
    * 判断 item 是否包含点 x, y
    *
    * @param x     横坐标（当前 item）
    * @param y     纵坐标（当前 item）
    * @return item 是否包含点 x, y
    */
    contains(x: number, y: number): boolean {

        const left = this.boundingRect().x;
        const right = this.boundingRect().x + this.boundingRect().width;
        const top = this.boundingRect().y;
        const bottom = this.boundingRect().y + this.boundingRect().height;
        return (
            x >= left &&
            x <= right &&
            y >= top &&
            y <= bottom
        );
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
        item.view = this.view;
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
        painter.translate(this.SMatrix.e, this.SMatrix.f);
        painter.scale(this.SMatrix.a, this.SMatrix.d);
        this.onDraw(painter);

        for (let item of this.children) {
            // this.item.SMatrix.translate(this.x, this.y);
            // this.item.SMatrix.scale(this.scale, this.scale)
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

    ///////////////////////////////////////////////////////
    /**
     *
     * @param event   保存事件参数
     * @return 是否处理事件
     */
    onMouseDown(event: any): boolean {
        for (let i = this.children.length - 1; i >= 0; i--) {
            try {
                let item = this.children[i];
                // 获取item下的坐标原点
                const ce = event;
                ce.sceneX = ce.sceneX + this.origin.x;
                ce.sceneY = ce.sceneY + this.origin.y;
                item.onMouseDown(event)
                if (item.contains(ce.sceneX, ce.sceneY) && item.onMouseDown(event)) {
                    // 如果点在子项目上且子项目处理了事件
                    return true;
                }
            } catch (e) {
                console.log(e);
            }
        }

        // 可移动
        if (this.moveable) {
            this._isMoving = true;
            return true;
        }
        return false;
    }

    /**
 * 鼠标移动事件
 *
 * @param event   保存事件参数
 * @return 是否处理事件
 */
    onMouseMove(event: any): boolean {
        // 遍历子节点
        for (let i = this.children.length - 1; i >= 0; i--) {
            let item = this.children[i];
            // 获取item下的坐标原点
            const ce = event;
            ce.sceneX = ce.sceneX + this.origin.x;
            ce.sceneY = ce.sceneY + this.origin.y;
            if (item.contains(ce.x, ce.y) && item.onMouseMove(ce)) {
                // 如果点在子项目上且子项目处理了事件
                return true;
            }
        }


        if (this.moveable && this._isMoving) {

            const mp = this.toParentChange(
                event.x - this._mouseDownPos.x,
                event.y - this._mouseDownPos.y
            );
            this.moveTo(this.pos.x + mp.x, this.pos.y + mp.y);
            this.$emit("onMove", old, this.pos);
            // 刚开始移动存储旧的坐标
            if (!this._oldPos) {
                this._oldPos = old;
            }
        }

        return true;
    }

    /**
     * 释放鼠标事件
     *
     * @param event   保存事件参数
     * @return 是否处理事件
     */
    onMouseUp(event: any): boolean {
        // 遍历子节点
        for (let i = this.children.length - 1; i >= 0; i--) {
            let item = this.children[i];
            const ce = event;
            ce.sceneX = ce.sceneX + this.origin.x;
            ce.sceneY = ce.sceneY + this.origin.y;
            if (item.contains(ce.x, ce.y) && item.onMouseUp(ce)) {
                // 如果点在子项目上且子项目处理了事件
                return true;
            }
        };

        // 处于移动态
        if (this._isMoving) {
            this._isMoving = false;
        }
        return false;
    }

    /**
     * Item 绘制操作
     *
     * @param painter    绘制对象
     */
    onDraw(painter: PaintEngine): void {

    }
}