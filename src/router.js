import React from 'react';
import { history } from './store';
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";
import { Spin } from 'antd';

import PrivateRoute from './containers/PrivateRouter';

import MainPage from './containers/MainPage';
import Wrapper from './components/Wrapper';

import Authorize from './containers/Authorize';
import Settings from './containers/Settings';
import Dialogs from './containers/Dialogs';
import Managers from './containers/Managers';
import { connect } from 'react-redux';
import {
  fetchSettings,
  saveSettings,
  fetchRole,
  loaderOff,
  logout
} from './actions/settings';

class Router extends React.Component {
  componentDidMount() {
    this.props.fetchRole();
    this.props.loaderOff();
    if (history.location.pathname === '/') {
      history.push('/dialogs');
    }

    history.listen((location, done) => {
      switch (location.pathname) {
        case '/logout':
          this.props.logout();
          break;
        default:
          break;
      }
    })
  }

  render() {
    let { role } = this.props.app;
    let localLoader = 'flex';
    if (role) {
      localLoader = 'none';
    }
    return <ConnectedRouter history={history}>
      <div>
        <div style={{ display: localLoader, zIndex: 100, height: '100vh', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><h1>Omnichennal BackOffice</h1></div>
          <Spin size="large" />
        </div>
        <Route path="/authorize" exact component={Authorize} />
        <Wrapper role={this.props.app.role} loader={this.props.app.loader}>
          <PrivateRoute path='/' exact component={MainPage} />
          <PrivateRoute path='/settings' exact component={Settings} />
          <PrivateRoute path='/dialogs' exact component={Dialogs} />
          <PrivateRoute path='/managers' exact component={Managers} />
        </Wrapper>
      </div>
    </ConnectedRouter >;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSettings: () => { dispatch(fetchSettings()) },
    saveSettings: (data) => { dispatch(saveSettings(data)) },
    fetchRole: () => { dispatch(fetchRole()) },
    loaderOff: () => { dispatch(loaderOff()) },
    logout: () => { dispatch(logout()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);