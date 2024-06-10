import React, { MouseEventHandler } from "react";
import { Button } from "antd";

import s from "./index.module.scss";

interface Props {
  text: string;
  onClick: () => void;
  render?: () => React.ReactNode;
}

const PageHeader: React.FC<Props> = ({ text, onClick, render }) => {
  return (
    <div className={s.pageHeaderBox}>
      <Button type="primary" onClick={() => onClick()}>
        {text}
      </Button>
      {render && <>{render()}</>}
    </div>
  );
};

export default PageHeader;
