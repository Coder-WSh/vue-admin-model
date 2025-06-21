import { toEle } from "@/uilts/base";
import {  onMounted, onUnmounted, Ref } from "vue";

interface Coordinates {
  x: number;
  y: number;
  showMenus: boolean;
}

export function useContextMenus(targetRef?: Ref<HTMLElement | null>) {
  const coordinates = reactive<Coordinates>({ x: 0, y: 0, showMenus: false });

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    // event.stopPropagation();

    coordinates.x = event.clientX;
    coordinates.y = event.clientY;
    coordinates.showMenus = true;
    console.log("coordinates.value", coordinates);
  };

  const closeMenus = () => {
    coordinates.showMenus = false;
  };

  onMounted(() => {
    const target = toEle(targetRef) || window;
    // coordinates = null;

    target.addEventListener("contextmenu", handleContextMenu as EventListener);
    window.addEventListener("contextmenu", closeMenus as EventListener, true);
    window.addEventListener("click", closeMenus as EventListener, true);
  });

  onUnmounted(() => {
    const target = toEle(targetRef) || window;
    target.removeEventListener(
      "contextmenu",
      handleContextMenu as EventListener
    );

    window.removeEventListener(
      "contextmenu",
      closeMenus as EventListener,
      true
    );
    window.removeEventListener("click", closeMenus as EventListener, true);
  });

  return toRefs(coordinates);
}
