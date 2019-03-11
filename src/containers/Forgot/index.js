import React from 'react';
import { connect } from 'react-redux';
import ForgotView from '../../components/ForgotView';
import { withNamespaces } from 'react-i18next';
import { forgot } from '../../actions/settings';

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
    forgot: (data) => { dispatch(forgot(data)) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Forgot));