import { useAppDispatch, useAppSelector } from "@/store";
import { selectCollapsed, setCollapsed } from "@/store/slices/layoutSlice";
import {
  CaretDownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import BreadCrumbCp from "./BreadCrumbCp";
import FullScreen from "@/components/FullScreen";
import { Link } from "react-router-dom";
import { selectUserInfo } from "@/store/slices/userSlice";

import "./index.scss";

export default function HeaderCp() {
  const userInfo = useAppSelector(selectUserInfo);
  const dispath = useAppDispatch();
  const collapsed = useAppSelector(selectCollapsed);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    { key: "home", label: <Link to="/home">首页</Link> },
    {
      key: "link",
      label: (
        <a
          target="_blank"
          href="https://github.com/NLRX-WJC/react-antd-admin-template"
          rel="noopener noreferrer"
        >
          项目地址
        </a>
      ),
    },
    {
      key: "loyout",
      danger: true,
      label: "注销",
      onClick: () => {
        console.log("===注销===");
      },
    },
  ];

  return (
    <>
      <Header className="header" style={{ background: colorBgContainer }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => {
            dispath(setCollapsed());
          }}
          style={{
            fontSize: "16px",
            width: 45,
            height: 45,
          }}
        />
        <div className="header-breadCrumb--wrap">
          <BreadCrumbCp />
        </div>
        <div className="header-right--wrap">
          <FullScreen />
          <div className="dropdown-wrap">
            <Dropdown menu={{ items }}>
              <div>
                <Avatar shape="square" size="default" src={userInfo.avatar} />
                <CaretDownOutlined style={{ color: "rgba(0,0,0,.3)" }} />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
}
