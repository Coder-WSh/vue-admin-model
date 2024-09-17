<template>
  <div class="main-panel">
    <Layer1 />
  </div>
</template>

<script setup lang="ts">
import Layer1 from "@/layout/layer1.vue";
import { ElButton, ElInput, ElMessageBox } from "element-plus";

const router=useRouter()
console.log('router',router.getRoutes())
</script>

<style lang="less" scoped>
.main-panel {
  // height: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
