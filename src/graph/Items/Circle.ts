import { Item } from "./../Item";
import { PaintEngine } from "./../PaintEngine"
import { SMathUtil } from "./../until/SMathUtil"
export class Circle extends Item {


    /** 参数 */
    data: any

    /** 填充色 */
    _fillColor: string = "#000000"
    get fillColor() {
        return this._fillColor;
    }
    set fillColor(v: string) {
        this._fillColor = v
    }

    /** 边框色 */
    _strokeStyle: string = "#000000"
    get strokeStyle() {
        return this._strokeStyle;
    }
    set strokeStyle(v: string) {
        this._strokeStyle = v
    }

    /**
     * 构造函数
     *
     * @param parent 父
     */
    constructor(parent: Item | null = null, data: any) {
        super()
        if (parent) {
            this.parent = parent;
        };
        this.data = data
    }

    /**
      * 判断 item 是否包含点 x, y
      *
      * @param x     横坐标（当前 item）
      * @param y     纵坐标（当前 item）
      * @return item 是否包含点 x, y
      */
    contains(x: number, y: number): boolean {
        const isIn = SMathUtil.pointDistance(x, y, this.data.x, this.data.y) < this.data.r
        if (isIn) {
            console.log('点击')
            return true
        } else {
            return false
        }
    }

    /**
     * 
     * @param event   保存事件参数
     * @return 是否处理事件
     */
    onMouseDown(event: any): boolean {
        super.onMouseDown(event);
        return true
    }

    /**
     * Item 绘制操作
     *
     * @param painter    绘制对象
     */
    onDraw(painter: PaintEngine): void {
        painter.setFillstyle(this.fillColor);
        painter.setStrokeStyle(this.strokeStyle)
        painter.drawCircle(this.data.x, this.data.y, this.data.r);
        painter.setFillstyle('"#cccccc"')
        painter.drawCircle()
    }
}