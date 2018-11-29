import React from 'react';
import DialogsList from './DialogsList';

export default class DialogsListView extends React.Component {
    componentDidMount() {
        this.props.fetchDialogs();
    }
    render() {
        return <DialogsList dialogs={this.props.app.dialogs} />;
    }
}