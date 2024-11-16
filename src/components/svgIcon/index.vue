<template>
  <!--xlink:href引用的svg图标，#icon-图标名-->
  <svg :style="{ width, height }">
    <use :xlink:href="symbolId" :fill="fill" />
  </svg>
</template>

<script setup>
import { computed, defineProps } from "vue";
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
  fill: {
    type: String,
    default: "#333",
  },
});
// svg icon引入的格式
const symbolId = computed(() => {
  return `#${props.prefix}-${props.name}`;
});
</script>
