import React from 'react';
import { Form, Input, Modal, message } from 'antd';

const FormItem = Form.Item;

class AddManagerForm extends React.Component {

  componentDidUpdate() {
    if (this.props.error_message && this.props.error_message.error) {
      message.error(this.props.error_message.error_message);
    }
  }

  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 14 },
      },
    };


    return (
      <Modal
        visible={visible}
        title="Add new manager"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout='vertical'>

          <FormItem {...formItemLayout} label='E-mail'>
            {getFieldDecorator('email', {
              rules: [
                { required: true }
              ],
            })(<Input placeholder='email@gmail.com' />)}
          </FormItem>

          <FormItem {...formItemLayout} label='Nickname'>
            {getFieldDecorator('nickname', {
              rules: [
                { required: true }
              ],
            })(<Input placeholder='BestNickname' />)}
          </FormItem>

          <FormItem {...formItemLayout} label='Password'>
            {getFieldDecorator('password', {
              rules: [
                { required: true }
              ],
            })(<Input placeholder='*********' type='password' />)}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddManagerForm);