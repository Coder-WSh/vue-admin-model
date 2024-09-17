<template>
    <div class="notfound">
        <!-- I'm soory,page is not find.Please check your input is true! -->
   <ElEmpty  description="404" />
   </div>
</template>

<script setup lang="ts">
import { ElEmpty } from 'element-plus';
import {
    reactive,
    unref,
    ref,
    toRefs,
    watch,
    onBeforeMount,
    onMounted,
    onUnmounted,
    nextTick, 
    onActivated
} from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'



</script>

<style lang="less" scoped>
.notfound{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
