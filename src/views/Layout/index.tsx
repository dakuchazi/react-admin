import React from "react";
import { Layout, theme } from "antd";
import SiderCp from "./Sider";
import HeaderCp from "./Header";
import TagsView from "./TagsView";
import Home from "../Home";

import "./index.scss";

const { Content } = Layout;

const LayoutCp: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <SiderCp />
      <Layout className="layout__right">
        <HeaderCp />
        <div className="layout__tagsView--wrap">
          <TagsView />
        </div>
        <Content
          style={{
            margin: "24px 16px 24px",
            padding: 24,
            height: "calc(100% - 100px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Home />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutCp;
