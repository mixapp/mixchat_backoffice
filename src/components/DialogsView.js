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
    let { currentRoom, groupMembers, loader, userInfo } = this.props.app;
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
          <h2>{t('Client') + ' ' + currentRoom.customFields.clientNumber}</h2>
          <small>{t('Last activity')}: {lastTime}</small>
          <Dialogs {...this.props} />
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
                    <span>{t('Client') + ' ' + currentRoom.customFields.clientNumber}</span>
                    <span>{t('Type')}: {userInfo.data.user.customFields.messenger || 'Web'}</span>
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
                        case "away":
                          status = <Badge status="warning" />;
                          break;
                        case "busy":
                          status = <Badge status="error" />;
                          break;
                        default:
                          status = <Badge status="default" />;
                          break;
                      }
                      return (
                        <List.Item style={{ border: 'none' }}>
                          <List.Item.Meta
                            avatar={<Avatar size='48' icon="user" />}
                            title={<div>{status}{item.name}</div>}
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