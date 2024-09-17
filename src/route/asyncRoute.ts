import { useInfosStore } from "@/store/userInfos/Infos";
import type { RouteRecordRaw } from "vue-router";
// 异步路由
const asyncRoute: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login.vue"),
    meta: { tittle: "登录" },
  },
  {
    path: "/",
    name: "main",
    component: () => import("../views/main/Main.vue"),
    meta: { tittle: "首页" },
  },
];

const router = useRouter();
const ROUTER_WHITE_LIST = ["login", "main", "NOTFOUND"];

// router.beforeEach((to, form, next) => {
//   let token = "";
//   if (!token && to.name !== "Login") {
//     return { name: "Login" };
//   }
//   if (token && to.name === "Login") {
//     token = "";
//     return { name: "Login" };
//   }
//   // const infos = useInfosStore();
//   // if (to.name === "main") {
//   //   if (!!infos.token) {
//   //     next("/login");
//   //     return;
//   //   }
//   //   next();
//   // } else {
//   //   next();
//   // }

//   next();
// });

export default asyncRoute;