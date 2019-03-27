import React from 'react';
import { Form, Input, Modal, message } from 'antd';

const FormItem = Form.Item;

class AddManagerForm extends React.Component {

  componentDidUpdate() {
    let { t } = this.props;
    if (this.props.app.error_message && this.props.app.error_message.error) {
      message.error(t(this.props.app.error_message.error_message));
    }
  }

  render() {
    const {
      visible, onCancel, onCreate, form, t
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
        title={t('buttons.addOperator')}
        okText={t('Add')}
        cancelText={t('Cancel')}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout='vertical'>

          <FormItem {...formItemLayout} label={t('Email')}>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: t('This field is required') }
              ],
            })(<Input placeholder='email@gmail.com' />)}
          </FormItem>

          <FormItem {...formItemLayout} label={t('Nickname')}>
            {getFieldDecorator('nickname', {
              rules: [
                { required: true, message: t('This field is required') }
              ],
            })(<Input placeholder='BestNickname' />)}
          </FormItem>

          <FormItem {...formItemLayout} label={t('Password')}>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: t('This field is required') }
              ],
            })(<Input placeholder='*********' type='password' />)}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddManagerForm);