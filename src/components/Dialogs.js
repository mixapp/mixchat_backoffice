import React from 'react';
import * as Scroll from 'react-scroll';
import { Row, Col, Input, Form, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import CommentList from './items/CommentList';
import SendButton from '../components/svg/send_button';
const { TextArea } = Input
const FormItem = Form.Item;

/* Scroll */
const scroll = Scroll.animateScroll;

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

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.currentRoom && values.userComment.replace(/\s/g, '').length) {
        this.props.sendMessage({
          room: this.state.currentRoom,
          roomId: this.state.currentRoom._id,
          text: values.userComment
        });
      }
      this.props.form.resetFields('userComment');
    });
  }

  fetchData = async () => {
    this.props.fetchHistory({
      count: this.state.currentPage * this.state.pageItemsCount,
      room: this.state.currentRoom
    });
  }

  handleInfiniteOnLoad = async () => {
    if (this.state.currentPage * this.state.pageItemsCount >= this.state.messagesCount) {
      this.setState({
        hasMore: false
      });
      return;
    }
    this.setState({
      currentPage: ++this.state.currentPage
    })
    this.fetchData();
    this.scrollTo(50, { duration: 0 });
  }

  async componentDidUpdate() {
    let { messages, message } = this.props.app;
    if (messages) {
      let lm = messages[messages.length - 1];
      if (this.lm) {
        if (message && this.lm._id !== message._id) {
          this.lm = lm;
          this.scrollToBottom({ delay: 50, duration: 0 });
        }
        if (this.state.currentPage === 0) {
          this.scrollToBottom({ delay: 50, duration: 0 });
        }
      } else {
        this.lm = lm;
        this.scrollToBottom({ delay: 50, duration: 0 });
      }
    }
  }

  async componentWillReceiveProps() {
    let { currentRoom, messagesCount } = this.props.app;
    if (currentRoom) {
      if (this.state.currentRoom && currentRoom._id !== this.state.currentRoom._id) {
        this.setState({
          hasMore: true,
          currentPage: 0
        });
      }
      this.setState({
        currentRoom: currentRoom
      });
    }
    if (messagesCount) {
      this.setState({
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

  componentDidMount() {
    let { messagesCount, currentRoom } = this.props.app;
    this.setState({
      messagesCount: messagesCount,
      currentRoom: currentRoom
    });

    let commentConteiner, chatConteiner, chatHeight;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      if (this.scrollHeight < 100) {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        if (this.scrollHeight - 50 > -1) {
          chatConteiner.style.height = chatHeight - (this.scrollHeight - 50) + 'px';
        }
      }
    }

    setTimeout(() => {
      commentConteiner = document.getElementsByClassName('content dialogs')[0];
      chatConteiner = document.getElementsByClassName('chat-conteiner')[0];
      chatHeight = commentConteiner.clientHeight - 55 - 85; //TODO auto calc height
      chatConteiner.style.height = chatHeight + 'px'
    }, 0);
  }

  render() {
    let { t } = this.props;
    let { dialogLoader } = this.props.app;
    const {
      getFieldError, isFieldTouched, getFieldDecorator
    } = this.props.form;
    const userCommentError = isFieldTouched('userComment') && getFieldError('userComment');
    return [
      <Row key='1'>
        <Col span={24} style={{ overflow: 'hidden', border: 'none' }}>
          <Spin spinning={dialogLoader} delay={0}>
            <div className='chat-conteiner' id='chat-conteiner'>
              <InfiniteScroll
                initialLoad={false}
                isReverse={true}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}
                threshold={1}
              >
                <CommentList {... this.props} />
              </InfiniteScroll>
            </div>
          </Spin>
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
              <div style={{ display: 'flex' }}>
                {getFieldDecorator('userComment')(
                  <TextArea className='chat-textarea' placeholder={`${t('Enter your message')} ...`} onKeyUp={this.sendMessage.bind(this)} />
                )}
                <div
                  onClick={this.handleSubmit}
                  className='send-button'
                >
                  <SendButton />
                </div>
              </div>
            </FormItem>
          </Form>
        </Col>
      </Row>
    ];
  }
}

export default Form.create()(DialogsList);