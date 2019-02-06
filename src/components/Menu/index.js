import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

class MenuPanel extends React.Component {

  state = {
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
      case '/requests':
        key = 5;
        break;
      case '/settings':
        key = 1;
        break;
      default:
        key = 2;
    }
    this.setState({
      currentMenuKey: key
    });
  }

  render() {
    const t = this.props.t;

    return <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.currentMenuKey.toString()]}>

      <Menu.Item key="2">
        <Link to='/dialogs'>
          <Icon type="database" />
          <span>{t('Dialogs')}</span>
        </Link>
      </Menu.Item>

      <Menu.Item key="5">
        <Link to='/requests'>
          <Icon type="inbox" />
          <span>Заявки</span>
        </Link>
      </Menu.Item>

      {this.props.role === 'admin' ?
        <Menu.Item key="3">
          <Link to='/managers'>
            <Icon type="team" />
            <span>Менеджеры</span>
          </Link>
        </Menu.Item> : null}

      {this.props.role === 'admin' ?
        <Menu.Item key="1">
          <Link to='/settings'>
            <Icon type="setting" />
            <span>Настройки</span>
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

export default withNamespaces()(withRouter(props => <MenuPanel {...props} />));