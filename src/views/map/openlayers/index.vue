<template>
  <div class="openlayers-panel" id="openlayers-panel"></div>
</template>

<script setup lang="ts">
import "ol/ol.css"; // 引入ol样式

import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { fromLonLat } from "ol/proj.js";
import { Feature } from "ol";
import { Point } from "ol/geom.js";
import { Style, Fill, Stroke, Circle } from "ol/style.js";
import {
  FullScreen,
  OverviewMap,
  defaults as defaultControls,
} from "ol/control";

// 创建基础地图图层（OSM）
const baseLayer = new TileLayer({
  source: new OSM(),
});

// 创建一个矢量图层，用于显示要素
const vectorLayer = new VectorLayer({
  source: new VectorSource({
    wrapX: false,
  }),
  style: new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({ color: "red" }),
      stroke: new Stroke({ color: "white", width: 2 }),
    }),
  }),
});

// 创建地图实例

const map = shallowRef();
const init = () => {
  map.value = new Map({
    target: "openlayers-panel",
    layers: [baseLayer, vectorLayer],
    view: new View({
      projection: "EPSG:3857",
      center: fromLonLat([0, 0]), // 地图中心
      zoom: 2,
    }),
    controls: defaultControls().extend([
      new FullScreen(), // 全屏控件
      new OverviewMap({
        // className:"costom_map_overviewmap", // 概览地图的CSS类名
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        collapsed: false,
      }),
    ]),
  });
  map.value.on("click", function (event: any) {
    // 获取鼠标点击位置的坐标
    const coordinate = event.coordinate;

    // 创建一个新的点要素
    const pointFeature = new Feature({
      geometry: new Point(coordinate),
    });

    // 将要素添加到矢量图层中

    vectorLayer?.getSource?.()?.addFeature(pointFeature);
  });
};

onMounted(() => {
  init();
});
onBeforeUnmount(() => {
  map.value = null;
});
</script>

<style lang="less" scoped>
.openlayers-panel {
  width: 100%;
  height: 100%;
  // .costom_map_overviewmap{
  //     width: 300px;
  //     height: 300px;
  // }
}
</style>
