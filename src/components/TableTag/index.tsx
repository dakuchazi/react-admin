import React from "react";
import { Tag } from "antd";

import style from "./index.module.scss";

interface Props {
  tags: string[];
}

const COLORS = [
  "red",
  "orangered",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "arcoblue",
  "purple",
  "pinkpurple",
  "magenta",
  "gray",
];

const TableTag: React.FC<Props> = ({ tags }) => {
  return (
    <div className={style.tableTag}>
      {tags.map((tag, index) => {
        return (
          <Tag
            key={index}
            color={COLORS[tag.length % COLORS.length]}
            bordered
            className={style.tagItem}
          >
            {tag}
          </Tag>
        );
      })}
    </div>
  );
};

export default TableTag;
