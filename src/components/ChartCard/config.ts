import { useAppDispatch, useAppSelector } from "@/store";
import {
  getTypesListAsync,
  selectCardLoading,
  selectTypesData,
} from "@/store/slices/homeSlice";
import { useEffect } from "react";

export const useChartData = () => {
  const dispatch = useAppDispatch();
  const typeData = useAppSelector(selectTypesData);
  const typeCardLoading = useAppSelector(selectCardLoading);

  const format = (chartData: any) => {
    const tmeArr = chartData.map((item: any) => {
      return { name: item.name, value: item.count };
    });
    return tmeArr;
  };

  useEffect(() => {

    dispatch(getTypesListAsync());


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
