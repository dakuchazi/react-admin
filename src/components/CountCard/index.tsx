import classNames from "classnames";
import style from "./index.module.scss";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  data: {
    title: string;
    total: number | null;
  };
  isLoading: boolean;
}

export default function CountCard(props: Props) {
  const { data, isLoading } = props;

  return (
    <div className={classNames(style.countCardBox)}>
      <div className={style.key}>{data.title}</div>
      <div className={classNames(style.value, { [style.loading]: isLoading })}>
        {isLoading ? < LoadingOutlined /> : data.total}
      </div>
    </div>
  );
}
