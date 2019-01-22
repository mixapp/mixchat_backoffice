import React from 'react';
import Settings from './Settings';

export default class SettinggsView extends React.Component {
  componentDidMount() {
    this.props.fetchSettings();
  }
  render() {
    return <Settings
      widgetSettings={this.props.app.widgetSettings}
      onSave={this.props.saveSettings.bind(this)} />
  }
}