import React from 'react';
import SettingsForm from './SettingsForm';

export default class SettinggsView extends React.Component {
  componentDidMount() {
    this.props.fetchSettings();
  }
  render() {
    return <SettingsForm
      widgetSettings={this.props.app.widgetSettings}
      onSave={this.props.saveSettings.bind(this)} />
  }
}