<template>
  <div class="full-text-panel">富文本</div>
</template>

<script setup lang="ts">
import {
  reactive,
  unref,
  ref,
  toRefs,
  watch,
  onBeforeMount,
  onMounted,
  onUnmounted,
  nextTick,
  onActivated,
} from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
</script>

<style lang="less" scoped>
.full-text-panel {
}
</style>
