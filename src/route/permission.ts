import type { RouteRecordRaw, RouteRecordName } from "vue-router";
import asyncRoute from "./asyncRoute";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "./basicRoute";
import { useInfosStore } from "@/store/userInfos/Infos";

const ROUTER_WHITE_LIST = ["Login", "NOTFOUND"];

let hasPermission = false;
let roleRouter: Ref<RouteRecordRaw[]> = ref([]);
let infosStore: any;

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 判断是否登录
  // const infosStore = useInfosStore();
  infosStore = useInfosStore();
  let token = infosStore.token || localStorage.getItem("token");

  //   无token逻辑
  if (!token) {
    if (ROUTER_WHITE_LIST.includes(to.name as string)) {
      next();
    } else {
      next({ name: "Login", replace: true });
    }
  } else {
    if (ROUTER_WHITE_LIST.includes(to.name as string)) {
      next();
    } else {
      if (hasPermission) {
        next();
      } else {
        // 加载路由
        const ROLE = "admin";
        roleRouter.value = filterRoutersByRole(asyncRoute, ROLE);
        hasPermission = true;

        roleRouter.value.forEach((item) => {
          // console.log("item", item);
          router.addRoute("Main", {
            ...item,
          });
        });
        // 跳转路由

        next({ ...to, replace: true });
      }
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});

type RouteWithChildren = RouteRecordRaw & {
  children?: RouteRecordRaw[];
  meta?: RouteMeta;
};
type RouteMeta = {
  roles?: string[];
};

/**
 * 根据角色过滤路由表
 * @param routers 路由列表
 * @param role 角色标识
 * @returns 过滤后的路由配置
 */
const filterRoutersByRole: (
  routers: RouteWithChildren[],
  role: string
) => RouteRecordRaw[] = (routers, role) => {
  const filterRouterItem = (
    router: RouteWithChildren,
    role: string
  ): RouteRecordRaw | undefined => {
    if (router.meta?.roles?.includes(role)) {
      const filteredChildren = filterRoutersByRole(router.children || [], role);
      return {
        // path: router.path,
        // name: router.name,
        // component: router.component,
        // meta: router.meta,
        ...router,
        children: filteredChildren || [],
      };
    }
    return undefined;
  };

  // 应用过滤并移除 undefined 值
  return routers
    .map((router) => filterRouterItem(router, role))
    .filter((item) => item !== undefined) as RouteRecordRaw[];
};

export function cleanRouter() {
  router.getRoutes().forEach((item) => {
    !ROUTER_WHITE_LIST.includes(item.name as string) &&
      router.removeRoute(item.name as RouteRecordName);
  });
  hasPermission = false;
  infosStore.clean();
}

export default readonly(roleRouter);
