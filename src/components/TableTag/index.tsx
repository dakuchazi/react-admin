import React from "react";
import { Tag } from "antd";

import s from "./index.module.scss";

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
    <div className={s.tableTag}>
      {tags.map((tag, index) => {
        return (
          <Tag
            key={index}
            color={COLORS[tag.length % COLORS.length]}
            bordered
            className={s.tagItem}
          >
            {tag}
          </Tag>
        );
      })}
    </div>
  );
};

export default TableTag;
