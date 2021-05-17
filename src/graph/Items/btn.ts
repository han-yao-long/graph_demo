import { Circle } from "./Circle";
import { Item } from "./../Item";
import { PaintEngine } from "./../PaintEngine"
import { SMathUtil } from "./../until/SMathUtil"

export class Btn extends Circle {

    /**
     * 构造函数
     *
     * @param parent 父
     */
    constructor(parent: Item | null = null, data: any) {
        super(parent, data)
        this.data = data
    }
}