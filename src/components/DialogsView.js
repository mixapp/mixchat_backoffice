import React from 'react';
import { Row, Col, Empty, Statistic, Icon, Avatar, List } from 'antd';
import Dialogs from './Dialogs';
import * as Api from '../api';


export default class DialogsListView extends React.Component {

  componentDidMount() {
    this.props.fetchDialogs();
    this.props.loaderOff();
  }

  render() {
    console.log(this.props);
    const t = this.props.t;
    let { currentRoom, messagesCount, users } = this.props.app;
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
      return <div className='dialog-layout'>
        <div>
          <div className='dialog-layout-header'>
            <div>
              <span>{currentRoom.name}</span>
              <span>{t('last activity ')}{Api.formatDate(new Date(currentRoom.lm))}</span>
            </div>
          </div>
          <Dialogs
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
              <div style={{ display: 'flex' }}>
                <Statistic title={t('Messages')} value={messagesCount} prefix={<Icon type="message" />} />
                <Statistic style={{ marginLeft: '50px' }} title={t('Users')} value={currentRoom.usersCount} suffix="/ 100" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                <div style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px' }}>{t('Client')}:</div>
                <div style={{ display: 'flex', justifyContent: 'left', alignContent: 'center', marginBottom: '20px' }}>
                  <Avatar size={64} icon="user" />
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                    <span style={{ fontSize: '22px', fontWeight: '600' }}>{currentRoom.name}</span>
                    <span style={{ fontSize: '10px', color: '#d9d9d9' }}>{t('last activity ')}{Api.formatDate(new Date(currentRoom.lm))}</span>
                  </div>
                </div>
                <div style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px' }}>{t('Users')}:</div>
                <div>
                  <List
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                          title={<a href="https://ant.design">{item.title}</a>}
                          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        ;
    }
  }
}