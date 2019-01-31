import React from 'react';
import Dialogs from './Dialogs';

export default class DialogsListView extends React.Component {

  componentDidMount() {
    this.props.fetchDialogs();
    this.props.loaderOff();
  }

  render() {
    if (!this.props.app.currentRoomId) {
      return <div></div>
    } else {
      return <Dialogs
        loader={this.props.app.loader}
        messagesCount={this.props.app.messagesCount}
        currentRoomId={this.props.app.currentRoomId}
        fetchDialog={this.props.fetchDialog}
        messages={this.props.app.messages}
        message={this.props.app.message}
        dialogs={this.props.app.dialogs}
        sendMessage={this.props.sendMessage}
      />;
    }
  }
}