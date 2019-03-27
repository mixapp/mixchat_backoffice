import React from 'react';
import { connect } from 'react-redux';
import RegistrationView from '../../components/RegistrationView';
import { withNamespaces } from 'react-i18next';
import { registrationForm } from '../../actions/settings';

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
    registrationForm: (data) => { dispatch(registrationForm(data)) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Registration));