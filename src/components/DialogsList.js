import React from 'react';
import { Row, Col, List, Input, Form, Button, Avatar, Spin, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import * as Api from '../api';
const { TextArea } = Input
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class DialogsList extends React.Component {

  state = {
    size: 'small',
    currentRoom: '',
    messages: '',
    data: [],
    loading: false,
    hasMore: true,
    latest: ''
  }

  test = async () => {
    let messagesCount = await Api.fetchDialogInfo({ roomId: this.state.currentRoom });
    this.setState({
      messagesCount: messagesCount.data.group.msgs,
      hasMore: true,
      messages: [],
      data: [],
      loading: false,
      latest: ''
    });
    await this.fetchData((res) => {
      this.setState({
        data: res.results,
      });
    });
    document.getElementById('test123').scrollTop = 99999;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.currentRoom) {
        this.props.sendMessage({
          roomId: this.state.currentRoom,
          text: values.userComment
        });
      }
      this.props.form.resetFields('userComment');
    });
  }

  fetchData = async (callback) => {
    let messages = await Api.fetchDialog({ roomId: this.state.currentRoom, count: 20, latest: this.state.latest });
    if (messages[messages.length - 1])
      await this.setState({
        latest: messages[messages.length - 1].ts
      });
    callback({ results: messages.reverse() });
  }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > this.state.messagesCount) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = res.results.concat(data);
      this.setState({
        data,
        loading: false
      });
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    const userCommentError = isFieldTouched('userComment') && getFieldError('userComment');
    return [
      <Row key='1'>
        <Col span={14} style={{ height: '600px', overflow: 'auto', padding: '20px' }} id='test123'>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            isReverse={true}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.data}
              renderItem={item => {
                return <List.Item key={item._id}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.u.name}</a>}
                  />
                  <div>{item.msg}</div>
                </List.Item>
              }
              }
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </Col>
        <Col span={1}></Col>
        <Col span={9} style={{ overflow: 'hidden' }}>
          <List
            size="small"
            header={<b>List of groups</b>}
            bordered
            dataSource={this.props.dialogs}
            renderItem={item => {
              async function fetchDialog() {
                try {
                  await this.setState({
                    currentRoom: item._id
                  });
                  await this.test({ roomId: item._id, count: 1000 });
                } catch (err) {
                  throw err;
                }
              }
              return <List.Item
                style={{ cursor: 'pointer' }}
                onClick={fetchDialog.bind(this)}
              >
                {item.name.length > 15 ? item.name.substring(0, 12) + '...' : item.name}
                <b>({item.msgs})</b>
              </ List.Item>
            }}
          />
        </Col>
      </Row>,
      <Row key='2'>
        <Col span={14} style={{ height: '600px', overflow: 'auto' }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              validateStatus={userCommentError ? 'error' : ''}
              help={userCommentError || ''}
            >
              {getFieldDecorator('userComment', {
                rules: [{ required: true, message: 'Please input your message!' }],
              })(
                <TextArea placeholder="You commnet ..." />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Send
          </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    ];
  }
}

export default Form.create()(DialogsList);