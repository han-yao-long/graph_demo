<template>
  <div class="home">
    <canvas  tabindex="0" :width="canvasWidth" :height="canvasHeight" id="graph"></canvas>
  </div>
</template>

<script>
import { PaintEngine } from "@/graph/PaintEngine";
import { View } from "@/graph/View";
import { Circle, Img, Arc } from "@/graph/Items";
export default {
  data() {
    return {
      canvasWidth: 300,
      canvasHeight: 300,
      view: null,
    };
  },
  mounted() {
    this.view = new View("graph");
    this.init();
  },
  methods: {
    init() {
      // 绘制底层灰色圆形
      const data1 = { x: 0, y: 0, r: 150 };
      const backgroundCircle = new Circle(null, data1);
      backgroundCircle.fillColor = "#f6f6f6";
      backgroundCircle.strokeStyle = "#f6f6f6";
      this.view.addItem(backgroundCircle);
      // // 绘制黄色圆形
      const data2 = { x: 0, y: 0, r: 120 };
      const backgroundYellorCircle = new Circle(null, data2);
      backgroundYellorCircle.fillColor = "#eef0cb";
      backgroundYellorCircle.strokeStyle = "#eef0cb";
      this.view.addItem(backgroundYellorCircle);
      // 绘制白色圆形
      const data3 = { x: 0, y: 0, r: 90 };
      const backgroundWriteCircle = new Circle(null, data3);
      backgroundWriteCircle.fillColor = "#ffffff";
      backgroundWriteCircle.strokeStyle = "#ffffff";
      this.view.addItem(backgroundWriteCircle);
      //绘制灰色圆形
      const data4 = { x: 0, y: 0, r: 30 };
      const backgroundCenterCircle = new Circle(null, data4);
      backgroundCenterCircle.fillColor = "#f1f1f1";
      backgroundCenterCircle.strokeStyle = "#f1f1f1";
      this.view.addItem(backgroundCenterCircle);
      //绘制按钮图标
      const data5 = {
        url: require("./../assets/open.png"),
        x: 0,
        y: 0,
        height: 30,
        width: 30,
      };
      const image = new Img(null, data5);
      this.view.addItem(image);
      // 绘制圆弧
      const data6 = {
        x: 0,
        y: 0,
        r: 135,
      };
      const are = new Arc(null, data6);
      are.fillColor = "#ffffff00";
      are.strokeStyle = "#f2d637";
      are.lineWidth = 8;
      this.view.addItem(are);
    },
  },
};
</script>
<style lang="less">
.home {
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
