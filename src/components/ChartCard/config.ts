import { useAppDispatch, useAppSelector } from "@/store";
import {} from "@/store/slices/homeSlice";
import {
  getTypeListAsync,
  selectTypeData,
  selectTypeLoading,
} from "@/store/slices/typeSlice";
import { useEffect } from "react";

export const useChartData = () => {
  const dispatch = useAppDispatch();
  const typeData = useAppSelector(selectTypeData);
  const typeCardLoading = useAppSelector(selectTypeLoading);

  const format = (chartData: any) => {
    if (chartData.length === 0) return;
    const tmeArr = chartData.map((item: any) => {
      return { name: item.name, value: item.count };
    });
    return tmeArr;
  };

  useEffect(() => {
    dispatch(getTypeListAsync());
  }, []);

  return {
    loading: typeCardLoading,
    option: {
      tooltip: {
        trigger: "item",
        textStyle: {
          fontSize: 16,
          fontFamily: "dengxian",
        },
      },
      series: [
        {
          type: "pie",
          radius: "80%",
          height: "100%",
          data: format(typeData),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          label: {
            fontSize: 18,
            fontFamily: "dengxian",
          },
        },
      ],
    },
  };
};
