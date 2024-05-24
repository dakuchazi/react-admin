import "./hljs.custom.scss";

import classNames from "classnames";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
import { Marked } from "marked";
import React, { forwardRef, useEffect, useState } from "react";

import s from "./index.module.scss";

interface Props {
  content: string;
  className?: string;
  style?: object;
  onScroll?: (e: any) => void;
}

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true, // 默认为true。 允许 Git Hub标准的markdown.
  breaks: true, // 默认为false。 允许回车换行。该选项要求 gfm 为true。
});

const MarkDown = (
  { content = "", className, onScroll, style = {} }: Props,
  ref: any
) => {
  const [code, setCode] = useState("");
  const transformCode = async () => {
    const res = await marked.parse(content);
    setCode(res);
  };

  useEffect(() => {
    transformCode();
  }, [content]);

  return (
    <div
      style={style}
      ref={ref}
      onScroll={onScroll}
      className={classNames(s.markdownBox, className)}
      dangerouslySetInnerHTML={{
        __html: code.replace(/<pre>/g, "<pre id='hljs'>"),
      }}
    />
  );
};

export default forwardRef(MarkDown);
