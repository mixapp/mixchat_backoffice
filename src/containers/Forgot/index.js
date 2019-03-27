import React from 'react';
import { connect } from 'react-redux';
import ForgotView from '../../components/ForgotView';
import { withNamespaces } from 'react-i18next';
import { recovery, recoveryToken } from '../../actions/settings';

const Forgot = (props) => {
  return <ForgotView {...props} />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    recovery: (data) => { dispatch(recovery(data)) },
    recoveryToken: (data) => { dispatch(recoveryToken(data)) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Forgot));