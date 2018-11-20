import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
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

    this.props.form.setFieldsInitialValue(this.props.widgetSettings);

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      /*
      labelCol: {
        xs: { span: 6 },
        sm: { span: 2 },
      },
      */
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
    };


    return (
      <Form onSubmit={this.handleSubmit} layout="vertical">

        <FormItem {...formItemLayout}>
          {getFieldDecorator('isActive', {
            rules: [],
          })(<Checkbox>Widget is active?</Checkbox>)}
        </FormItem>

        <FormItem {...formItemLayout} label="">
          {getFieldDecorator('openChat', {
            rules: [],
          })(<Checkbox>Chat is open by default?</Checkbox>)}
        </FormItem>

        <FormItem {...formItemLayout} label="Widget color">
          {getFieldDecorator('color', {
            rules: [],
          })(<Input placeholder="Color picker soon ..." />)}
        </FormItem>
        
        <FormItem {...formItemLayout} label="Telegram bot name">
          {getFieldDecorator('telegram_bot_name', {
            rules: [],
          })(<Input placeholder="Telegram bot name" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Telegram token">
          {getFieldDecorator('telegram_token', {
            rules: [],
          })(<Input placeholder="Telegram bot token" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Viber bot name">
          {getFieldDecorator('viber_bot_name', {
            rules: [],
          })(<Input placeholder="Viber bot name" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Viber bot token">
          {getFieldDecorator('viber_token', {
            rules: [],
          })(<Input placeholder="Viber bot token" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Sms phone">
          {getFieldDecorator('sms_phone', {
            rules: [],
          })(<Input placeholder="Sms phone" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Sms api token">
          {getFieldDecorator('sms_token', {
            rules: [],
          })(<Input placeholder="Sms api token" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Vk group name">
          {getFieldDecorator('vk_group_name', {
            rules: [],
          })(<Input placeholder="Vk group name" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Vk group token">
          {getFieldDecorator('vk_token', {
            rules: [],
          })(<Input placeholder="Vk group token" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Vk confirmation code">
          {getFieldDecorator('vk_confirmation_code', {
            rules: [],
          })(<Input placeholder="Vk confirmation code" />)
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