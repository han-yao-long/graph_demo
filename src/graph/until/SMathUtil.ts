


export class SMathUtil {
    
    /**
     * 计算点到点距离
     *
     * @param x1    点 1 的 x 坐标
     * @param y1    点 1 的 y 坐标
     * @param x2    点 2 的 x 坐标
     * @param y2    点 2 的 y 坐标
     * @return 距离
     */
    static pointDistance(
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ): number {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
}
