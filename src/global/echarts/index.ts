import * as echarts from "echarts/core";
import {
  BarChart,
  PieChart,
  MapChart,
  LinesChart,
  ScatterChart,
  EffectScatterChart,
  CustomChart,
} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
  DataZoomComponent,
  GraphicComponent,
  ToolboxComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption, //柱图
  LineSeriesOption, //线图
  PieSeriesOption, //饼图
  ScatterSeriesOption, //散点图
} from "echarts/charts";
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  
} from "echarts/components";
import type { ComposeOption } from "echarts/core";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | PieSeriesOption
  | ScatterSeriesOption //散点图
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
  DataZoomComponent,
  GraphicComponent ,
  ToolboxComponent ,

  BarChart,
  // LineChart,
  ScatterChart,
  PieChart,
  MapChart,
  LinesChart,
  EffectScatterChart,
  CustomChart,
]);

// const option: ECOption = {
//   // ...
// };

export default echarts;
