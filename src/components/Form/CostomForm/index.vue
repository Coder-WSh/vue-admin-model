<template>
  <el-form
    :model="formData"
    :rules="formConfig.rules"
    label-width="auto"
    ref="formRef"
    v-bind="$attrs"
  >
    <el-form-item
      v-for="(item, index) in formConfig.innerConfig"
      :label="item?.label"
      :prop="item.prop"
      :key="index"
    >
      <template v-if="item.componentType === 'Slot'">
        <slot :name="item.slotName" :data="{ formData, formRef }"></slot>
      </template>
      <template v-else>
        <component
          :is="basicComponets[item.componentType]"
          v-bind="item"
          v-on="filterEvents(item?.events ?? {}, index)"
          v-model="formData[item.prop]"
        >
          {{ item.componentType === "Button" ? item?.defaultContent : null }}
          <template v-if="optionsEnum.includes(item.componentType)">
            <componet
              :is="optionsComponents[item.componentType as keyof typeof optionsComponents]"
              v-for="option in item.options"
              v-bind="option"
            >
            </componet>
          </template>
          <!-- 使用组件原生插槽 -->
          <template
            v-for="(slotName, index) in item.slots"
            :key="index"
            #slotname="data"
          >
            <slot
              :name="slotName"
              :data="{
                formData,
                ...data,
              }"
            ></slot>
          </template>
        </component>
      </template>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTimePicker,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
  ElButton,
  ElForm,
} from "element-plus";
import type { FormConfig } from "../types";

const props = defineProps<{
  formConfig: FormConfig;
}>();
const formRef = ref<InstanceType<typeof ElForm> | null>(null);

const formData = ref<{
  [key: string]: any;
}>({});

let parentInjectValue: {
  [key: string]: any;
} | null = inject("parentInjectValue", {});

watchEffect(() => {
  if (!parentInjectValue) return;
  formData.value = Object.assign(formData.value, parentInjectValue);
  parentInjectValue = null;
});

/**
 * 初始化表单数据
 * 此函数遍历表单配置项，为每个配置项在表单数据中找到或创建对应的属性
 * 主要目的是根据表单配置动态生成初始表单数据结构
 */
const initFormData = () => {
  // const formData = {};
  // 遍历表单配置项
  props.formConfig.innerConfig.forEach((item) => {
    // 跳过按钮配置项，因为按钮不需要初始化数据
    if (item?.prop === "button") return;
    // 如果配置项有prop属性，则在formData中设置对应的值，如果没有则设为null
    item.prop ? (formData.value[item.prop] = item.value ?? null) : null;
  });
  // return formData;
};

/**
 * 过滤并格式化事件处理程序，添加额外的参数。
 *
 * @param {Object} events - 事件对象
 * @param {number} index - 索引
 * @returns {Object} - 过滤和格式化后的事件对象
 */
const filterEvents = (
  events: { [key: string]: (...args: any[]) => void },
  index: number
): { [key: string]: (...args: any[]) => void } => {
  const realEvents: { [key: string]: (...args: any[]) => void } = {};
  if (Object.keys(events).length === 0) return realEvents;

  return Object.fromEntries(
    Object.entries(events).map(([eventName, fn]) => [
      // formatEventName(eventName),
      eventName,
      (...args) => fn(formData.value, formRef.value, index, ...args),
    ])
  );
};

/**
 * 将事件名称格式化为遵循 "onEventName" 约定的格式。
 *
 * 如果事件名称不是以 "on" 开头，则在前面加上 "on" 并将原事件名称的第一个字母大写。
 * 如果事件名称以 "on" 开头但第三个字符不是大写字母，则将第三个字符大写。
 *
 * @param {string} eventName - 要格式化的原始事件名称。
 * @returns {string} - 格式化后的事件名称。
 */
// const formatEventName = (eventName: string): string => {
//   return eventName.replace(/^(on)?(.)/, (_, __, p2) => `on${p2.toUpperCase()}`);
// };

const basicComponets = {
  Input: ElInput,
  Select: ElSelect,
  DatePicker: ElDatePicker,
  TimePicker: ElTimePicker,
  MultipleCheck: ElCheckboxGroup,
  Radio: ElRadioGroup,
  Button: ElButton,
};

const optionsComponents = {
  Select: ElOption,
  MultipleCheck: ElCheckbox,
  Radio: ElRadio,
};

const optionsEnum = ["Select", "MultipleCheck", "Radio"];

onMounted(() => {
  initFormData();
});

defineExpose(
  new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === "formData") {
          return formData.value;
        } else if (prop === "formRef") {
          return formRef.value;
        }
        // return formData.value
      },
      has() {
        return true;
      },
    }
  )
);
</script>

<style scoped></style>
