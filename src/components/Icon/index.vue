<template>
  <div class="icon-panel">
    <!-- <ElIcon :icon="`icon-ep-`${icon}"></ElIcon> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Icon",
});
defineProps<{
  icon: string;
  color?: string;
  size?: number;
}>();
</script>

<style lang="less" scoped>
.icon-panel {
}
</style>
