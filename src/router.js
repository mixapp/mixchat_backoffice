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
import Requests from './containers/Requests';
import { connect } from 'react-redux';
import { fetchSettings, saveSettings, fetchRole, loaderOff } from './actions/settings';

class Router extends React.Component {
  componentDidMount() {
    this.props.fetchRole();
    this.props.loaderOff();
  }
  render() {
    return <ConnectedRouter history={history}>
      <div>
        <Route path="/authorize" exact component={Authorize} />
        <Wrapper role={this.props.app.role} loader={this.props.app.loader}>
          <PrivateRoute path='/' exact component={MainPage} />
          <PrivateRoute path='/settings' exact component={Settings} />
          <PrivateRoute path='/dialogs' exact component={Dialogs} />
          <PrivateRoute path='/managers' exact component={Managers} />
          <PrivateRoute path='/requests' exact component={Requests} />
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
    fetchRole: () => { dispatch(fetchRole()) },
    loaderOff: () => { dispatch(loaderOff()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);