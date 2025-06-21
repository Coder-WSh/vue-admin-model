<template>
  <div class="load-more-panel" ref="loadMoreRef" v-if="has_more">
    <slot name="loading"></slot>
  </div>
  <template v-else>
    <slot name="empty"></slot>
  </template>
</template>

<script setup lang="ts">
const props = defineProps({
  // loadFn: {
  //   type: Function,
  //   default: () => {},
  //   required: true,
  // },
  has_more: {
    type: Boolean,
    default: true,
  },
});

const loadMoreRef = ref<null | HTMLElement>(null);
const emits = defineEmits(["load"]);

const instace = new IntersectionObserver((entries) => {
  // console.log(entries);
  entries.length &&
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //   console.log("load more");

        // props.loadFn?.();
        emits("load");
      }
    });
});

onMounted(() => {
  instace.observe(loadMoreRef.value as Element);
});

watch(
  () => props.has_more,
  (newVal) => {
    if (!newVal) {
      instace.disconnect();
    } else {
      instace.observe(loadMoreRef.value as Element);
    }
  }
);
</script>

<style lang="less" scoped>
.load-more-panel {
}
</style>
