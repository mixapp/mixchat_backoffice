import React from 'react';
import { Row, Col, List, Input, Form, Button } from 'antd';
const { TextArea } = Input
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class DialogsList extends React.Component {

  state = {
    size: 'small',
    currentRoom: ''
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.currentRoom) {
        this.props.sendMessage({
          roomId: this.state.currentRoom,
          text: values.userComment
        });
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    const userCommentError = isFieldTouched('userComment') && getFieldError('userComment');

    return [
      <Row key='1'>
        <Col span={14} style={{ height: '600px', overflow: 'auto' }}>
          <List
            size="small"
            header={<b>Comments</b>}
            bordered
            dataSource={this.props.messages}
            renderItem={item => {
              return <div>
                <b>{item.u.username}</b>: {item.msg}
              </div>
            }}
          />
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
                  this.setState({
                    currentRoom: item._id
                  });
                  await this.props.fetchDialog(item._id);
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
                <TextArea placeholder="Username" />
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