<template>
  <div class="home">
    <canvas :width="canvasWidth" :height="canvasHeight" id="graph"></canvas>
  </div>
</template>

<script>
import {PaintEngine} from '@/graph/PaintEngine'
export default {
  data() {
    return {
      canvasWidth: 100,
      canvasHeight: 100,
    };
  },
  mounted(){
    const engine = new PaintEngine('graph');
    const rect = {x:0,y:0,width:20,height:20}
    // engine.drawRect(rect);
    engine.drawCircle(10,10,10)
  }
};
</script>
<style lang="less">
</style>
