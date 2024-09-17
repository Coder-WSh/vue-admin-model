<template>
  <div class="layer-panel">
    <div class="left-panel-menu">
      <el-menu
        :default-active="router?.currentRoute.value.path"
        class="el-menu-vertical-demo"
        style="height: 100%"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        :collapse="isExpand"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <MenuItem :menuItem="item" v-for="item in menuList" :key="item.path" />
      </el-menu>
    </div>
    <div class="right-panel">
      <div class="right-panel-header">
        <span style="cursor: pointer">
          <el-icon size="24" v-if="isExpand" @click="changeExpand(true)"
            ><i-ep-Expand
          /></el-icon>
          <el-icon size="24" v-else @click="changeExpand(false)"
            ><i-ep-Fold
          /></el-icon>
        </span>
        <el-breadcrumb separator="/">
          <!--matched  -->
          <el-breadcrumb-item
            v-for="item in router?.currentRoute.value.matched"
            :key="item.name"
            :to="{ path: item.path }"
          >
            {{ item.meta?.tittle }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="router-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuItem from "./menuitem.vue";

const handleOpen = (key: string, keyPath: string[]) => {
  //   console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  //   console.log(key, keyPath);
};

const isExpand = ref<boolean>(true);
const changeExpand = (bool: boolean) => {
  isExpand.value = !bool;
};

const router = useRouter();
const menuList = ref<any[] | null>();
menuList.value = router.getRoutes().find((item) => item.path === "/")?.children;
console.log("menuList", menuList.value);
</script>

<style lang="less" scoped>
.layer-panel {
  height: 100%;
  display: flex;

  .left-panel-menu {
    height: 100%;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .right-panel {
    // display: flex;
    height: 100%;
    width: 100%;
    padding: 5px;
    // padding: var(--sys-padding);
    .right-panel-header {
      span {
        margin-right: 5px;
      }
      display: flex;
      align-items: center;
      height: 30px;
    }

    .router-content {
      height: calc(100% - 30px);
      width: 100%;
    }
  }
}
</style>
