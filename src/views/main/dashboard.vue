<template>
  <div class="dashboard" ref="dashboard">
    dashboards
   
  </div>
</template>

<script setup lang="ts">


const dashboard = ref();


onMounted(() => {
//   console.log("dashboard", dashboard.value.$el);
// dashboard.value.onmousedown =()=>{
//     console.log('dashboard');
// }
document.onmousedown = () => {
  console.log("dashboard");
};
});
</script>

<style lang="less" scoped>
.dashboard {
}
</style>
