import React from 'react';
import { Row, Col, List, Avatar } from 'antd';

export default class DialogsList extends React.Component {

  state = {
    size: 'small'
  }

  render() {
    return (
      <Row>
        <Col span={14} style={{ height: '700px', overflow: 'auto' }}>
          <List
            size="small"
            header={<div>Comments</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={this.props.messages}
            renderItem={item => {
              return <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.u.username}</a>}
                  description={item.msg}
                />
              </List.Item>
            }}
          />
        </Col>
        <Col span={1}></Col>
        <Col span={9} style={{ overflow: 'hidden' }}>
          <List
            size="small"
            header={<div>List of groups</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={this.props.dialogs}
            renderItem={item => {
              async function fetchDialog() {
                try {
                  await this.props.fetchDialog(item);
                } catch (err) {
                  throw err;
                }
              }
              return <List.Item style={{ cursor: 'pointer' }} onClick={fetchDialog.bind(this)}>
                {item.name}
                <b>({item.usersCount})</b>
              </ List.Item>
            }}
          />
        </Col>
      </Row>

    );
  }
}