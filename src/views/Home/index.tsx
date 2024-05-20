import React, { useEffect, useState } from "react";
import ChartCard from "@/components/ChartCard";
import ClassCard from "@/components/ClassCrad";
import NoticeCard from "@/components/NoticCard";
import CountCard from "@/components/CountCard";
import TagCard from "@/components/TagCard";

import style from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getCountDataAsync,
  selectCountData,
  selectCountLoading,
} from "@/store/slices/homeSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const countData = useAppSelector(selectCountData);
  const countLoading = useAppSelector(selectCountLoading);

  useEffect(() => {
    dispatch(getCountDataAsync());
  }, []);

  return (
    <>
      {/* 统计卡片区 */}
      <div className={style.countCardContainer}>
        {countData.map((item) => {
          return (
            <CountCard isLoading={countLoading} data={item} key={item.title} />
          );
        })}
      </div>
      {/* 扇形图、分类、标签、公告 */}
      <div className={style.homeBigContainer}>
        <div className={style.chartContainer}>
          <ChartCard />
        </div>
        <div className={style.classesContainer}>{<ClassCard />}</div>
        <div className={style.tagsNoticeContainer}>
          <div className={style.NoticeContainer}>{<NoticeCard />}</div>
          <div className={style.tagsContainer}>{<TagCard />}</div>
        </div>
      </div>
    </>
  );
}
