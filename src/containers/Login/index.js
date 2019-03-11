import React from 'react';
import { connect } from 'react-redux';
import LoginView from '../../components/LoginView';
import { withNamespaces } from 'react-i18next';
import { login } from '../../actions/settings';

const Login = (props) => {
  return <LoginView {...props} />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (data) => { dispatch(login(data)) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Login));