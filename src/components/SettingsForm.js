import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { CirclePicker } from 'react-color';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class RegistrationForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSave(values);
      }
    });
  }

  handleChange(color, event) {
    this.props.form.setFieldsValue({
      color: color.hex
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 14 },
      },
    };


    return (
      <Form onSubmit={this.handleSubmit} layout='vertical'>

        <FormItem {...formItemLayout} label='Company name'>
          {getFieldDecorator('companyName', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.companyName : '',
            rules: [
              { required: true }
            ],
          })(<Input placeholder='Company name' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Widget is active'>
          {getFieldDecorator('isActive', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.isActive : '',
            rules: []
          })(<RadioGroup>
            <Radio value={true}>yes</Radio>
            <Radio value={false}>no</Radio>
          </RadioGroup>)}
        </FormItem>

        <FormItem {...formItemLayout} label='Chat should be open?'>
          {getFieldDecorator('openChat', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.openChat : '',
            rules: []
          })(<RadioGroup>
            <Radio value={true}>yes</Radio>
            <Radio value={false}>no</Radio>
          </RadioGroup>)}
        </FormItem>

        <FormItem {...formItemLayout} label='Widget color'>
          {getFieldDecorator('colorR', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.colorR : '',
            rules: [],
          })(<CirclePicker onChangeComplete={this.handleChange.bind(this)} />)}
        </FormItem>


        <FormItem {...formItemLayout}>
          {getFieldDecorator('color', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.color : '',
            rules: [],
          })(<Input placeholder='Color picker soon ...' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Telegram bot name'>
          {getFieldDecorator('telegram_bot_name', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.telegram_bot_name : '',
            rules: [],
          })(<Input placeholder='Telegram bot name' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Telegram token'>
          {getFieldDecorator('telegram_token', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.telegram_token : '',
            rules: [],
          })(<Input placeholder='Telegram bot token' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Viber bot name'>
          {getFieldDecorator('viber_bot_name', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.viber_bot_name : '',
            rules: [],
          })(<Input placeholder='Viber bot name' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Viber bot token'>
          {getFieldDecorator('viber_token', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.viber_token : '',
            rules: [],
          })(<Input placeholder='Viber bot token' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Sms phone'>
          {getFieldDecorator('sms_phone', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.sms_phone : '',
            rules: [],
          })(<Input placeholder='Sms phone' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Sms api token'>
          {getFieldDecorator('sms_token', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.sms_token : '',
            rules: [],
          })(<Input placeholder='Sms api token' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Vk group name'>
          {getFieldDecorator('vk_group_name', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.vk_group_name : '',
            rules: [],
          })(<Input placeholder='Vk group name' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Vk group token'>
          {getFieldDecorator('vk_token', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.vk_token : '',
            rules: [],
          })(<Input placeholder='Vk group token' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Vk confirmation code'>
          {getFieldDecorator('vk_confirmation_code', {
            initialValue: this.props.widgetSettings ? this.props.widgetSettings.vk_confirmation_code : '',
            rules: [],
          })(<Input placeholder='Vk confirmation code' />)
          }
        </FormItem>

        <FormItem {...formItemLayout}>
          <Button type='primary' htmlType='submit'>Save</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegistrationForm);