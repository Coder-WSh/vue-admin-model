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
    component: () => import("../layout/layer1.vue"),
    meta: { tittle: "首页", isShow: true },
    redirect: "/dashboard",
    children: [],
  },
  
  // {
  //   path: "/:pathMatch(.*)*",

  //   redirect: "/404",
  //   meta: { tittle: "404" },
  // },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes],
});

export default router;
