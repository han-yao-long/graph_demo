
import { PaintEngine } from "./PaintEngine"
import { Item } from "./Item"
/** 视图 */
export class View {

    /** canvas 视图 */
    protected readonly canvasView: HTMLCanvasElement;

    protected root: Item = new Item();

    /** canvas 上下文 */
    get canvas(): CanvasRenderingContext2D | null {
        return this.canvasView.getContext("2d") as CanvasRenderingContext2D;
    }
    /** 需要绘制 */
    private _needDraw = true;

    /** 宽度 */
    get width(): number {
        return this.canvasView.width;
    }

    /** 高度 */
    get height(): number {
        return this.canvasView.height;
    }

    constructor(id: string) {
        this.canvasView = document.getElementById(id) as HTMLCanvasElement;
        this.root.view = this;
        this.loop();
    }

    /**
     * 循环
     */
    protected loop(): void {
        // 存在 canvas 对象，并且需要刷新
        if (null != this.canvas && this._needDraw) {
            this._needDraw = false;
            let painter = new PaintEngine(this);
            this.onDraw(painter);
        }

        window.requestAnimationFrame(this.loop.bind(this));
    }


    /**
     * 更新视图
     */
    update(): void {
        this._needDraw = true;
    }

    /**
    * 添加 item 对象到场景。
    *
    * @param item        添加的对象
    */
    addItem(item: Item): void {
        item.parent = this.root;
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
     * 绘制视图
     *
     * @param painter     painter 对象
     */
    protected onDraw(painter: PaintEngine): void {
        //清空上一帧画
        painter.save();
        painter.clearRect(0, 0, this.width, this.height);
        painter.restore();

        // 绘制item树
        painter.save();
        this.root.onPaint(painter)
        painter.restore();
    }
}