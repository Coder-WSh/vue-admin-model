import { ElMessageBox } from "element-plus";
import { toEle, useEventLister } from "./base";

export const useElementSize = (instance: any) => {
  const top = ref(0);

  const update = () => {
    const el = toEle(instance);
    const rect = el.getBoundingClientRect();
    top.value = rect.top;
  };

  useEventLister("scroll", update, { capture: true, passive: true });

  onMounted(() => {
    update();
  });

  return {
    top,
  };
};


