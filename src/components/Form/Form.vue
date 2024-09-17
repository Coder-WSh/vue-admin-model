<template>
  <div class="form-panel">
    <el-form :model="formData" :rules="rules" label-width="auto" ref="formRef">
      <el-row :gutter="20">
        <el-col
          v-for="(val, key) in formList"
          :span="val.span ?? 12"
          :key="key"
        >
          <el-form-item :label="val.label" :prop="val?.prop">
            <!-- <component :is="val.type" /> -->

            <!-- input -->
            <el-input
              v-if="val.type === 'input'"
              :type="val?.innerType"
              v-model="formData[val.prop]"
              :placeholder="`请输入你的${val.label}`"
              :prefix-icon="val?.prefixIcon"
              :suffix-icon="val?.suffixIcon"
              :disabled="val?.disabled"
              :readonly="val?.readonly"
              :show-word-limit="!!val?.maxlength"
              :maxlength="val?.maxlength"
              show-password
              style="width: 100%"
            >
            </el-input>
            <!-- select -->
            <el-select
              v-else-if="val.type === 'select'"
              v-model="formData[val.prop]"
              :placeholder="`请选择你的${val.label}`"
              :disabled="val?.disabled"
              :readonly="val?.readonly"
              :size="val?.size"
              style="width: 100%"
            >
              <el-option
                v-if="val.innerType !== 'group'"
                v-for="item in val.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
              <!-- 分组 -->
              <el-option-group
                v-if="val.innerType === 'group'"
                v-for="item in val?.options"
                :key="item?.value"
                :label="item?.label"
                style="width: 100%"
              >
                <el-option
                  v-for="detail in item.options"
                  :key="detail.value"
                  :label="detail.label"
                  :value="detail.value"
                />
              </el-option-group>
            </el-select>
            <el-date-picker
              v-if="val.type === 'datetime'"
              :type="val?.innerType"
              v-model="formData[val.prop]"
              :placeholder="`请输入你的${val.label}`"
              :disabled="val?.disabled"
              :size="val?.size"
              :value-format="val?.format"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="end" v-if="isShowBtn">
        <!-- <el-col> -->
        <ElButton @click="handleSubmit">提交</ElButton>
        <el-button @click="reset">取消</el-button>
        <!-- </el-col> -->
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
interface FormItemType {
  label: string;
  type: string;
  prop: string;
  disabled?: boolean;
  readonly?: boolean;
  options?: any[];
  innerType?:
    | "group"
    | "year"
    | "month"
    | "date"
    | "dates"
    | "datetime"
    | "week"
    | "datetimerange"
    | "daterange"
    | "monthrange";
  span?: number;
  maxlength?: number;
  minlength?: number;
  prefixIcon?: string;
  suffixIcon?: string;
  size?: "" | "default" | "small" | "large";
  format?: string;
}
interface FormType {
  formList: FormItemType[];
  formValue: { [key: string]: any };
  rules?: FormRules;
  isShowBtn?: Boolean;
}

const props = withDefaults(defineProps<FormType>(), { isShowBtn: true });
const formData = props.formValue;
const emit = defineEmits(["successs", "close"]);

const handleSubmit = () => {
  emit("successs");
};
let formRef = ref<FormInstance>();
const reset = () => {
  // console.log("formRef", formRef);
  // setTimeout(() => {
  formRef.value?.resetFields();
  emit("close");
  // }, 0);
};

const clearForm = () => {
  formRef.value?.resetFields();
};
defineExpose({
  clearForm
});
</script>

<style scoped lang="less">
.form-panel {
  padding: 20px;
}
</style>
