
<template>
  <div class="component-main">
    <div class="component-nav">
      <slide-nav :data="navsData.groups" base="/components"></slide-nav>
    </div>
    <div class="component-content"></div>
  </div>
</template>
<script>
import navsData from "../nav.config.json";

import slideNav from "../components/slide-nav.vue";
export default {
  components: { slideNav },
  data() {
    return {
      navsData
    };
  }
};
</script>
<style lang="less">
.component-main {
  position: relative;
  .component-nav {
    width: 100px;
    overflow-y: scroll;
    position: absolute;
    left: 0;
    top: 0;
  }
  .component-content {
    overflow-y: scroll;
    margin-left: 100px;
  }
}
</style>