import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { fetchRole } from '../../actions/settings';
import MenuItem from '../items/menu';

class MenuPanel extends React.Component {
  state = {
    currentMenuKey: 1,
    role: 'user'
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

  render() {
    return <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.currentMenuKey.toString()]}>

      <MenuItem />

      <Menu.Item key="2">
        <Link to='/dialogs'>
          <Icon type="message" />
          <span>Диалоги</span>
        </Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link to='/managers'>
          <Icon type="team" />
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

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRole: () => { dispatch(fetchRole()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(props => <MenuPanel {...props} />));