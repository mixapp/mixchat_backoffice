import React from 'react';
import { Row, Col, Empty } from 'antd';
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
        <Col span={20}>
          <Empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            description={
              <span>
                {t('First of all select a dialog')}
              </span>
            }
          >
          </Empty>
        </Col>
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