<template>
  <div class="home">
    <canvas :width="canvasWidth" :height="canvasHeight" id="graph"></canvas>
  </div>
</template>

<script>
import { PaintEngine } from "@/graph/PaintEngine";
import { View } from "@/graph/View";
import { Circle } from "@/graph/Items";
export default {
  data() {
    return {
      canvasWidth: 100,
      canvasHeight: 100,
      view: null,
    };
  },
  mounted() {
    this.view = new View("graph");
    const data = { x: 0, y: 0, r: 20 };
    this.view.addItem(new Circle(null, data));
    console.log(this.view.root)
    this.view.update()
  },
};
</script>
<style lang="less">
</style>
