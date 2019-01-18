import React from 'react';
import { history } from './store';
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";
import PrivateRoute from './containers/PrivateRouter';

import MainPage from './containers/MainPage';
import Wrapper from './components/Wrapper';

import Authorize from './containers/Authorize';
import Settings from './containers/Settings';
import Dialogs from './containers/Dialogs';
import Managers from './containers/Managers';
import { connect } from 'react-redux';
import { fetchSettings, saveSettings, fetchRole } from './actions/settings';
import { Spin } from 'antd';

class Router extends React.Component {
  componentDidMount() {
    this.props.fetchRole();

  }
  render() {
    return <ConnectedRouter history={history}>
      <div>
        <Route path="/authorize" exact component={Authorize} />
        <Wrapper role={this.props.app.role}>
          <Spin spinning={this.props.app.loader} delay={0}>
            <PrivateRoute path='/' exact component={MainPage} />
            <PrivateRoute path='/settings' exact component={Settings} />
            <PrivateRoute path='/dialogs' exact component={Dialogs} />
            <PrivateRoute path='/managers' exact component={Managers} />
          </Spin>
        </Wrapper>
      </div>
    </ConnectedRouter>;
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
    fetchRole: () => { dispatch(fetchRole()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);