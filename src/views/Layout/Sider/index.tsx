import React, { useState } from "react";
// import {
//   AppstoreOutlined,
//   BulbOutlined,
//   CoffeeOutlined,
//   FileWordOutlined,
//   HomeOutlined,
//   LinkOutlined,
//   MessageOutlined,
//   SaveOutlined,
//   SignatureOutlined,
//   SolutionOutlined,
// } from "@ant-design/icons";
import * as AntdIcons from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import AvatarCp from "./Avatar";
import Sider from "antd/es/layout/Sider";
import { useAppSelector } from "@/store";
import { selectCollapsed } from "@/store/slices/layoutSlice";
import { useNavigate } from "react-router-dom";
import {
  selectAvatarLoading,
  selectUserInfo,
  selectUserRoutes,
} from "@/store/slices/userSlice";
import { useMount } from "ahooks";
import useCurrentPathName from "@/hooks/useCurrentPathName";
import { LoadingOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  iconName: string = "QuestionOutlined",
  children?: MenuItem[],
  type?: "group"
) {
  const icon = React.createElement(AntdIcons && (AntdIcons as any)[iconName]);
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SiderCp: React.FC = () => {
  const navigate = useNavigate();
  const collapsed = useAppSelector(selectCollapsed);
  const userRoutes = useAppSelector(selectUserRoutes);
  const userInfo = useAppSelector(selectUserInfo);
  const avatarLoading = useAppSelector(selectAvatarLoading);
  const currentPathName = useCurrentPathName();
  const [menuItem, setMenuItem] = useState<MenuItem[]>([]);

  useMount(() => {
    setMenuItem(
      userRoutes.map((item) => {
        if (item.isShow) {
          return getItem(item.label, item.path, item.icon);
        }
      }) as MenuItem[]
    );
  });

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };
  return (
    <Sider trigger={null} collapsed={collapsed}>
      <AvatarCp
        avatar={userInfo.avatar}
        name={userInfo.name}
        loading={avatarLoading}
      ></AvatarCp>

      <Menu
        mode="inline"
        theme="dark"
        onClick={onClick}
        items={menuItem}
        selectedKeys={[currentPathName]}
      />
    </Sider>
  );
};

export default SiderCp;
