import React, { useEffect } from "react";
import { Layout, theme } from "antd";
import SiderCp from "./Sider";
import HeaderCp from "./Header";
import TagsView from "./TagsView";

import "./index.scss";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { getUserInfoAsync } from "@/store/slices/userSlice";

const { Content } = Layout;

const LayoutCp: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const username = localStorage.getItem("username");
    dispatch(getUserInfoAsync({ username }));
  });
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <SiderCp />
      <Layout className="layout__right">
        <HeaderCp />
        {/* <div className="layout__tagsView--wrap">
          <TagsView />
        </div> */}
        <Content
          style={{
            marginTop: "16px",
            padding: "16px",
            height: "calc(100% - 100px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutCp;
