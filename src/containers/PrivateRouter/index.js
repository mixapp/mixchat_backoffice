import React from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router";
import { withRouter } from 'react-router-dom';
import * as Api from '../../api';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (!rest.app.user) {
      localStorage.setItem('redirect', rest.path);
      Api.getAuthUrl();
      return null;
    }
    return rest.app.user ? <Component {...props} /> : null;
  }} />
)


const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

export default withRouter(connect(mapStateToProps, null)(PrivateRoute));