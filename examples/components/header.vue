
<template>
  <div class="page-header">
    <ul class="nav-ul clearfix">
      <li class="nav-li">
        <router-link active-class="active" to="/components">基础组件</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "header"
};
</script>
<style lang="less">
.page-header {
  height: 80px;
  background: #fff;
  .nav-ul {
    height: 100%;
  }
  .nav-li {
    line-height: 80px;
    float: right;
  }
}
</style>
