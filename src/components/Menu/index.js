import React from 'react';
import { connect } from 'react-redux';
import { Icon, Switch } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { setStatus } from '../../actions/settings';
import '../Menu/style.css';

class MenuPanel extends React.Component {

  state = {
    currentMenuKey: 2
  }

  componentDidMount() {
    let key;
    let path = this.props.location.pathname;
    switch (path) {
      case '/dialogs':
        key = 2;
        break
      case '/managers':
        key = 3;
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
    let { role } = this.props.app;
    let { pathname } = this.props.location;
    const t = this.props.t;
    return <div className='main-menu'>
      <ul>
        {role ?
          <li className={pathname === '/dialogs' ? 'active' : undefined}>
            <Link to='/dialogs'>
              <Icon type="message" />
              <span>{t('mainMenu.dialogs')}</span>
            </Link>
          </li> : null}
        {role === 'admin' ?
          <li className={pathname === '/managers' ? 'active' : undefined}>
            <Link to='/managers'>
              <Icon type="team" />
              <span>{t('mainMenu.managers')}</span>
            </Link>
          </li> : null}
        {role === 'admin' ?
          <li className={pathname === '/settings' ? 'active' : undefined}>
            <Link to='/settings'>
              <Icon type="setting" />
              <span>{t('mainMenu.settings')}</span>
            </Link>
          </li> : null}
      </ul>
      <ul>
        <li>
          <div>
            <Switch size="small" defaultChecked onChange={this.props.setStatus} />
          </div>
        </li>
        <li className={pathname === '/logout' ? 'active' : undefined}>
          <Link to='/logout'>
            <Icon type="upload" />
            <span>{t('mainMenu.logout')}</span>
          </Link>
        </li>
      </ul>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setStatus: (data) => { dispatch(setStatus(data)) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withRouter(props => <MenuPanel {...props} />)));