<template>
  <div class="right-menus-panes" ref="rightMenusPanes">
    <slot></slot>

    <Teleport to="body">
      <div
        class="context-menus"
        v-if="showMenus"
        :style="{ left: `${x}px`, top: `${y}px` }"
      >
        <div
          class="menus-item"
          v-for="menusItem in Menus"
          :key="menusItem.info"
        >
          <ElButton @click="menusItem.handle()" link>
            {{ menusItem.info }}
          </ElButton>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useContextMenus } from "@/hooks";
import type {MenuItem} from './types'

defineOptions({
  name: "RightMenusPanes",
});

// interface MenuItem {
//   info: string;
//   handle: () => void;
// }

defineProps<{
  Menus: MenuItem<any>[];
}>();

// const showMenus = ref(false);
const rightMenusPanes = ref<HTMLElement | null>(null);

const { x, y, showMenus } = useContextMenus(rightMenusPanes);
</script>

<style lang="less" scoped>
.right-menus-panes {
  position: relative;
  // display: flex;
  // width: 100%;
  // background-color: #fff;
  // border-top: 1px solid #ccc;
  // border-bottom: 1px solid #ccc;
}

.context-menus {
  position: absolute;
  width: 100px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  // padding: 5px;
  // padding-left: 5px;
  // .menus-item{
  //   margin: 5px 0;
  //   &:not(:first-child) {
  //   border-top: 1px solid #000;
  // }
  // }
}

.menus-item {
  margin: 5px 0;
}
</style>
