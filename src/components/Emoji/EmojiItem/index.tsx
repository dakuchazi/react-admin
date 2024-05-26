import copy from "copy-to-clipboard";
import React from "react";

import s from "./index.module.scss";
import { message } from "antd";

interface Props {
  emojis: string[];
}

const EmojiItem: React.FC<Props> = ({ emojis }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      {emojis.map((item: string, index: number) => (
        <div
          className={s.emoji}
          key={index}
          onClick={() => copy(item) && messageApi.success("已复制到剪切板!")}
        >
          {item}
        </div>
      ))}
    </>
  );
};

export default EmojiItem;
