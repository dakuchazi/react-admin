import { useAppDispatch, useAppSelector } from "@/store";
import { selectCollapsed, setCollapsed } from "@/store/slices/layoutSlice";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import BreadCrumbCp from "./BreadCrumbCp";


import "./index.scss";

export default function HeaderCp() {
  const dispath = useAppDispatch();
  const collapsed = useAppSelector(selectCollapsed);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      </Header>
    </>
  );
}
