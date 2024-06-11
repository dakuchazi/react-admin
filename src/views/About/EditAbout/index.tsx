import { useMount, useRequest, useTitle } from 'ahooks';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MarkDown from '@/components/MarkDown';
import PageHeader from '@/components/PageHeader';
import { useAppDispatch, useAppSelector } from '@/store';
import { useScrollSync } from '@/hooks/useScrollSync';
import { selectAboutData, setAboutDate } from '@/store/slices/aboutSlice';
import { Button, message } from 'antd';
import { updateAboutRequest } from '@/utils/api';

import s from './index.module.scss';

const EditAbout: React.FC = () => {
  const { leftRef, rightRef, handleScrollRun } = useScrollSync();
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const aboutData = useAppSelector(selectAboutData);
  const type = searchParams.get('type')

  const { loading: updateAboutLoading, run: updateAboutRun } = useRequest(
    updateAboutRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi
            .success({
              content: "操作成功",
              duration: 1,
            }).then(() => {
              navigate('/about')
            })
        } else {
          messageApi.error("操作出错了");
        }
      },
    }
  );



  const updateAbout = () => {
    updateAboutRun(aboutData)
  }

  const changeText = (value: string) => {
    if (type === '1') {
      dispatch(setAboutDate({ ...aboutData, myself: value }))
    } else {
      dispatch(setAboutDate({ ...aboutData, website: value }))
    }
  }

  const render = () => (
    <>
      <div className={s.aboutTitle}>关于{type === '1' ? '我' : '本站'}</div>
      <Button size='large' type='primary' className={s.aboutUpdate} onClick={updateAbout}>
        更新
      </Button>
    </>
  );

  return (
    <>
      {contextHolder}
      <PageHeader text='返回' onClick={() => navigate('/about')} render={render} />
      <div className={s.markedEditBox}>
        <textarea
          ref={leftRef}
          className={classNames(s.markedEdit, s.input)}
          value={type === '1' ? aboutData.myself : aboutData.website}
          onChange={(e) => { changeText(e.target.value) }}
          onScroll={handleScrollRun}
        />
        <MarkDown
          ref={rightRef}
          className={s.markedEdit}
          content={type === '1' ? aboutData.myself : aboutData.website}
          onScroll={handleScrollRun}
        />
      </div>
    </>
  );
};

export default EditAbout;


