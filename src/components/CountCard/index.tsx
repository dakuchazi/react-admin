import classNames from "classnames";
import s from "./index.module.scss";
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
    <div className={classNames(s.countCardBox)}>
      <div className={s.key}>{data.title}</div>
      <div className={classNames(s.value, { [s.loading]: isLoading })}>
        {isLoading ? <LoadingOutlined /> : data.total}
      </div>
    </div>
  );
}
