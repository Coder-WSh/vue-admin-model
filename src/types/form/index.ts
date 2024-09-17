import type { FormInstance, FormRules } from "element-plus";
import type { Ref } from "vue";
export type FormType<T extends Ref<string | Record<string, any>>> =
  FormRules<T>;
