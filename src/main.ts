import { createApp } from "vue";
import "normalize.css";
import "@/assets/css/basc.less";
import "@/route/permission.ts";

import App from "./App.vue";
import router from "./route";
import { createPinia } from "pinia";
const pinpa = createPinia();
const app = createApp(App);
app.use(pinpa);
app.use(router);
app.mount("#app");
