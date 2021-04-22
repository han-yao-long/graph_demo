import { View } from './view';


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
            // this._parent.children.sort(SGraphItem.sortItemZOrder);
        }
    }

    /** 子节点 */
    children: Item[] = [];
    constructor(parent: Item | null = null) {

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
}