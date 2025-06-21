// import type { ElSelect, ElInput, ElRadio } from "element-plus";

export interface FormConfig {
  innerConfig: FormItem[];
  rules: {};
}

// 使用 ExtractPropTypes 获取组件的属性类型
// type SelectProps = ExtractPropTypes<typeof ElSelect>;
// type InputProps = ExtractPropTypes<typeof ElInput>;
// type RadioProps = ExtractPropTypes<typeof ElRadio>;

// type ExtendProps = {
//   // ty
//   // SlotName:string
// };

// 定义 CombinedType 为组件属性类型的联合类型
// type CombinedType = SelectProps | InputProps | RadioProps;

// type EXtentType<T> =T| {
//   SlotName:string
// }

/**
 * 表示 Vue.js 管理模型中的一个表单项。
 *
 * @typedef {Object} FormItem
 *
 * @property {FormItemType} type - 表单项的类型。
 * @property {string} prop - 与表单项关联的属性名称。
 * @property {string} [slotName] - 用于自定义渲染的插槽名称。
 * @property {any} [value] - 表单项的值。
 * @property {string} [label] - 表单项的标签。
 * @property {any[]} [options] - 表单项可用的选项，通常用于选择输入。
 * @property {string[]} [slots] - 表单项自带可用的插槽。
 * @property {Object.<string, function(...args: any[]): void>} [events] - 与表单项关联的事件。
 * @property {any} [key: string] - 可以添加到表单项的任何其他属性。
 */
export type FormItem = {
  componentType: FormItemType;
  prop: string;
  slotName?: string;
  value?: any;
  label?: string;
  options?: any[];
  slots?: string[];
  defaultContent?: any;
  events?: {
    [key: string]: (...args: any[]) => void;
  };
  [key: string]: any;

  // props:CombinedType
  // props:EXtentType<CombinedType>
};

// type FormItemOptions = InputProps | SelectProps  | RadioProps;

export enum OptionsEnum {
  "Select" = "Select",
  "MultipleCheck" = "MultipleCheck",
  "Radio" = "Radio",
}

export enum FormItemType {
  "Slot" = "Slot",
  "Input" = "Input",
  "Select" = "Select",
  "MultipleCheck" = "MultipleCheck",
  "Button" = "Button",
  "DatePicker" = "DatePicker",
  "TimePicker" = "TimePicker",
  "Radio" = "Radio",
}
