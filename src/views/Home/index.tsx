import React, { useEffect, useState } from "react";
import ChartCard from "@/components/ChartCard";
import ClassCard from '@/components/ClassCrad';
// import NoticeCard from '@/components/NoticCard';
import CountCard from "@/components/CountCard";
// import TagCard from '@/components/TagCard';

import style from "./index.module.scss";
// import { useAppDispatch, useAppSelector } from "@/store";
// import {
//   getCardDataAsync,
//   selectCardData,
//   selectCardLoading,
// } from "@/store/slices/homeSlice";
import { useRequest } from "ahooks";
import { CardData, getCardDataRequest } from "@/utils/api";

export default function Home() {
  const [cardData, setCardData] = useState<CardData[]>([{ title: "文章数", total: null },
  { title: "说说数", total: null },
  { title: "留言数", total: null },
  { title: "友链数", total: null },
  { title: "日志数", total: null },])
  const { loading: countCardLoading, run: countCardRun } = useRequest(getCardDataRequest, {
    manual: true,
    onSuccess: (res) => {
      setCardData(res)
    }
  })

  useEffect(() => {
    countCardRun()
  }, []);

  return (
    <>
      {/* 统计卡片区 */}
      <div className={style.countCardContainer}>
        {cardData.map((item) => {
          return (
            <CountCard
              isLoading={countCardLoading}
              data={item}
              key={item.title}
            />
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
          <div className={style.NoticeContainer}>{/* <NoticeCard /> */}</div>
          <div className={style.tagsContainer}>{/* <TagCard /> */}</div>
        </div>
      </div>
    </>
  );
}
