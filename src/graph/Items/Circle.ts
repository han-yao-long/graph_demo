import { Item } from "./../Item";
import { PaintEngine } from "./../PaintEngine"
export class Circle extends Item {


    /**
     * 构造函数
     *
     * @param parent 父
     */
    constructor(parent: Item | null = null, data: any) {
        super()
        if (parent) {
            this.parent = parent;
        }
    }

    /**
     * Item 绘制操作
     *
     * @param painter    绘制对象
     */
    onDraw(painter: PaintEngine): void {
        painter.drawRect({x:0,y:0,width:10,height:10});
    }
}