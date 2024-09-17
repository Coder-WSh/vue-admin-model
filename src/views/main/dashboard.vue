<template>
  <div class="dashboard-panel">
    <div
      v-for="item in draggerList"
      :style="{
        background: item.background,
        height:'60px'
      }"
      :key="item.background"
      draggable="true"
    >
      {{ item.time }}
    </div>
  </div>
</template>

<script setup lang="ts">
const draggerList = ref([
  {
    time: "2023-05-01",
    background: "#000",
  },
  {
    time: "2023-05-01",
    background: "red",
  },

  {
    time: "2023-05-01",
    background: "pink",
  },
  {
    time: "2023-05-01",
    background: "green",
  },
  {
    time: "2023-05-01",
    background: "purple",
  },
]);
</script>

<style lang="less" scoped>
.dashboard-panel {
  height: 100%;
  // border: 1px solid red;
}
</style>
