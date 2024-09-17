import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer"; //打包分析
import ViteRestart from "vite-plugin-restart"; //热更新
import Components from "unplugin-vue-components/vite"; //自动按需导入
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from "vite-plugin-style-import"; //style import
import viteCompression from "vite-plugin-compression"; //gzip
import AutoImport from "unplugin-auto-import/vite";

import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

import vueJsx from "@vitejs/plugin-vue-jsx";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    visualizer(),
    ViteRestart({}),
    viteCompression(),

    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      dts: "src/auto-import.d.ts",
    }),
    Components({
      dirs: ["src/components"], // 目标文件夹
      extensions: ["vue", "tsx"], // 文件类型
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ], //解析element plus
      dts: "src/components.d.ts", // 输出文件，里面都是一些import的组件键值对
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    hmr: true,
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/local": {
        target: "http://localhost:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/local/, ""),
      },
    },
  },
});
