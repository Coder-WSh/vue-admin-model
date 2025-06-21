<template>
  <div class="layer-panel">
    <div class="left-panel-menu">
      <div class="logo" @click="goToMain">
        <SvgIcon name="logo" width="30px" height="30px" style="margin: 0 5px" />
        <Transition name="logo-keyframe">
          <span v-if="!isExpand">后台管理</span>
        </Transition>
      </div>
      <el-menu
        :default-active="router?.currentRoute.value.path"
        class="el-menu-vertical-demo"
        active-text-color="#ffd04b"
        background-color="#1352a3"
        text-color="#fff"
        :collapse="isExpand"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <MenuItem :menuItem="item" v-for="item in roleMenus" :key="item.path" />
      </el-menu>
    </div>
    <div class="right-panel">
      <div class="right-panel-header">
        <div class="header-left">
          <span style="cursor: pointer">
            <el-icon size="24" v-if="isExpand" @click="changeExpand(true)"
              ><icon-ep-Expand
            /></el-icon>
            <el-icon size="24" v-else @click="changeExpand(false)"
              ><icon-ep-Fold
            /></el-icon>
          </span>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="item in router?.currentRoute.value.matched"
              :key="item.name"
              :to="{ path: item.path }"
            >
              {{ item.meta?.tittle }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-popover
            placement="bottom-end"
            :width="80"
            popper-class="costom-popover-left"
            trigger="click"
          >
            <template #reference>
              <el-avatar :size="25" src="" />
            </template>
            <div
              style="width: 100%"
              v-for="menusItem in systemMenus"
              :key="menusItem.info"
            >
              <ElButton @click="menusItem.handle()" link>{{
                menusItem.info
              }}</ElButton>
            </div>
          </el-popover>
        </div>
      </div>

      <!-- <Tabs/> -->
      <div class="router-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import Tabs from "@/components/Tab/Tabs.vue";
import MenuItem from "./menuitem.vue";
import roleMenus, { cleanRouter } from "@/route/permission.ts";

const router = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const isExpand = ref<boolean>(true);
const changeExpand = (bool: boolean) => {
  isExpand.value = !bool;
};

const goToMain = () => {
  router.push({ path: "/" });
};

const systemMenus = [
  {
    info: "退出登录",
    handle: function () {
      cleanRouter();
      router.push({ path: "/login" });
    },
  },
];

// const testMenus = [
//   {
//     info: "test",
//     handle: function () {
//       console.log("test");
//     },
//   },
//   {
//     info: "test2",
//     handle: function () {
//       console.log("test2");
//     },
//   },
// ];
</script>

<style lang="less" scoped>
.layer-panel {
  display: flex;
  height: 100vh;
  background: rgb(242, 243, 245);
  overflow: hidden;
  .left-panel-menu {
    background: #1352a3;
    // width: 200px;
    height: 100%;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
    // 处理右侧白线
    ::v-deep {
      .el-menu {
        border-right: none;
      }
    }
    .logo {
      display: flex;
      align-items: center;
      padding: 10px 10px 0px;
      color: #d8b311;
      // box-sizing: content-box;
      // width: calc(100% - 2px);
      width: 100%;
      //
    }
  }
  .right-panel {
    // display: flex;
    flex: 1;
    height: 100%;
    // flex-grow: 1;
    display: flex;
    flex-direction: column;
    // width: 100%;
    padding: 10px;

    // padding: var(--sys-padding);
    .right-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      margin-right: 10px;
      border-radius: 5px;
      background: #fff;
      height: 30px;
      .header-left {
        display: flex;
        align-items: center;
      }
      .header-right {
        display: flex;
        align-items: center;
        span {
          margin-right: 5px;
        }
      }
    }

    .router-content {
      margin: 10px 10px 10px 0;
      height: 100%;
      background: #fff;
      border-radius: 5px;
      overflow: hidden;
    }
  }
}

// 动画
.logo-keyframe-enter-to {
  transition: opacity 0.5s ease;
}

.logo-keyframe-enter-from {
  opacity: 0;
}
</style>
