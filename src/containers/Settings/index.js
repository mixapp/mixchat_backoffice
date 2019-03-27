import React from 'react';
import { connect } from 'react-redux';
import SettingsView from '../../components/SettingsView';
import { fetchSettings, saveSettings } from '../../actions/settings';
import { withNamespaces } from 'react-i18next';

const Settings = (props) => {
  return <SettingsView {...props} />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSettings: () => { dispatch(fetchSettings()) },
    saveSettings: (data) => { dispatch(saveSettings(data)) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Settings));