import { MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React from 'react'

export default function HeaderCp() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={() => { }}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    )
}
