/*
 * *********************************************************************************************************************
 *
 *          !!
 *        .F88X
 *        X8888Y
 *      .}888888N;
 *        i888888N;        .:!              .I$WI:
 *          R888888I      .'N88~            i8}+8Y&8"l8i$8>8W~'>W8}8]KW+8IIN"8&
 *          .R888888I    .;N8888~          .X8'  "8I.!,/8"  !%NY8`"8I8~~8>,88I
 *            +888888N;  .8888888Y                                  "&&8Y.}8,
 *            ./888888N;  .R888888Y        .'}~    .>}'.`+>  i}!    "i'  +/'  .'i~  !11,.:">,  .~]!  .i}i
 *              ~888888%:  .I888888l      .]88~`1/iY88Ii+1'.R$8$8]"888888888>  Y8$  W8E  X8E  W8888'188Il}Y88$*
 *              18888888    E8888881    .]W%8$`R8X'&8%++N8i,8N%N8+l8%`  .}8N:.R$RE%N88N%N$K$R  188,FE$8%~Y88I
 *            .E888888I  .i8888888'      .:$8I;88+`E8R:/8N,.>881.`$8E/1/]N8X.Y8N`"KF&&FK!'88*."88K./$88%RN888+~
 *            8888888I  .,N888888~        ~88i"8W,!N8*.I88.}888%F,i$88"F88"  888:E8X.>88!i88>`888*.}Fl1]*}1YKi'
 *          i888888N'      I888Y          ]88;/EX*IFKFK88X  K8R  .l8W  88Y  ~88}'88E&%8W.X8N``]88!.$8K  .:W8I
 *        .i888888N;        I8Y          .&8$  .X88!  i881.:%888>I88  ;88]  +88+.';;;;:.Y88X  18N.,88l  .+88/
 *      .:R888888I
 *      .&888888I                                          Copyright (c) 2009-2020.  博锐尚格科技股份有限公司
 *        ~8888'
 *        .!88~                                                                     All rights reserved.
 *
 * *********************************************************************************************************************
 */

/**
 * 变换矩阵
 *
 * @author 庞利祥 <sybotan@126.com>
 */
export class SMatrix {
    // 开始：矩阵元素定义
    m11 = 1;
    m21 = 0;
    m31 = 0;
    m41 = 0;

    m12 = 0;
    m22 = 1;
    m32 = 0;
    m42 = 0;

    m13 = 0;
    m23 = 0;
    m33 = 1;
    m43 = 0;

    m14 = 0;
    m24 = 0;
    m34 = 0;
    m44 = 1;

    // 结束：矩阵元素定义

    /** x 轴方向的缩放比例 */
    get a(): number {
        return this.m11;
    }

    set a(v: number) {
        this.m11 = v;
    }

    /** x 轴方向斜切 */
    get b(): number {
        return this.m12;
    }

    set b(v: number) {
        this.m12 = v;
    }

    /** y轴方向斜切 */
    get c(): number {
        return this.m21;
    }

    set c(v: number) {
        this.m21 = v;
    }

    /** y轴方向缩放比例   */
    get d(): number {
        return this.m22;
    }

    set d(v: number) {
        this.m22 = v;
    }

    /** x轴方向平移 */
    get e(): number {
        return this.m41;
    }

    set e(v: number) {
        this.m41 = v;
    }

    /** y轴方向平移 */
    get f(): number {
        return this.m42;
    }

    set f(v: number) {
        this.m42 = v;
    }

    /**
     * 是否为 2D 矩阵
     */
    get is2D(): boolean {
        return true;
    }

    /**
     * 是否为单位矩阵
     */
    get isIdentity(): boolean {
        return (
            this.m11 == 1 &&
            this.m21 == 0 &&
            this.m31 == 0 &&
            this.m41 == 0 &&
            this.m12 == 0 &&
            this.m22 == 1 &&
            this.m32 == 0 &&
            this.m42 == 0 &&
            this.m13 == 0 &&
            this.m23 == 0 &&
            this.m33 == 1 &&
            this.m43 == 0 &&
            this.m14 == 0 &&
            this.m24 == 0 &&
            this.m34 == 0 &&
            this.m44 == 1
        );
    }

    /**
     * 重置变换矩阵
     *
     * @return 返回自身
     */
    reset(): SMatrix {
        this.m11 = 1;
        this.m21 = 0;
        this.m31 = 0;
        this.m41 = 0;

        this.m12 = 0;
        this.m22 = 1;
        this.m32 = 0;
        this.m42 = 0;

        this.m13 = 0;
        this.m23 = 0;
        this.m33 = 1;
        this.m43 = 0;

        this.m14 = 0;
        this.m24 = 0;
        this.m34 = 0;
        this.m44 = 1;
        return this;
    }

    /**
     * 原始矩阵乘以给定的变换矩阵
     *
     * @param mat   给定的变换矩阵
     * @return 返回自身
     */
    multiply(mat: SMatrix): SMatrix {
        [
            this.m11,
            this.m21,
            this.m31,
            this.m41,

            this.m12,
            this.m22,
            this.m32,
            this.m42,

            this.m13,
            this.m23,
            this.m33,
            this.m43,

            this.m14,
            this.m24,
            this.m34,
            this.m44
        ] = [
            this.m11 * mat.m11 +
                this.m21 * mat.m12 +
                this.m31 * mat.m13 +
                this.m41 * mat.m14,
            this.m11 * mat.m21 +
                this.m21 * mat.m22 +
                this.m31 * mat.m23 +
                this.m41 * mat.m24,
            this.m11 * mat.m31 +
                this.m21 * mat.m32 +
                this.m31 * mat.m33 +
                this.m41 * mat.m34,
            this.m11 * mat.m41 +
                this.m21 * mat.m42 +
                this.m31 * mat.m43 +
                this.m41 * mat.m44,

            this.m12 * mat.m11 +
                this.m22 * mat.m12 +
                this.m32 * mat.m13 +
                this.m42 * mat.m14,
            this.m12 * mat.m21 +
                this.m22 * mat.m22 +
                this.m32 * mat.m23 +
                this.m42 * mat.m24,
            this.m12 * mat.m31 +
                this.m22 * mat.m32 +
                this.m32 * mat.m33 +
                this.m42 * mat.m34,
            this.m12 * mat.m41 +
                this.m22 * mat.m42 +
                this.m32 * mat.m43 +
                this.m42 * mat.m44,

            this.m13 * mat.m11 +
                this.m23 * mat.m12 +
                this.m33 * mat.m13 +
                this.m43 * mat.m14,
            this.m13 * mat.m21 +
                this.m23 * mat.m22 +
                this.m33 * mat.m23 +
                this.m43 * mat.m24,
            this.m13 * mat.m31 +
                this.m23 * mat.m32 +
                this.m33 * mat.m33 +
                this.m43 * mat.m34,
            this.m13 * mat.m41 +
                this.m23 * mat.m42 +
                this.m33 * mat.m43 +
                this.m43 * mat.m44,

            this.m14 * mat.m11 +
                this.m24 * mat.m12 +
                this.m34 * mat.m13 +
                this.m44 * mat.m14,
            this.m14 * mat.m21 +
                this.m24 * mat.m22 +
                this.m34 * mat.m23 +
                this.m44 * mat.m24,
            this.m14 * mat.m31 +
                this.m24 * mat.m32 +
                this.m34 * mat.m33 +
                this.m44 * mat.m34,
            this.m14 * mat.m41 +
                this.m24 * mat.m42 +
                this.m34 * mat.m43 +
                this.m44 * mat.m44
        ];
        return this;
    }

    /**
     * 位移变换
     *
     * @param dx    X 轴位移
     * @param dy    Y 轴位移
     * @param dz    Z 轴位移
     * @return 返回自身
     */
    translate(dx: number, dy: number, dz = 0): SMatrix {
        const mat = new SMatrix();
        mat.m41 = dx;
        mat.m42 = dy;
        mat.m43 = dz;
        this.multiply(mat);
        return this;
    }

    /**
     * 缩放变换
     *
     * @param sx    X 轴缩放比例
     * @param sy    Y 轴缩放比例
     * @return 返回自身
     */
    scale(sx: number, sy: number): SMatrix {
        const mat = new SMatrix();
        mat.m11 = sx;
        mat.m22 = sy;
        this.multiply(mat);
        return this;
    }

    /**
     * 旋转变形
     *
     * @param angle     绕 Z 轴旋转角度（单位角度度）
     * @return 返回自身
     */
    rotate(angle: number): SMatrix;

    /**
     * 旋转变形
     *
     * @param rotX  绕 X 轴旋转角度（单位角度 度）
     * @param rotY  绕 Y 轴旋转角度（单位角度 度）
     * @param rotZ  绕 Z 轴旋转角度（单位角度 度）
     * @return 返回自身
     */
    rotate(rotX: number, rotY: number, rotZ: number): SMatrix;

    /**
     * 旋转变形
     *
     * @param rotX  绕 Z 轴旋转角度 | 绕 X 轴旋转角度（单位度）
     * @param rotY  绕 Y 轴旋转角度（单位度）
     * @param rotZ  绕 Z 轴旋转角度（单位度）
     * @return 返回自身
     */
    rotate(rotX: number, rotY?: number, rotZ?: number): SMatrix {
        const matZ = new SMatrix();
        let q = (rotX * Math.PI) / 180;

        // 重载实现了 rotate(rotX: number, rotY: number, rotZ: number): SMatrix;
        if (rotY != undefined && rotZ != undefined) {
            // 旋转角度不是 360 的整数倍
            if (rotX % 360 != 0) {
                const matX = new SMatrix();
                matX.m22 = Math.cos(q);
                matX.m32 = -Math.sin(q);
                matX.m23 = Math.sin(q);
                matX.m33 = Math.cos(q);
                this.multiply(matX);
            }

            // 旋转角度不是 360 的整数倍
            if (rotY % 360 != 0) {
                const matY = new SMatrix();
                q = (rotY * Math.PI) / 180;
                matY.m11 = Math.cos(q);
                matY.m31 = Math.sin(q);
                matY.m13 = -Math.sin(q);
                matY.m33 = Math.cos(q);
                this.multiply(matY);
            }

            // 旋转角度不是 360 的整数倍
            if (rotZ % 360 != 0) {
                q = (rotZ * Math.PI) / 180;
                matZ.m11 = Math.cos(q);
                matZ.m21 = -Math.sin(q);
                matZ.m12 = Math.sin(q);
                matZ.m22 = Math.cos(q);
                this.multiply(matZ);
            }
            return this;
        } else {
            // 重载实现了 rotate(angle: number): SMatrix;
            // 旋转角度不是 360 的整数倍
            if (rotX % 360 != 0) {
                matZ.m11 = Math.cos((rotX * Math.PI) / 180);
                matZ.m21 = -Math.sin((rotX * Math.PI) / 180);
                matZ.m12 = Math.sin((rotX * Math.PI) / 180);
                matZ.m22 = Math.cos((rotX * Math.PI) / 180);
                this.multiply(matZ);
            }
            return this;
        }
    }

    /**
     * 转置当前矩阵
     *
     * @return 返回自身
     */
    transpose(): SMatrix {
        [this.m12, this.m21] = [this.m21, this.m12];
        [this.m13, this.m31] = [this.m31, this.m13];
        [this.m14, this.m41] = [this.m41, this.m14];

        [this.m23, this.m32] = [this.m32, this.m23];
        [this.m24, this.m42] = [this.m42, this.m24];

        [this.m34, this.m43] = [this.m43, this.m34];
        return this;
    }

    /**
     * 返回当前矩阵的逆矩阵
     *
     * @return 当前矩阵的逆矩阵
     */
    inversed(): SMatrix {
        const detMat = this.det();
        const d = this.value();
        const ret = new SMatrix();
        ret.m11 = detMat.m11 / d;
        ret.m21 = detMat.m21 / d;
        ret.m31 = detMat.m31 / d;
        ret.m41 = detMat.m41 / d;

        ret.m12 = detMat.m12 / d;
        ret.m22 = detMat.m22 / d;
        ret.m32 = detMat.m32 / d;
        ret.m42 = detMat.m42 / d;

        ret.m13 = detMat.m13 / d;
        ret.m23 = detMat.m23 / d;
        ret.m33 = detMat.m33 / d;
        ret.m43 = detMat.m43 / d;

        ret.m14 = detMat.m14 / d;
        ret.m24 = detMat.m24 / d;
        ret.m34 = detMat.m34 / d;
        ret.m44 = detMat.m44 / d;
        return ret;
    }

    /**
     * 返回当前矩阵的伴随矩阵
     *
     * @return 当前矩阵的伴随矩阵
     */
    det(): SMatrix {
        const m = new SMatrix();
        m.m11 =
            this.m22 * this.m33 * this.m44 +
            this.m32 * this.m43 * this.m24 +
            this.m42 * this.m23 * this.m34 -
            this.m42 * this.m33 * this.m24 -
            this.m32 * this.m23 * this.m44 -
            this.m22 * this.m43 * this.m34;
        m.m12 = -(
            this.m12 * this.m33 * this.m44 +
            this.m32 * this.m43 * this.m14 +
            this.m42 * this.m13 * this.m34 -
            this.m42 * this.m33 * this.m14 -
            this.m32 * this.m13 * this.m44 -
            this.m12 * this.m43 * this.m34
        );
        m.m13 =
            this.m12 * this.m23 * this.m44 +
            this.m22 * this.m43 * this.m14 +
            this.m42 * this.m13 * this.m24 -
            this.m42 * this.m23 * this.m14 -
            this.m22 * this.m13 * this.m44 -
            this.m12 * this.m43 * this.m24;
        m.m14 = -(
            this.m12 * this.m23 * this.m34 +
            this.m22 * this.m33 * this.m14 +
            this.m32 * this.m13 * this.m24 -
            this.m32 * this.m23 * this.m14 -
            this.m22 * this.m13 * this.m34 -
            this.m12 * this.m33 * this.m24
        );

        m.m21 = -(
            this.m21 * this.m33 * this.m44 +
            this.m31 * this.m43 * this.m24 +
            this.m41 * this.m23 * this.m34 -
            this.m41 * this.m33 * this.m24 -
            this.m31 * this.m23 * this.m44 -
            this.m21 * this.m43 * this.m34
        );
        m.m22 =
            this.m11 * this.m33 * this.m44 +
            this.m31 * this.m43 * this.m14 +
            this.m41 * this.m13 * this.m34 -
            this.m41 * this.m33 * this.m14 -
            this.m31 * this.m13 * this.m44 -
            this.m11 * this.m43 * this.m34;
        m.m23 = -(
            this.m11 * this.m23 * this.m44 +
            this.m21 * this.m43 * this.m14 +
            this.m41 * this.m13 * this.m24 -
            this.m41 * this.m23 * this.m14 -
            this.m21 * this.m13 * this.m44 -
            this.m11 * this.m43 * this.m24
        );
        m.m24 =
            this.m11 * this.m23 * this.m34 +
            this.m21 * this.m33 * this.m14 +
            this.m31 * this.m13 * this.m24 -
            this.m31 * this.m23 * this.m14 -
            this.m21 * this.m13 * this.m34 -
            this.m11 * this.m33 * this.m24;

        m.m31 =
            this.m21 * this.m32 * this.m44 +
            this.m31 * this.m42 * this.m24 +
            this.m41 * this.m22 * this.m34 -
            this.m41 * this.m32 * this.m24 -
            this.m31 * this.m22 * this.m44 -
            this.m21 * this.m42 * this.m34;
        m.m32 = -(
            this.m11 * this.m32 * this.m44 +
            this.m31 * this.m42 * this.m14 +
            this.m41 * this.m12 * this.m34 -
            this.m41 * this.m32 * this.m14 -
            this.m31 * this.m12 * this.m44 -
            this.m11 * this.m42 * this.m34
        );
        m.m33 =
            this.m11 * this.m22 * this.m44 +
            this.m21 * this.m42 * this.m14 +
            this.m41 * this.m12 * this.m24 -
            this.m41 * this.m22 * this.m14 -
            this.m21 * this.m12 * this.m44 -
            this.m11 * this.m42 * this.m24;
        m.m34 = -(
            this.m11 * this.m22 * this.m34 +
            this.m21 * this.m32 * this.m14 +
            this.m31 * this.m12 * this.m24 -
            this.m31 * this.m22 * this.m14 -
            this.m21 * this.m12 * this.m34 -
            this.m11 * this.m32 * this.m24
        );

        m.m41 = -(
            this.m21 * this.m32 * this.m43 +
            this.m31 * this.m42 * this.m23 +
            this.m41 * this.m22 * this.m33 -
            this.m41 * this.m32 * this.m23 -
            this.m31 * this.m22 * this.m43 -
            this.m21 * this.m42 * this.m33
        );
        m.m42 =
            this.m11 * this.m32 * this.m43 +
            this.m31 * this.m42 * this.m13 +
            this.m41 * this.m12 * this.m33 -
            this.m41 * this.m32 * this.m13 -
            this.m31 * this.m12 * this.m43 -
            this.m11 * this.m42 * this.m33;
        m.m43 = -(
            this.m11 * this.m22 * this.m43 +
            this.m21 * this.m42 * this.m13 +
            this.m41 * this.m12 * this.m23 -
            this.m41 * this.m22 * this.m13 -
            this.m21 * this.m12 * this.m43 -
            this.m11 * this.m42 * this.m23
        );
        m.m44 =
            this.m11 * this.m22 * this.m33 +
            this.m21 * this.m32 * this.m13 +
            this.m31 * this.m12 * this.m23 -
            this.m31 * this.m22 * this.m13 -
            this.m21 * this.m12 * this.m33 -
            this.m11 * this.m32 * this.m23;
        return m;
    }

    /**
     * 返回当前矩阵的值
     *
     * @return 当前矩阵的值
     */
    value(): number {
        return (
            this.m11 *
                (this.m22 * this.m33 * this.m44 +
                    this.m32 * this.m43 * this.m24 +
                    this.m42 * this.m23 * this.m34 -
                    this.m42 * this.m33 * this.m24 -
                    this.m32 * this.m23 * this.m44 -
                    this.m22 * this.m43 * this.m34) -
            this.m21 *
                (this.m12 * this.m33 * this.m44 +
                    this.m32 * this.m43 * this.m14 +
                    this.m42 * this.m13 * this.m34 -
                    this.m42 * this.m33 * this.m14 -
                    this.m32 * this.m13 * this.m44 -
                    this.m12 * this.m43 * this.m34) +
            this.m31 *
                (this.m12 * this.m23 * this.m44 +
                    this.m22 * this.m43 * this.m14 +
                    this.m42 * this.m13 * this.m24 -
                    this.m42 * this.m23 * this.m14 -
                    this.m22 * this.m13 * this.m44 -
                    this.m12 * this.m43 * this.m24) -
            this.m41 *
                (this.m12 * this.m23 * this.m34 +
                    this.m22 * this.m33 * this.m14 +
                    this.m32 * this.m13 * this.m24 -
                    this.m32 * this.m23 * this.m14 -
                    this.m22 * this.m13 * this.m34 -
                    this.m12 * this.m33 * this.m24)
        );
    }
}
