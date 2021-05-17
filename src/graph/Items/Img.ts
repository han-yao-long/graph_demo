import { Item } from "../Item";
import { PaintEngine } from "../PaintEngine"
export class Img extends Item {

    /** 参数 */
    data: any;
    // img Dom
    img: CanvasImageSource | undefined;

    //是否可以绘制
    _isDraw: boolean = false;
    get isDraw(): boolean {
        return this._isDraw
    }
    set isDraw(v:boolean) {
        this._isDraw = v;
        if(v){
         this.update()
        }
    }

    _url: string = "";
    get url(): string {
        return this._url
    }
    set url(val) {
        this._url = val;
        this.isDraw = false;
        this.img = new Image();
        this.img.src = val;
        const that = this;
        this.img.onload = function () {
            that.isDraw = true;
        }
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
        // 原点居中
        this.origin = { x: -data.width / 2, y: -data.height / 2 };
        this.data = data;
        this.url = data.url;
    }

    /**
     * Item 绘制操作
     *
     * @param painter    绘制对象
     */
    onDraw(painter: PaintEngine): void {
        if(!this.isDraw) return;
        painter.translate(this.origin.x, this.origin.y);
        if(!this.img) return
        painter.drawImage(this.img, this.data.x, this.data.y, this.data.width, this.data.height);
    }
}