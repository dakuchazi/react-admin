import React from "react";
import classNames from "classnames";
import { LoadingOutlined } from "@ant-design/icons";
import useRenderCheck from "@/hooks/useRenderCheck";

import s from "./index.module.scss";

interface Props {
  data: {
    title: string;
    total: number | null;
  };
  isLoading: boolean;
}

const CountCard = (props: Props) => {
  const { data, isLoading } = props;

  useRenderCheck("===CountCard组件===");

  return (
    <div className={classNames(s.countCardBox)}>
      <div className={s.key}>{data.title}</div>
      <div className={classNames(s.value, { [s.loading]: isLoading })}>
        {isLoading ? <LoadingOutlined /> : data.total}
      </div>
    </div>
  );
};

export default React.memo(CountCard);
