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
    } else {
      if (!loader) {
        return <div className='dialog-layout'>
          <div>
            <div className='dialog-layout-header'>
              <div>
                <span>{currentRoom.name}</span>
                <span>{t('last activity ')}{Api.formatDate(new Date(currentRoom.lm))}</span>
              </div>
            </div>
            <Dialogs //TODO
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'left', alignContent: 'center', marginBottom: '20px' }}>
                    <Avatar size={48} icon="user" />
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '600' }}>{currentRoom.name}</span>
                      <span style={{ fontSize: '10px', color: '#d9d9d9' }}>{t('last activity ')}{Api.formatDate(new Date(currentRoom.lm))}</span>
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
                              title={<a href={"https://www.google.com/search?q=" + item._id} target="_blank">{status}{item.name}</a>}
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
          ;
      } else {
        return <Spin spinning={true} delay={0} style={{ width: '100%', marginTop: '50%' }} />
      }
    }
  }
}