import React from 'react';
import { connect } from 'react-redux';
import RegistrationView from '../../components/RegistrationView';
import { withNamespaces } from 'react-i18next';
import { registration } from '../../actions/settings';

const Registration = (props) => {
  return <RegistrationView {...props} />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    registration: (data) => { dispatch(registration(data)) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Registration));