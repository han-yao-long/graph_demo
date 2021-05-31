
import { View } from "./View"
/** 引擎 */
export class PaintEngine {

    /** canvas 上下文 */
    public canvas: CanvasRenderingContext2D | null = null;

    /**
     * 构造函数
     *
     * @param canvas canvas上下文 ctx
     */
    constructor(view: View) {
        this.canvas = view.canvas;
    }

    /**
     * 保存
     */
    save() {
        if (!this.canvas) return;
        this.canvas.save()
    }

    /**
     * 释放
     */
    restore() {
        if (!this.canvas) return;
        this.canvas.restore()
    }

    /**
     * 绘制矩形
     *
     * @param data 矩形参数
     */
    drawRect(data: any): void {
        if (!this.canvas) return;
        this.canvas.fillStyle = "red";
        this.canvas.strokeStyle = "blue";
        this.canvas.beginPath();
        this.canvas.rect(data.x, data.y, data.width, data.height);
        this.canvas.stroke();
        this.canvas.fill();
    }

    /**
     * 绘制直线
     *
     * @param data 直线参数
     */
    drawLine(data: any): void {
        if (!this.canvas) return;
        this.canvas.beginPath();
        this.canvas.moveTo(data.x1, data.y1);
        this.canvas.lineTo(data.x2, data.y2);
        this.canvas.stroke();

    }

    /**
     *  绘制多边形
     *
     * @param points 参数
     */
    drawPolygon(points: any): void {
        if (!this.canvas) return;
        // 多边形至少要有3个节点
        if (points.length < 3) {
            return;
        }

        this.canvas.beginPath();
        this.canvas.moveTo(points[0].x, points[0].y);

        // 遍历顶点数组，绘制折线
        for (let p of points) {
            this.canvas.lineTo(p.x, p.y);
        }

        this.canvas.closePath();
        this.canvas.fill();
        this.canvas.stroke();
    }

    /**
     * 绘制折线
     *
     * @param data 参数
     */
    drawPolyline(data: any): void {
        if (!this.canvas) return;
        this.canvas.beginPath();
        this.canvas.moveTo(data[0].x, data[0].y);

        // 遍历折线折点数组，绘制折线
        for (let p of data) {
            this.canvas.lineTo(p.x, p.y);
        }
        this.canvas.stroke();
    }

    /**
     * 绘制图片
     *
     * @param data 参数
     */
    drawImage(img: CanvasImageSource,
        x: number,
        y: number,
        width: number,
        height: number,): void {
        if (!this.canvas) return;
        this.canvas.drawImage(img, x, y, width, height as number);
    }

    /**
     * 绘制文本
     *
     * @param data 参数
     */

    drawText(data: any): void {

    }

    /**
     * 绘制圆形
     *
     * @param data 参数
     */

    drawCircle(cx: number, cy: number, r: number): void {
        if (!this.canvas) return;
        this.canvas.beginPath();
        this.canvas.arc(cx, cy, r, 0, 2 * Math.PI, true);
        this.canvas.fill();
        this.canvas.stroke();
    }


    /**
     * 绘制圆弧
     *
     * @param cx    圆心 x 坐标
     * @param cy    圆心 y 坐标
     * @param r     圆半径
     */
    drawArc(cx: number, cy: number, r: number, startAngle: number = 0, endAngle: number = 0, isTrue = true): void {
        if (!this.canvas) return;
        this.canvas.beginPath();
        this.canvas.arc(cx, cy, r, startAngle * Math.PI, endAngle * Math.PI, isTrue);
        this.canvas.fill();
        this.canvas.stroke();
    }


    /**
     * 清空矩形区域
     *
     * @param rect  矩形
     */
    clearRect(x: number, y: number, width: number, height: number): void {
        if (!this.canvas) return;
        this.canvas.clearRect(x, y, width, height);
    }

    /**
     * 平移变换
     *
     * @param x     X 轴方向平移
     * @param y     Y 辆方向平移
     */
    translate(dx: number, dy: number): void {
        if (!this.canvas) return;
        this.canvas.transform(1, 0, 0, 1, dx, dy);
    }

    /**
    * 放缩变换
    *
    * @param x     X 轴方向平移
    * @param y     Y 辆方向平移
    */
    scale(sx: number, sy: number): void {
        if (!this.canvas) return;
        this.canvas.transform(0, sy, sx, 0, 0, 0);
    }

    /**
     * 设置填充色
     */
    setFillstyle(v: string) {
        if (!this.canvas) return;
        this.canvas.fillStyle = v;
    }
    /**
    * 设置边框色
    */
    setStrokeStyle(v: string) {
        if (!this.canvas) return;
        this.canvas.strokeStyle = v;
    }

    /**
     * 设置线宽
     */
    setLineWidth(v: number) {
        if (!this.canvas) return;
        this.canvas.lineWidth = v
    }
}