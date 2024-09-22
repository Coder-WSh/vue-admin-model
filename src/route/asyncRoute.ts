import { useInfosStore } from "@/store/userInfos/Infos";
import type { RouteRecordRaw } from "vue-router";
// 异步路由
const asyncRoute: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/main/dashboard.vue"),
    // redirect: "/dashboard2",
    meta: { tittle: "展览", isShow: true, icon: "Document", roles: ["admin"] },
  },
  {
    path: "/3DTest",
    name: "3DTest",
    component: () => import("../views/three-test/Three-test.vue"),
    // redirect: "/dashboard2",
    meta: { tittle: "3D展示", isShow: true, roles: ["admin"] },
  },
];

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
