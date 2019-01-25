import React from 'react';
import * as Scroll from 'react-scroll';
import { Row, Col, Input, Form, Button, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import CommentClass from './items/Comment';
const { TextArea } = Input
const FormItem = Form.Item;

/* Scroll */
const scroll = Scroll.animateScroll;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class DialogsList extends React.Component {
  constructor(props) {
    super(props);
    this.lm = null;
  }

  state = {
    currentRoom: null,
    hasMore: true,
    pageItemsCount: 15,
    currentPage: 0,
    lm: null, //last message,
    messagesCount: 0
  }

  scrollToBottom(options) {
    scroll.scrollToBottom({
      containerId: 'chat-conteiner',
      ...options
    });
  }

  scrollToTop(options) {
    scroll.scrollToTop({
      containerId: 'chat-conteiner',
      ...options
    });
  }

  scrollTo(to, options) {
    scroll.scrollTo(to, {
      containerId: 'chat-conteiner',
      ...options
    });
  }

  sendMessage(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.handleSubmit();
    }
  }

  handleSubmit = (e) => {
    if (e)
      e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.currentRoom && values.userComment.replace(/\s/g, '').length) {
        this.props.sendMessage({
          roomId: this.state.currentRoom._id,
          text: values.userComment
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
        if (this.state.currentPage === 1) {
          this.scrollToBottom({ duration: 0 });
        }
      } else {
        this.lm = lm;
        this.scrollToBottom({ duration: 0 });
      }
    }
  }

  async componentWillReceiveProps() {
    let { currentRoomId, messagesCount } = this.props;
    if (currentRoomId) {
      if (this.state.currentRoom && currentRoomId !== this.state.currentRoom._id) {
        await this.setState({
          hasMore: true,
          currentPage: 0
        });
      }
      await this.setState({
        currentRoom: {
          _id: currentRoomId
        }
      });
    }
    if (messagesCount) {
      await this.setState({
        messagesCount: messagesCount
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      currentRoom: null,
      lm: null //last message
    });
  }

  fetchData = async () => {
    this.props.fetchDialog({
      count: this.state.currentPage * this.state.pageItemsCount,
      room: this.state.currentRoom
    });
  }

  handleInfiniteOnLoad = async () => {
    if (this.state.currentPage * this.state.pageItemsCount >= this.state.messagesCount) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false
      });
      return;
    }
    this.setState({
      currentPage: ++this.state.currentPage
    })
    this.fetchData();
    this.scrollTo(150, { duration: 0 });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    const userCommentError = isFieldTouched('userComment') && getFieldError('userComment');
    return [
      <Row key='1'>
        <Col span={24} style={{ overflow: 'hidden', border: 'none' }}>
          <div style={{ height: '600px', width: '100%', overflow: 'auto', padding: '15px' }} id='chat-conteiner'> {/* TODO width: 104% */}
            <InfiniteScroll
              initialLoad={false}
              isReverse={true}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!this.state.loading && this.state.hasMore}
              useWindow={false}
              threshold={5}
            >
              <CommentClass
                messages={this.props.messages}
              />
            </InfiniteScroll>
          </div>
        </Col>
        <Col span={0}></Col>
      </Row >,
      <Row key='2'>
        <Col span={24}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              validateStatus={userCommentError ? 'error' : ''}
              help={userCommentError || ''}
              style={{ marginBottom: '0' }}
            >
              {getFieldDecorator('userComment', {
                rules: [{ required: true, message: 'Please input your message!' }],
              })(
                <TextArea placeholder="You commnet ..." onKeyUp={this.sendMessage.bind(this)} style={{ borderRadius: '5px', backgroundColor: '#f6f6f6' }} />
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