import React, { MouseEventHandler } from "react";
import { Button } from "antd";

import style from "./index.module.scss";

interface Props {
  text: string;
  onClick: () => void;
  render?: () => React.ReactNode;
}

const PageHeader: React.FC<Props> = ({ text, onClick, render }) => {
  return (
    <div className={style.pageHeaderBox}>
      <Button type="primary" size="large" onClick={() => onClick()}>
        {text}
      </Button>
      {render && <>{render()}</>}
    </div>
  );
};

export default PageHeader;
