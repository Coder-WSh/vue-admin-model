import { log } from "console";

const WINDOW = window;

type ElInstanceType = HTMLElement;

export const toEle = (instance: any) => {
  const plain = toValue(instance);
  return plain?.$el ?? plain;
};
export function useEventLister(
  event: string,
  lister: any,
  options: any
): Function;

export function useEventLister(
  el: ElInstanceType,
  event: string | string[],
  lister: any,
  options: any
): Function;

export function useEventLister(...args: any[]) {
  let el: any;
  let event: string | string[];
  let lister: Function[] | Function;
  let options: any;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [event, lister, options] = args;
    el = WINDOW;
  } else {
    [el, event, lister, options] = args;
  }

  if (!el) return () => {};

  const register = (
    el: any,
    event: string | string[],
    lister: any,
    options: any
  ) => {
    el.addEventListener(event, lister, options);

    return () => {
      el.removeEventListener(event, lister, options);
    };
  };

  register(el, event, lister, options);
  const cleanups: Function[] = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const stopWatch = watch(
    () => toEle(el),
    (el) => {
      cleanup();
      if (!el) return;

      //   const optionsClone = isObject(options) ? { ...options } : options;
      //   可以为一个事件注册多个方法，

      cleanups.push(register(el, event, lister, options));
    },
    { immediate: true }
  );

  const stop = () => {
    stopWatch();
    cleanup();
  };
  if (getCurrentScope()) {
    onScopeDispose(stop);
  }
  return stop;
}
