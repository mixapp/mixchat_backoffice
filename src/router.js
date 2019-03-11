import React from 'react';
import { history } from './store';
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";

import PrivateRoute from './containers/PrivateRouter';

import MainPage from './containers/MainPage';
import Wrapper from './components/Wrapper';

import Registration from './containers/Registration';
import Authorize from './containers/Authorize';
import Settings from './containers/Settings';
import Dialogs from './containers/Dialogs';
import Managers from './containers/Managers';
import Companies from './containers/Companies';
import Login from './containers/Login';
import { connect } from 'react-redux';
import {
  loaderOff,
  logout,
  setCurrentCompany,
  fethcXUSER
} from './actions/settings';

class Router extends React.Component {
  componentWillMount() {
    let currentCompany = localStorage.getItem('currentCompany');
    if (currentCompany) {
      this.props.setCurrentCompany(currentCompany);
    }
  }
  componentDidMount() {
    this.props.loaderOff();
    this.props.fethcXUSER();
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
    return <ConnectedRouter history={history}>
      <div>
        <Route path="/registration" exact component={Registration} />
        <Route path="/authorize" exact component={Authorize} />
        <Route path="/login" exact component={Login} />
        {history.location.pathname !== '/registration' ?
          <Wrapper loader={this.props.app.loader} xuser={this.props.app.xuser}>
            <PrivateRoute path='/' exact component={MainPage} />
            <PrivateRoute path='/companies' exact component={Companies} />
            <PrivateRoute path='/settings' exact component={Settings} />
            <PrivateRoute path='/dialogs' exact component={Dialogs} />
            <PrivateRoute path='/managers' exact component={Managers} />
          </Wrapper> : null}
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
    loaderOff: () => { dispatch(loaderOff()) },
    logout: () => { dispatch(logout()) },
    setCurrentCompany: (data) => { dispatch(setCurrentCompany(data)) },
    fethcXUSER: () => { dispatch(fethcXUSER()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);