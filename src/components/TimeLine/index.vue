<template>
  <div class="time-line" v-if="timeLineItem.length">
    <!-- <span class="line-top">123</span>
    <div class="line"></div>
    <span class="line-buttom"></span> -->
    <div
      class="line-wrapper"
      v-for="(item, index) in timeLineItem"
      :key="index"
    >
      <div class="line-top" v-if="index % 2">{{ item.content }}</div>
      <div class="line-buttom" v-if="!(index % 2)">{{ item.content }}</div>
      <span class="circle" />
      <div class="line" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LineTimeType } from "@/types/timeLine/index.ts";

withDefaults(
  defineProps<{
    timeLineItem: LineTimeType[];
  }>(),
  {
    timeLineItem: () => [],
  }
);
</script>

<style lang="less" scoped>
.time-line {
  display: flex;
  padding-left: 100px;
  height: 200px;
  .line-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    line-height: 100%;
    .line {
      flex: 1;
      height: 2px;
      background: #000;
    }
    .circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #409EFF;
    }
    .line-top {
      //   width: 10px;
      //   height: 10px;
      //   border-radius: 50%;
      //   background: red;
      width: 100px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      position: absolute;
      left: calc(0% - 50px);
      top: calc(50% + 10px);
      border: 1px solid #000;
      padding: 3px;
      border-radius: 4px;
      background: #dcdfe6;
    }
    .line-buttom {
      width: 100px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      position: absolute;
      left: calc(0% - 50px);
      bottom: calc(50% + 10px);
      border: 1px solid #000;
      padding: 3px;
      border-radius: 4px;
      background: #dcdfe6;
    }
  }
}

.time-line:last-child::after {
  content: "▶";
  //   border-left: 10px solid transparent ;
  display: flex;
  justify-content: center;
  align-items: center;

  //   border-top: 10px solid transparent;
  //   border-bottom: 10px solid transparent;
  //   border-left: 10px solid black;
}
</style>
