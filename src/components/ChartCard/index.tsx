import classNames from "classnames";
import { PieChart } from "echarts/charts";
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import ReactEChartsCore from "echarts-for-react/lib/core";
import React, { LegacyRef, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useChartData } from "./config";
import s from "./index.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import EChartsReactCore from "echarts-for-react/lib/core";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const ChartCard: React.FC = () => {
  const { option, loading } = useChartData();
  const navigate = useNavigate();
  const echartRef = useRef<EChartsReactCore>(null);
  const onEvents = {
    click: (params: any) => {
      const classText = params.data.name;
      navigate(`/admin/article?searchClass=${encodeURIComponent(classText)}`);
    },
  };

  useEffect(() => {
    const resizeChart = () => {
      echartRef.current?.getEchartsInstance()?.resize();
    };
    window.addEventListener("resize", resizeChart);
    // 在组件卸载时，移除事件监听器
    return () => {
      window.removeEventListener("resize", resizeChart);
    };
  }, []);

  return (
    <div className={classNames(s.chartBox, { [s.loadingCenter]: loading })}>
      <div className={s.chartTitle}>文章概览</div>
      {loading ? (
        <LoadingOutlined className={s.loading} />
      ) : (
        <ReactEChartsCore
          ref={echartRef}
          style={{
            height: "100%",
            width: "100%",
          }}
          echarts={echarts}
          option={option}
          notMerge={true}
          lazyUpdate={true}
          onEvents={onEvents}
        />
      )}
    </div>
  );
};

export default ChartCard;
