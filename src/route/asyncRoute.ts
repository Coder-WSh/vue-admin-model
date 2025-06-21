
import type { RouteRecordRaw } from "vue-router";
// 异步路由
const asyncRoute: RouteRecordRaw[] = [
  {
    path: "/opreationplatform",
    name: "OpreationPlatform",
    // component: () => import("../views/main/dashboard.vue"),
    // redirect: "/dashboard2",
    meta: { tittle: "工作台", isShow: true, icon: "show", roles: ["admin"] },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/main/dashboard.vue"),
        // redirect: "/dashboard2",
        meta: { tittle: "展览", isShow: true, roles: ["admin"] },
      },
    ],
  },
  {
    path: "/map",
    name: "Map",
    // component: () => import("../views/three-test/Three-test.vue"),
    // redirect: "/dashboard2",
    meta: { tittle: "地图展示", isShow: true, icon: "map", roles: ["admin"] },
    redirect: "/echarts",
    children: [
      {
        path: "/echarts",
        name: "Echarts",
        component: () => import("../views/map/echarts/index.vue"),
        // redirect: "/dashboard2",
        meta: { tittle: "echarts", isShow: true, roles: ["admin"] },
      },
      {
        path: "/three",
        name: "Three",
        component: () => import("../views/map/three/index.vue"),
        // redirect: "/dashboard2",
        meta: { tittle: "three", isShow: true, roles: ["admin"] },
      },
      {
        path: "/openlayers",
        name: "Openlayers",
        component: () => import("../views/map/openlayers/index.vue"),
        // redirect: "/dashboard2",
        meta: { tittle: "openlayers", isShow: true, roles: ["admin"] },
      },
      {
        path: "/cesium",
        name: "Cesium",
        component: () => import("../views/map/cesium/index.vue"),
        // redirect: "/dashboard2",
        meta: { tittle: "cesium", isShow: true, roles: ["admin"] },
      },
    ],
  },
  {
    path: "/conponent",
    name: "Conponent",
    // component: () => import("../views/CostomComponent/index.vue"),
    // redirect: "/dashboard2",
    meta: {
      tittle: "组件展示",
      isShow: true,
      icon: "conponent",
      roles: ["admin"],
    },
    redirect: "/table",
    children: [
      {
        path: "/table",
        name: "Table",
        component: () => import("@/views/CostomConponent/table/index.vue"),
        // redirect: "/dashboard2",
        meta: { tittle: "表格", isShow: true, roles: ["admin"] },
        children: [],
      },
      {
        path: "/form",
        name: "Form",
        component: () => import("@/views/CostomConponent/form/index.vue"),
        // redirect: "/dashboard2",
        meta: { tittle: "表单", isShow: true, roles: ["admin"] },
        children: [],
      },
      {
        path: "/upload",
        name: "Upload",
        component: () => import("@/views/CostomConponent/upload/index.vue"),
        // redirect: "/dashboard2",
        meta: { tittle: "上传", isShow: true, roles: ["admin"] },
        children: [],
      },
    ],
  },
  {
    path: "/fullText",
    name: "FullText",
    component: () => import("../views/fulltext/index.vue"),
    // redirect: "/dashboard2",
    meta: {
      tittle: "富文本",
      isShow: true,
      icon: "Document",
      roles: ["admin"],
    },
  },
];


export default asyncRoute;
