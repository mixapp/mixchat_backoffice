import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';

class MenuPanel extends React.Component {
  state = {
    role: 'manager',
    currentMenuKey: 2
  }
  componentWillMount() {
    let key;
    let path = this.props.location.pathname;
    switch (path) {
      case '/dialogs':
        key = 2;
        break
      case '/managers':
        key = 3;
        break;
      default:
        key = 1;
    }
    this.setState({
      currentMenuKey: key
    });
  }

  componentWillReceiveProps() {
    if (this.props.role && this.props.role.role === 'admin') {
      this.setState({
        role: 'admin'
      });
    }
  }

  render() {
    return <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.currentMenuKey.toString()]}>
      {this.state.role === 'admin' ?
        <Menu.Item key="1">
          <Link to='/settings'>
            <Icon type="setting" />
            <span>Настройки</span>
          </Link>
        </Menu.Item> : null}

      <Menu.Item key="2">
        <Link to='/dialogs'>
          <Icon type="message" />
          <span>Диалоги</span>
        </Link>
      </Menu.Item>

      {this.state.role === 'admin' ?
        <Menu.Item key="3">
          <Link to='/managers'>
            <Icon type="team" />
            <span>Менеджеры</span>
          </Link>
        </Menu.Item> : null}

      <Menu.Item key="4">
        <Link to='/logout'>
          <Icon type="upload" />
          <span>Выход</span>
        </Link>
      </Menu.Item>
    </Menu>
  }
}

export default withRouter(props => <MenuPanel {...props} />);