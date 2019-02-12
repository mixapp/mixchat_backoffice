import React from 'react';
import { Row, Col, Alert } from 'antd';
import Dialogs from './Dialogs';

export default class DialogsListView extends React.Component {

  componentDidMount() {
    this.props.fetchDialogs();
    this.props.loaderOff();
  }

  render() {
    const t = this.props.t;

    if (!this.props.app.currentRoom) {
      return <Row style={{ height: '100%' }} type="flex" justify="space-around" align="middle">
        <Col span={20}><Alert message={t('First of all select a dialog')} type="info" showIcon /></Col>
      </Row>
    } else {
      return <Dialogs
        loader={this.props.app.loader}
        messagesCount={this.props.app.messagesCount}
        currentRoom={this.props.app.currentRoom}
        fetchDialog={this.props.fetchDialog}
        messages={this.props.app.messages}
        message={this.props.app.message}
        dialogs={this.props.app.dialogs}
        sendMessage={this.props.sendMessage}
      />;
    }
  }
}