import React from "react";
import { useNavigate } from "react-router-dom";
import MarkDown from "../MarkDown";
import PageHeader from "../PageHeader";
import s from "./index.module.scss";

interface Props {
  style?: object;
  content: string;
  site: string;
  params: 2 | 1;
}

const AboutBase: React.FC<Props> = ({
  style = {},
  content = "",
  site,
  params,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        text="编辑"
        onClick={() => navigate(`/about/add?type=${params}`)}
        render={() => <div className={s.site}>{site}</div>}
      />
      <div className={s.markDownContent}>
        <MarkDown content={content} className={s.contentBox} />
      </div>
    </>
  );
};

export default AboutBase;
