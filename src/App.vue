<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { SMatrix } from "./lib";
export default {
  data() {
    return {};
  },
  mounted() {
    console.log("SMatrix", new SMatrix());
  },
};
</script>
<style lang="less">
#app {
}
</style>
