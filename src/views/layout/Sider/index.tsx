import React, { useState } from 'react';
import { AppstoreOutlined, BulbOutlined, CoffeeOutlined, FileWordOutlined, HomeOutlined, LinkOutlined, MailOutlined, MessageOutlined, SaveOutlined, SettingOutlined, SignatureOutlined, SolutionOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import AvatarCp from './Avatar';
import Sider from 'antd/es/layout/Sider';

type MenuItem = Required<MenuProps>['items'][number];
interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
}


export interface RouteType {
    path: string;
    disPlayName: string;
    // element: React.ReactNode;
    icon?: React.ReactNode;
}

const useRoutes: RouteType[] = [
    {
        path: 'home',
        disPlayName: '首页',
        // element: <Home />,
        icon: <HomeOutlined />
    },
    {
        path: 'article',
        disPlayName: '文章',
        // element: <Article />,
        icon: <FileWordOutlined />
    },
    {
        path: 'say',
        disPlayName: '说说',
        // element: <Say />,
        icon: <MessageOutlined />
    },
    {
        path: 'msg',
        disPlayName: '留言板',
        // element: <Msg />,
        icon: <SignatureOutlined />
    },
    {
        path: 'link',
        disPlayName: '友链',
        // element: <Link />,
        icon: <LinkOutlined />
    },
    {
        path: 'show',
        disPlayName: '作品',
        // element: <Show />,
        icon: <BulbOutlined />
    },
    {
        path: 'log',
        disPlayName: '建站日志',
        // element: <Log />,
        icon: <SolutionOutlined />
    },
    {
        path: 'about',
        disPlayName: '关于',
        // element: <About />,
        icon: <CoffeeOutlined />
    },
    {
        path: 'draft',
        disPlayName: '草稿箱',
        // element: <Draft />,
        icon: <SaveOutlined />
    },
    {
        path: 'addArticle',
        disPlayName: '',
        // element: <AddArticle />
    },
    {
        path: 'aboutEdit',
        disPlayName: '',
        // element: <AboutEdit />
    }
];



function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('首页', '1', <HomeOutlined />),
    getItem('文章', '2', <FileWordOutlined />),
    getItem('说说', '3', <MessageOutlined />),
    getItem('留言板', '4', <SignatureOutlined />),
    getItem('友链', '5', <LinkOutlined />),
    getItem('作品', '6', <BulbOutlined />),
    getItem('建站日志', '7', <SolutionOutlined />),
    getItem('关于', '8', <CoffeeOutlined />),
    getItem('草稿箱', '9', <SaveOutlined />),
];

const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                return func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};
const levelKeys = getLevelKeys(items as LevelKeysProps[]);

interface Props {
    collapsed: boolean;
}

const SiderCp: React.FC<Props> = ({ collapsed }) => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);


    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };

    return (
        <Sider trigger={null} collapsed={collapsed}>
            <AvatarCp></AvatarCp>
            <Menu
                mode="inline"
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                theme="dark"
                items={items} />
        </Sider>

    );
};

export default SiderCp;