<template>
  <div class="menu-item-panel">
    <el-sub-menu
      v-if="
        menuItem.children &&
        menuItem.children.length > 0 &&
        menuItem.meta.isShow
      "
      :index="menuItem.path"
    >
      <template #title>
        <el-icon></el-icon>
        <span>Navigator One</span>
      </template>
      <menuItem
        v-for="item in menuItem.children"
        :key="item.path"
        :menuItem="item"
      />
    </el-sub-menu>
    <ElMenuItem v-else-if="menuItem.meta.isShow" :index="menuItem.path">
     <template #title>
       <el-icon></el-icon>
       <span>{{ menuItem.meta.tittle }}</span>
     </template>
    </ElMenuItem>
  </div>
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

defineOptions({
  name: "MenuItem",
});
defineProps({
  menuItem: {
    type: Object,
    default: null,
  },
});
</script>

<style lang="less" scoped>
.menu-item-panel {
  width: 100%;
}
</style>
