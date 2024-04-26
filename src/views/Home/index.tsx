import React from 'react'
import ChartCard from '@/components/ChartCard';
import ClassCard from '@/components/ClassCrad';
import NoticeCard from '@/components/NoticCard';
import CountCard from '@/components/CountCard';
import TagCard from '@/components/TagCard';

import style from './index.module.scss'


export default function Home() {
    // const countCards = [
    //     {
    //         DBName: DB.Article,
    //         where: { post: _.eq(true) },
    //         selector: selectArticle,
    //         reducer: setArticleCount
    //     },
    //     {
    //         DBName: DB.Say,
    //         selector: selectSay,
    //         reducer: setSayCount
    //     },
    //     {
    //         DBName: DB.Msg,
    //         selector: selectMsg,
    //         reducer: setMsgCount
    //     },
    //     {
    //         DBName: DB.Link,
    //         selector: selectLink,
    //         reducer: setLinkCount
    //     },
    //     {
    //         DBName: DB.Log,
    //         selector: selectLog,
    //         reducer: setLogCount
    //     }
    // ];




    return (
        <>
            {/* 统计卡片区 */}
            <div className={style.countCardContainer}>
                {/* {countCards.map(({ DBName, where = {}, selector, reducer }, index) => (
                    <CountCard
                        key={index}
                        DBName={DBName}
                        where={where}
                        selector={selector}
                        reducer={reducer}
                    />
                ))} */}
            </div>
            {/* 扇形图、分类、标签、公告 */}
            <div className={style.homeBigContainer}>
                <div className={style.chartContainer}>
                    {/* <ChartCard /> */}
                </div>
                <div className={style.classesContainer}>
                    {/* <ClassCard /> */}
                </div>
                <div className={style.tagsNoticeContainer}>
                    <div className={style.NoticeContainer}>
                        {/* <NoticeCard /> */}
                    </div>
                    <div className={style.tagsContainer}>
                        {/* <TagCard /> */}
                    </div>
                </div>
            </div>
        </>
    )

}
