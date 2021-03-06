
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

    /** 原点坐标 */
    _origin: any = {
        x: 0, y: 0
    }

    /** 缩放比例 */
    scale: number = 1

    /** 鼠标滚轮缩放速度 */
    wheelZoom = 1.05;

    /** 鼠标中键按下时位置 */
    private _midKeyPos: any = {
        x: 0, y: 0
    };
    get origin() {
        return this._origin;
    }
    set origin(v: any) {
        this._origin.x = v.x;
        this._origin.y = v.y;
        this._needDraw = true;
    }

    constructor(id: string) {
        this.canvasView = document.getElementById(id) as HTMLCanvasElement;
        this.root.view = this;
        // 中心点居中
        this.origin = { x: this.width / 2, y: this.height / 2 };
        // 绑定事件
        this.bindEvent(this.canvasView);

        this.loop();
    }

    /**
     * 绑定事件
     *
     * @param element     要绑定事件的元素
     */
    private bindEvent(element: HTMLElement): void {
        // 绑定鼠标事件
        element.onmousedown = this.onMouseDown.bind(this);
        element.onmousemove = this.onMouseMove.bind(this);
        element.onmouseup = this.onMouseUp.bind(this);

        // 绑定按键事件
        element.onkeydown = this.onKeyDown.bind(this);
        element.onkeypress = this.onKeyPress.bind(this);
        element.onkeyup = this.onKeyUp.bind(this);
        element.onwheel = this.onMouseWheel.bind(this);

        // 触摸事件
        element.ontouchstart = this.onTouchStart.bind(this);
        element.ontouchmove = this.onTouchMove.bind(this);
        element.ontouchend = this.onTouchEnd.bind(this);

        // 绑定窗口事件
        element.onresize = this.onResize.bind(this);
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
        item.view = this;
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
        // this.root.SMatrix.translate(this.origin.x, this.origin.y);
        // this.root.SMatrix.scale(this.scale, this.scale)
        this.root.onPaint(painter)
        painter.restore();
    }

    /////////////////////////////////////////////////////////////
    // Event

    protected onMouseDown(event: any): void {

        // 按下鼠标滚轮
        if (event.buttons == 4) {
            this._midKeyPos.x = event.offsetX;
            this._midKeyPos.y = event.offsetY;
        }

        this.root.onMouseDown(event);
    }


    protected onMouseWheel(event: MouseEvent) {
        const sceneX = event.offsetX - this.origin.x;
        const sceneY = event.offsetY - this.origin.y;
        if (event.deltaY < 0) {
            this.scaleByPoint(this.wheelZoom, sceneX, sceneY)
        } else {
            this.scaleByPoint(1 / this.wheelZoom, sceneX, sceneY)
        }
        this.update()
    }


    protected onMouseMove(event: MouseEvent): void {
        Object.assign(event, {
            sceneX: event.offsetX,
            sceneY: event.offsetY
        })
        // 按下鼠标滚轮
        if (event.buttons == 4) {
            this.origin.x += event.offsetX - this._midKeyPos.x;
            this.origin.y += event.offsetY - this._midKeyPos.y;
            this._midKeyPos.x = event.offsetX;
            this._midKeyPos.y = event.offsetY;
            this.update();
            return;
        }

    }
    protected onMouseUp(event: MouseEvent): void {
    }
    protected onKeyDown(event: KeyboardEvent): void {
    }
    protected onKeyPress(event: KeyboardEvent): void {
    }
    protected onKeyUp(event: KeyboardEvent): void {
    }
    protected onTouchStart(event: TouchEvent): void {
    }
    protected onTouchMove(event: TouchEvent): void {
    }
    protected onTouchEnd(event: TouchEvent): void {
    }
    protected onResize(event: UIEvent): void {
    }

    /**
     * 缩放视图时计算视图的位置与缩放比例
     *
     * @param zoom        缩放比例
     * @param x0          缩放计算的中心点 X 坐标
     * @param y0          缩放计算的中心点 Y 坐标
     */
    scaleByPoint(zoom: number, x0: number, y0: number): void {
        this.scale *= zoom;
        this.origin.x += x0 - x0 * zoom;
        this.origin.y += y0 - y0 * zoom;
    }


}