import React from 'react';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;


class RegistrationForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSave(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
    };
  

    return (
      <Form onSubmit={this.handleSubmit} layout="vertical">

        <FormItem {...formItemLayout}>
          {getFieldDecorator('telegram_bot_name', {
            rules: [],
          })(<Input placeholder="Telegram bot name" />)}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('telegram_token', {
            rules: [],
          })(<Input placeholder="Telegram token" />)}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('viber_bot_name', {
            rules: [],
          })(<Input placeholder="viber_bot_name" />)}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('viber_token', {
            rules: [],
          })(<Input placeholder="viber_token" />)}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('sms_phone', {
            rules: [],
          })(<Input placeholder="sms_phone" />)}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('sms_token', {
            rules: [],
          })(<Input placeholder="sms_token" />)}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('vk_group_name', {
            rules: [],
          })(<Input placeholder="vk_group_name" />)}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('vk_token', {
            rules: [],
          })(<Input placeholder="vk_token" />)}
        </FormItem>

        <FormItem {...formItemLayout}>
            {
                getFieldDecorator('vk_confirmation_code', {rules: []})
                (<Input placeholder="vk_confirmation_code" />)
            }
        </FormItem>
        
        <FormItem {...formItemLayout}>
          <Button type="primary" htmlType="submit">Save</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegistrationForm);