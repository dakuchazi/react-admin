import avatar from "@/assets/images/avatar.jpg";

import "./index.scss";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  avatar: string;
  name: string;
  loading: boolean;
}

export default function AvatarCp(props: Props) {
  return (
    <div className="sidebar-avatar-container">
      {props.loading ? (
        <LoadingOutlined className="avatar_loading" />
      ) : (
        <>
          <img src={props.avatar} className="sidebar-avatar" alt="logo" />
          <h1 className="sidebar-title">大苦茶籽</h1>
        </>
      )}
    </div>
  );
}
