import React from 'react';
import Dialogs from './Dialogs';

export default class DialogsListView extends React.Component {

  componentDidMount() {
    this.props.fetchDialogs();
  }

  render() {
    return <Dialogs
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