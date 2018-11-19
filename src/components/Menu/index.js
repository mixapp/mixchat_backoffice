import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class MenuPanel extends React.Component {
    render() {
        return <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
                <Link to='/settings'>
                    <Icon type="user" />
                    <span>Настройки</span>
                </Link>
            </Menu.Item>
            
            <Menu.Item key="2">
                <Link to='/dialogs'>
                    <Icon type="video-camera" />
                    <span>Диалоги</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="3">
                <Link to='/managers'>
                    <Icon type="video-camera" />
                    <span>Менеджеры</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="4">
                <Link to='/logout'>
                    <Icon type="upload" />
                    <span>Выход</span>
                </Link>
            </Menu.Item>
        </Menu>
    }
}
