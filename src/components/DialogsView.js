import React from 'react';
import { Row, Col, Empty, Avatar, List, Badge, Spin } from 'antd';
import Dialogs from './Dialogs';
import * as Api from '../api';


export default class DialogsListView extends React.Component {

  componentDidMount() {
    this.props.fetchDialogs();
    this.props.loaderOff();
  }

  render() {
    const t = this.props.t;
    let lastTime = null;
    let { currentRoom, groupMembers, loader } = this.props.app;
    if (!this.props.app.currentRoom) {
      return <Row style={{ height: '100%' }} type="flex" justify="space-around" align="middle">
        <Col span={20}>
          <Empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            description={
              <span>
                {t('Select a dialog')}
              </span>
            }
          >
          </Empty>
        </Col>
      </Row>
    }
    if (loader) {
      return <Spin spinning={true} delay={0} style={{ width: '100%' }} />;
    }

    if (currentRoom.lm) {
      lastTime = Api.formatDate(new Date(currentRoom.lm));
    } else {
      lastTime = t('No activity');
    }

    return (
      <div className='dialog-layout'>
        <div>
          <div className='dialog-layout-header'>
            <div>
              <span>{currentRoom.name}</span>
              <span>{t('Last activity')}: {lastTime}</span>
            </div>
          </div>
          <Dialogs //TODO
            {...this.props}
            loader={this.props.app.loader}
            messagesCount={this.props.app.messagesCount}
            currentRoom={this.props.app.currentRoom}
            fetchDialog={this.props.fetchDialog}
            messages={this.props.app.messages}
            message={this.props.app.message}
            dialogs={this.props.app.dialogs}
            sendMessage={this.props.sendMessage}
          />
        </div>
        <div>
          <div className='dialog-layout-detail'>
            <div>
              <span>{t('Detail')}:</span>
            </div>
            <div>
              <div className='cerrent-dialog'>
                <div className='cerrent-dialog-info'>
                  <div><Avatar size={48} icon="user" /></div>
                  <div className='current-dialog-info-user'>
                    <span>{currentRoom.name}</span>
                    <span>{t('Last activity')}: {lastTime}</span>
                  </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>{t('Members')}:</div>
                <div>
                  <List
                    size="small"
                    itemLayout="horizontal"
                    dataSource={groupMembers.members}
                    renderItem={item => {
                      let status = '';
                      switch (item.status) {
                        case "online":
                          status = <Badge status="success" />;
                          break;
                        default:
                          status = <Badge status="default" />;
                          break;
                      }
                      return (
                        <List.Item style={{ border: 'none' }}>
                          <List.Item.Meta
                            avatar={<Avatar size='48' icon="user" />}
                            title={<a href={"https://www.google.com/search?q=" + item._id} target="_blank" rel="noopener noreferrer">{status}{item.name}</a>}
                          />
                        </List.Item>
                      )
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}