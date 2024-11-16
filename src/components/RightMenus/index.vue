<template>
  <div class="right-menus-panes">
    <ul>
      <li v-for="item in Menus" :key="item.name" @click="item.event">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "RightMenusPanes",
});

defineProps<{
  Menus: any[];
}>();
</script>

<style lang="less" scoped>
.right-menus-panes {
}
</style>
