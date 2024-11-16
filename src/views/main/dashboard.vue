<template>
  <div class="dashboard-panel">
    <!-- <Echarts :options="options" /> -->
    <!-- <el-button @contextmenu.prevent="handleContextmenu">123</el-button> -->
    <div @click="a = 2">{{ a }}</div>
  </div>
</template>

<script setup lang="ts">
// import Erzi from "./erzi.vue";
const tableRef = ref();
const router = useRouter();
const a = ref(123);
// const handleContextmenu = (e) => {
//   console.log(" ", e);
//   // console.log(" ", e, a, b, c);
// };
onBeforeUpdate(() => {
  console.log("before update", a.value);
});
</script>

<style lang="less" scoped>
.dashboard-panel {
}
</style>
