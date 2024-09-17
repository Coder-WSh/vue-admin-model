<script setup lang="ts"></script>

<template>
  <div class="router-pannel">
    <el-config-provider>
      <RouterView />
    </el-config-provider>
  </div>
</template>

<style lang="less" scoped>
.router-pannel{
  height: 100%;
}
</style>
