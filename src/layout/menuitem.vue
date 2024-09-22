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
        <!-- <Icon :icon="menuItem.meta.icon" /> -->
        <!-- <ElIcon> -->

        <component :is="`i-ep-${menuItem.meta.icon}`" />
        <!-- </ElIcon> -->

        <span>{{ menuItem.meta.tittle }}</span>
      </template>
      <menuItem
        v-for="item in menuItem.children"
        :key="item.path"
        :menuItem="item"
      />
    </el-sub-menu>
    <ElMenuItem v-else-if="menuItem.meta.isShow" :index="menuItem.path">
      <template #title>
        <component :is="`i-ep-${menuItem.meta.icon}`" />
        <span>{{ menuItem.meta.tittle }}</span>
      </template>
    </ElMenuItem>
  </div>
</template>

<script setup lang="ts">
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
