import { useInfosStore } from "@/store/userInfos/Infos";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";
// 基本路由
const routes: RouteRecordRaw[] = [
  {
    // login
    path: "/login",
    name: "Login",
    component: () => import("../views/login/Login.vue"),
    meta: { tittle: "登录" },
  },
  {
    path: "/",
    name: "Main",
    component: () => import("../views/main/Main.vue"),
    meta: { tittle: "首页", isShow: true },
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/main/dashboard.vue"),
        // redirect: "/dashboard2",
        meta: { tittle: "展览", isShow: true },
      },
      {
        path: "3DTest",
        name: "3DTest",
        component: () => import("../views/three-test/Three-test.vue"),
        // redirect: "/dashboard2",
        meta: { tittle: "3D展示", isShow: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NOTFOUND",
    component: () => import("../views/notfound/404.vue"),
    meta: { tittle: "404" },
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes],
});

export default router;
