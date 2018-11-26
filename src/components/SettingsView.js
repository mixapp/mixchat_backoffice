import React from 'react';
import SettingsForm from './SettingsForm';

export default class SettinggsView extends React.Component {
    componentDidMount() {
        this.props.fetchSettings();
    }
    render() {
        return <div>
            <h1>Настройки</h1>
            <SettingsForm widgetSettings={this.props.app.widgetSettings} onSave={this.props.saveSettings.bind(this)} />
        </div>
    }
}