import { Item } from "../Item";
import { PaintEngine } from "../PaintEngine"
export class Arc extends Item {


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
    /** 边框色 */
    _lineWidth: number = 1
    get lineWidth() {
        return this._lineWidth;
    }
    set lineWidth(v: number) {
        this._lineWidth = v
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
     * Item 绘制操作
     *
     * @param painter    绘制对象
     */
    onDraw(painter: PaintEngine): void {
        painter.setFillstyle(this.fillColor);
        painter.setStrokeStyle(this.strokeStyle);
        painter.setLineWidth(this.lineWidth);
        if (!painter.canvas) return;
        painter.canvas.lineCap = "round"
        painter.drawArc(this.data.x, this.data.y, this.data.r, 0, 1, true);
    }
}