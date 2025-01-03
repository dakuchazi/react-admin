import { useEffect } from "react";
import ChartCard from "@/components/ChartCard";
import ClassCard from "@/components/ClassCrad";
import NoticeCard from "@/components/NoticCard";
import CountCard from "@/components/CountCard";
import TagCard from "@/components/TagCard";
import { useAppDispatch, useAppSelector } from "@/store";

import s from "./index.module.scss";
import {
  getCountDataAsync,
  selectCountData,
  selectCountLoading,
} from "@/store/slices/homeSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const countData = useAppSelector(selectCountData);
  const countLoading = useAppSelector(selectCountLoading);

  useEffect(() => {
    dispatch(getCountDataAsync());
  }, []);

  return (
    <>
      {/* 统计卡片区 */}
      <div className={s.countCardContainer}>
        {countData.map((item) => {
          return (
            <CountCard isLoading={countLoading} data={item} key={item.title} />
          );
        })}
      </div>
      {/* 扇形图、分类、标签、公告 */}
      <div className={s.homeBigContainer}>
        <div className={s.chartContainer}>
          <ChartCard />
        </div>
        <div className={s.classesContainer}>{<ClassCard />}</div>
        <div className={s.tagsNoticeContainer}>
          <div className={s.NoticeContainer}>{<NoticeCard />}</div>
          <div className={s.tagsContainer}>{<TagCard />}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
