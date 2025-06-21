// import { DirectiveBinding, VNode } from 'vue';


export const contextMenuEvent = (e: MouseEvent) => {
    e.preventDefault();
    console.log('contextMenuEvent');

    // const { clientX, clientY } = e;
}
//  const   mounted=(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) =>{
        // console.log(el, binding, vnode);
    // }
    // beforeUpdate(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode)=> {},
    // updated(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode) {},
    // beforeUnmount(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {},
//  const   unmounted=(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) =>{}

// const menus = {
//     mounted,
//     unmounted
// }
// export default menus;