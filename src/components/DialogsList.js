import React from 'react';
import { Row, Col, List } from 'antd';

export default class DialogsList extends React.Component {

  state = {
    size: 'small'
  }

  render() {
    return (
      <Row>
        <Col span={14}>
        </Col>
        <Col span={10} style={{ overflow: 'hidden' }}>
          <List
            size="small"
            header={<div>List of groups</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={this.props.dialogs}
            renderItem={item => (
              <List.Item style={{ cursor: 'pointer' }}>
                {item.name}
                <b>({item.usersCount})</b>
              </ List.Item>
            )}
          />
        </Col>
      </Row>

    );
  }
}