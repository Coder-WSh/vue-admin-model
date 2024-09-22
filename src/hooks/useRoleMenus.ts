import type { RouteRecordRaw, RouteRecordName } from "vue-router";

const router = useRouter();
type UseRoleMenus = (router: RouteWithChildren[], role: string) => {};
// TODO
const useRoleMenus: UseRoleMenus = (
  asyncRouter: RouteWithChildren[],
  role: string
) => {
  let roleRouter: Ref<RouteRecordRaw[]> = ref([]);
  const ROLE = "admin";
  roleRouter.value = filterRoutersByRole(asyncRouter, role);

  // 需求
  // 1.跟据返回角色过滤路由，添加路由
  // 2.生成路由表，后面生成侧边栏
  // 3.记录添加的路由name，后面退出删除路由
  function filterRoutersByRole(roleMenus, role: string, parentName?: string) {
    parentName = parentName || "Main";
    return roleMenus
      .map((item) => {
        if (item.meta?.roles?.includes(role)) {
          // todo1: 添加路由
          router.addRoute(parentName, {
            ...item,
            children: [],
          });
          // tode：1.1子路由递归
          const filteredChildren = filterRoutersByRole(
            item.children || [],
            role,
            item.name as string
          ).filter((chlidrenItem) => chlidrenItem !== undefined);
          // tode：2生成过滤路由表 问题：有undefind
          return {
            ...item,
            children: filteredChildren || [],
          };
        }
        // return undefined;
      })
      .filter((item) => item !== undefined) as RouteRecordRaw[];
  }

  const clean = () => {
    roleRouter.value.forEach((item) => {
      // console.log("item", item);
      router.removeRoute(item.name as string);
    });
    roleRouter.value = [];
  };
  return {
    roleRouter: readonly(roleRouter),
    clean,
  };
};

type RouteWithItem = RouteRecordRaw & {
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

const filterRouterItem = (
  routerItem: RouteWithItem,
  role: string,
  parentName?: RouteRecordName
): RouteRecordRaw | undefined => {
  parentName = parentName || "Main";
  if (routerItem.meta?.roles?.includes(role)) {
    // 添加路由
    router.addRoute(parentName, {
      ...routerItem,
      children: [],
    });

    const filteredChildren = filterRoutersByRole(
      routerItem.children || [],
      role
    );
    return {
      ...routerItem,
      children: filteredChildren || [],
    };
  }
  return undefined;
};
