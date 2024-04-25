import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import SiderCp from './Sider';
import HeaderCp from './Header';

const { Content } = Layout;

const LayoutCp: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);


    return (
        <Layout>
            <SiderCp collapsed={collapsed} />
            <Layout>
                <HeaderCp />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        height: 'calc(100% - 100px)',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutCp;