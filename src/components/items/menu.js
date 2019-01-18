import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class MenuItem extends React.Component {
  render() {
    console.log(this.props);
    return <Menu.Item key="1">
      <Link to='/settings'>
        <Icon type="setting" />
        <span>Настройки</span>
      </Link>
    </Menu.Item>
  }
}