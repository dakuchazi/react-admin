import { useMount, useRequest } from 'ahooks';
import React from 'react';
import AboutBase from '@/components/AboutBase';
import { useAppDispatch, useAppSelector } from '@/store';
import { getAboutListAsync, selectAboutData } from '@/store/slices/aboutSlice';

import s from './index.module.scss';

const About: React.FC = () => {
  const dispatch = useAppDispatch();
  const aboutData = useAppSelector(selectAboutData);

  useMount(() => {
    dispatch(getAboutListAsync())
  });


  return (
    <div className={s.aboutBox}>
      <div className={s.left}>
        <AboutBase content={aboutData.myself} site='关于我' params={1} />
      </div>
      <div className={s.right}>
        <AboutBase content={aboutData.website} site='关于本站' params={0} />
      </div>
    </div>
  );
};

export default About;
