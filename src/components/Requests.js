import React from 'react';
import {
  Table, Button, Row, Col
} from 'antd';

export default class RequestsListView extends React.Component {

  state = {
    loading: false
  }

  deleteRequest = async (item) => {
    try {
      this.setState({
        loading: true
      })
      await this.props.deleteRequest({ msgId: item._id });
    } catch (err) {
      throw err;
    }
  }

  columns = [{
    title: 'Message',
    render: (item) => {
      return (
        <div>
          <Row>
            <Col span={3}><b>от: {item.u.username}</b></Col>
          </Row>
          <Row>
            <Col span={24}>{item.msg}</Col>
          </Row>
          <br />
          <Row>
            <Col style={{ fontSize: "0.5em", color: "grey" }} span={3}>{item.ts}</Col>
          </Row>
        </div>
      );
    },
    key: 'msg',
  }, {
    title: 'Action',
    key: '_id',
    render: (item) => {
      function del() {
        this.deleteRequest(item);
      }
      return (<Button onClick={del.bind(this)} type="danger">Delete</Button>)
    },
    fixed: 'right',
    width: 100
  }];

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  componentWillReceiveProps() {
    if (this.props.requests) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return <Table rowSelection={this.rowSelection} scroll={{ x: 1800 }} pagination={{ hideOnSinglePage: true }} loading={this.state.loading} columns={this.columns} dataSource={this.props.requests} />;
  }
}