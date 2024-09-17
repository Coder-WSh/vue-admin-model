<template>
  <el-dialog
    v-model="visibleC"
    :title="tittle"
    width="500"
    :before-close="handleClose"
  >
    <slot></slot>
    <template #footer v-if="isShowBtn">
      <div class="dialog-footer">
        <el-button @click="handelSubmit" type="primary">确认</el-button>
        <el-button @click="handleClose"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessageBox } from "element-plus";

const props = withDefaults(
  defineProps<{
    visible?: Boolen;
    tittle?: String;
    isShowBtn?: Boolen;
  }>(),
  {
    visible: false,
    tittle: "注册",
    isShowBtn: true,
  }
);
const emit = defineEmits(["success", "close"]);
const visibleC = computed({
  get() {
    return props.visible;
  },
  set() {
    emit("close");
  },
});

const handleClose = () => {
  ElMessageBox.confirm("是否确认离开?", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      emit("close");
    })
    .catch(() => {});
};
// const handleBtnClose = () => {
//   emit("close");
// };

const handelSubmit = () => {
  emit("success");
};
</script>
