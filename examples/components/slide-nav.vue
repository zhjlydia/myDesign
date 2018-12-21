
<template>
  <div class="side-nav">
    <ul>
      <li v-for="(item,index) in data" :key="index">
        <div class="group-name">{{item.groupName}}</div>
        <ul>
          <li v-for="(navItem,navIndex) in item.list" :key="navIndex" class="nav-item">
            <router-link v-if="navItem.path" active-class="active" :to="base + navItem.path" exact v-text="navItem.title || navItem.name">
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    data: Array,
    base: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>
