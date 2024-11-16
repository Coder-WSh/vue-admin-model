<template>
  <div ref="el" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
import echarts from "@/global/echarts/index.ts";
import type { ECOption } from "@/global/echarts/index.ts";

import { debounce } from "lodash-es";
defineOptions({
  name: "Echarts",
});
const props = withDefaults(
  defineProps<{
    options: ECOption;
    width?: string;
    height?: string;
  }>(),
  {
    width: "100%",
    // height: "200px",
  }
);
const emits = defineEmits();
const el = ref<null | HTMLElement>(null);
let myChart = shallowRef();

function toLine(name: string) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}

const options = computed(() => {
  return Object.assign(props.options, {
    // darkMode: unref(theme)
  });
});

// watch(
//   () => options.value,
//   () => {
//     console.log(" 1111");
//     myChart?.value?.setOption?.(options.value);
//   }
// );
watchEffect(() => {
  console.log(" 1111");
  myChart?.value?.setOption?.(options.value);
});

function initChart() {
  if (!el.value) return;
  myChart.value = echarts.init(el.value);
  myChart.value.setOption(props.options);
}

const events = Object.entries(useAttrs());

// 监听图表事件
events.forEach(([key, value]) => {
  if (key.startsWith("on") && !key.startsWith("onChart")) {
    const on = toLine(key).substring(3);
    myChart.value?.on(on, (...args) => emits(on, ...args));
  }
});

const resizeChart = debounce(
  () => {
    myChart.value?.resize();
  },
  300,
  {
    leading: true,
    trailing: false,
  }
);

onMounted(() => {
  initChart();
  window.addEventListener("resize", resizeChart);
});
onUnmounted(() => {
  window.removeEventListener("resize", resizeChart);
  myChart.value = null;
});
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
