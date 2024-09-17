<template>
  <div ref="container"></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, ref } from "vue";
// three 场景 相机 渲染器
// question 1 use document.body.append  view not change
// answer  it may is show but layer grade is low,so we use current layer's element to replace document.body
const container = ref();

function init(): void {
  // 1. 创建渲染器,指定渲染的分辨率和尺寸,然后添加到body中
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.pixelRatio = window.devicePixelRatio;
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.append(renderer.domElement);

  // 2. 创建场景
  const scene = new THREE.Scene();

  // 3. 创建相机
  //透视相机   视野角度，长宽比，近点，远点
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 4. 创建物体
  const axis = new THREE.AxesHelper(5);
  scene.add(axis);

  //摄像机位移和 朝向设计
  camera.position.set(5, 5, 10);
  camera.lookAt(0, 0, 0);

  // 添加立方体
  const geometry = new THREE.BoxGeometry(4, 4, 4);
  // 材质 不受光源影响 MeshStandardMaterial受光源影响
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  // 渲染物体
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 5. 渲染
  // renderer.render(scene, camera)

  // 控制器 相机对目标做轨道运动
  const controls = new OrbitControls(camera, renderer.domElement);
  // 自动旋转
  // controls.autoRotate=true

  // 1.灯光问题
  // const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  // // 2. 环境均匀分布
  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  // scene.add(ambientLight);

  // // 3. 方向灯
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // directionalLight.position.set(10, 0, 10);
  // scene.add(directionalLight);

  // 4. 点灯 电灯泡
  // const light = new THREE.PointLight( 0xff0000, 1, 100 );
  // light.position.set( 50, 50, 50 );
  // scene.add( light );

  const clock = new THREE.Clock();
  function animate() {
    // this function depend on brower so may have error,we can use three'clock to solve
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.01;
    cube.rotation.z += 0.01;

    const elapsedTime = clock.getElapsedTime(); // 返回已经过去的时间, 以秒为单位
    cube.rotation.y = elapsedTime * Math.PI; // 两秒自转一圈
    // 更新控制器
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped></style>
