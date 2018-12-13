import React from 'react';
import * as Scroll from 'react-scroll';
import { Row, Col, List, Input, Form, Button, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import * as Api from '../api';
import Comment from '../components/items/Comment'
const { TextArea } = Input
const FormItem = Form.Item;

/* Scroll */
const scroll = Scroll.animateScroll;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class DialogsList extends React.Component {
  constructor() {
    super();
    this.lm = null;
  }

  state = {
    size: 'small',
    currentRoom: null,
    loading: false,
    hasMore: true,
    pageItemsCount: 15,
    currentPage: 0,
    lm: null //last message
  }

  scrollToBottom(options) {
    scroll.scrollToBottom({
      containerId: 'chat-conteiner',
      ...options
    });
  }

  fetchDialog = async () => {
    let messagesCount = await Api.fetchDialogInfo({ roomId: this.state.currentRoom });
    this.setState({
      messagesCount: messagesCount.data.group.msgs,
      hasMore: true,
      lm: null
    });
    await this.fetchData();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.currentRoom) {
        this.props.sendMessage({
          roomId: this.state.currentRoom,
          text: values.userComment,
          messageCount: this.props.messages.length
        });
      }
      this.props.form.resetFields('userComment');
    });
  }

  async componentDidUpdate() {
    let { messages, message } = this.props;
    if (messages) {
      let lm = messages[messages.length - 1];
      if (this.lm) {
        if (message && this.lm._id !== message._id) {
          this.lm = lm;
          this.scrollToBottom({ duration: 0 });
        }
      } else {
        this.lm = lm;
        this.scrollToBottom({ duration: 0 });
      }
    }
  }

  async componentWillReceiveProps() {
    let { messages } = this.props;
    if (messages) {
      this.setState({
        loading: false
      });
    }
  }

  fetchData = async () => {
    this.props.fetchDialog({ roomId: this.state.currentRoom, count: this.state.currentPage * this.state.pageItemsCount });
  }

  handleInfiniteOnLoad = () => {
    this.setState({
      loading: true,
    });
    if (this.state.currentPage * this.state.pageItemsCount >= this.state.messagesCount) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.setState({
      currentPage: ++this.state.currentPage
    })
    this.fetchData();
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    const userCommentError = isFieldTouched('userComment') && getFieldError('userComment');
    return [
      <Row key='1'>
        <Col span={14} style={{ height: '600px', overflow: 'auto', padding: '10px' }} id='chat-conteiner'>
          <InfiniteScroll
            initialLoad={false}
            isReverse={true}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
            threshold={20}
          >
            <Comment
              state={this.state}
              messages={this.props.messages}
            />
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
                    currentRoom: item._id,
                    currentPage: 1
                  });
                  await this.fetchDialog();
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