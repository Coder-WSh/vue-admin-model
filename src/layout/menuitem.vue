<template>
  <el-sub-menu
    v-if="
      menuItem?.children &&
      menuItem?.children.length > 0 &&
      menuItem?.meta.isShow
    "
    :index="menuItem?.path"
  >
    <template #title>
      <SvgIcon
        :name="menuItem?.meta.icon"
        width="20px"
        height="20px"
        style="margin: 0 5px"
      />

      <!-- <component :is="`icon-ep-${menuItem.meta.icon}`" /> -->
      <!-- </ElIcon> -->

      <span>{{ menuItem?.meta.tittle }}</span>
    </template>
    <menuItem
      v-for="item in menuItem?.children"
      :key="item.path"
      :menuItem="item"
    />
  </el-sub-menu>
  <ElMenuItem v-else-if="menuItem?.meta.isShow" :index="menuItem.path">
    <template #title>
      <!-- <component :is="`i-ep-${menuItem.meta.icon}`" /> -->
      <SvgIcon
        :name="menuItem?.meta.icon"
        width="20px"
        height="20px"
        style="margin: 0 5px"
      />
      <span>{{ menuItem?.meta.tittle }}</span>
    </template>
  </ElMenuItem>
</template>

<script setup lang="ts">
defineOptions({
  name: "MenuItem",
});
defineProps({
  menuItem: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="less" scoped>
.menu-item-panel {
  width: 100%;
}
</style>
