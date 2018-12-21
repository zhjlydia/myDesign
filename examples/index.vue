<template>
    <div class="wrapper">
        <mainHeader></mainHeader>
        <div class="main-cnt">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import mainHeader from "./components/header.vue";
export default {
  components: { mainHeader }
};
</script>
<style lang="less">
@import "../src/styles/index.less";
</style>
<style lang="less" scoped>
.wrapper {
  background: #eee;
}
</style>
