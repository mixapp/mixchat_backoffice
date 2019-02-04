import React from 'react';
import { Form, Input, Button, Radio, Collapse, Alert } from 'antd';
import { CirclePicker } from 'react-color';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;

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
    const companyId = this.props.config ? this.props.config.companyId : ' pending... ';
    return (
      <div>
        <label><b>Use this code into body of your HTML</b></label>
        <Alert message={"<script> window.onload = () => { Omni.Widget({ companyId: '" + companyId + "' }); } </script>"} type="info" />
        <br />
        <Form onSubmit={this.handleSubmit} layout='vertical'>
          <FormItem label='Company name'>
            {getFieldDecorator('companyName', {
              initialValue: this.props.widgetSettings ? this.props.widgetSettings.companyName : '',
              rules: [
                { required: true }
              ],
            })(<Input placeholder='Company name' />)}
          </FormItem>

          <FormItem label='Widget is active'>
            {getFieldDecorator('isActive', {
              initialValue: this.props.widgetSettings ? this.props.widgetSettings.isActive : '',
              rules: []
            })(<RadioGroup>
              <Radio value={true}>yes</Radio>
              <Radio value={false}>no</Radio>
            </RadioGroup>)}
          </FormItem>

          <FormItem label='Chat should be open?'>
            {getFieldDecorator('openChat', {
              initialValue: this.props.widgetSettings ? this.props.widgetSettings.openChat : '',
              rules: []
            })(<RadioGroup>
              <Radio value={true}>yes</Radio>
              <Radio value={false}>no</Radio>
            </RadioGroup>)}
          </FormItem>

          <FormItem label='Widget color'>
            {getFieldDecorator('colorR', {
              initialValue: this.props.widgetSettings ? this.props.widgetSettings.colorR : '',
              rules: [],
            })(<CirclePicker onChangeComplete={this.handleChange.bind(this)} />)}
          </FormItem>


          <FormItem>
            {getFieldDecorator('color', {
              initialValue: this.props.widgetSettings ? this.props.widgetSettings.color : '',
              rules: [],
            })(<Input placeholder='Color picker soon ...' />)}
          </FormItem>

          <Collapse bordered={false} accordion defaultActiveKey={['1']} onChange={this.callback}>
            <Panel header="Telegram" key="1">
              <FormItem label='Bot name'>
                {getFieldDecorator('telegram_bot_name', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.telegram_bot_name : '',
                  rules: [],
                })(<Input placeholder='Bot name' />)}
              </FormItem>

              <FormItem label='Bot token'>
                {getFieldDecorator('telegram_token', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.telegram_token : '',
                  rules: [],
                })(<Input placeholder='Bot token' />)}
              </FormItem>
            </Panel>

            <Panel header="Viber" key="2">
              <FormItem label='Bot name'>
                {getFieldDecorator('viber_bot_name', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.viber_bot_name : '',
                  rules: [],
                })(<Input placeholder='Bot name' />)}
              </FormItem>

              <FormItem label='Bot token'>
                {getFieldDecorator('viber_token', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.viber_token : '',
                  rules: [],
                })(<Input placeholder='Bot token' />)}
              </FormItem>
            </Panel>

            <Panel header="Sms settings" key="3">
              <FormItem label='Phone'>
                {getFieldDecorator('sms_phone', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.sms_phone : '',
                  rules: [],
                })(<Input placeholder='Phone' />)}
              </FormItem>

              <FormItem label='API token'>
                {getFieldDecorator('sms_token', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.sms_token : '',
                  rules: [],
                })(<Input placeholder='API token' />)}
              </FormItem>
            </Panel>

            <Panel header="VK settings" key="4">
              <FormItem label='Group name'>
                {getFieldDecorator('vk_group_name', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.vk_group_name : '',
                  rules: [],
                })(<Input placeholder='Group name' />)}
              </FormItem>

              <FormItem label='Group token'>
                {getFieldDecorator('vk_token', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.vk_token : '',
                  rules: [],
                })(<Input placeholder='Group token' />)}
              </FormItem>

              <FormItem label='Confirmation code'>
                {getFieldDecorator('vk_confirmation_code', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.vk_confirmation_code : '',
                  rules: [],
                })(<Input placeholder='Confirmation code' />)
                }
              </FormItem>
            </Panel>

            <Panel header="FB Messenger settings" key="5">
              <FormItem label='API key'>
                {getFieldDecorator('fbm_api_key', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.fbm_api_key : '',
                  rules: [],
                })(<Input placeholder='API key' />)}
              </FormItem>

              <FormItem label='Secret'>
                {getFieldDecorator('fbm_secret', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.fbm_secret : '',
                  rules: [],
                })(<Input placeholder='Secret' />)}
              </FormItem>

              <FormItem label='Page URL'>
                {getFieldDecorator('fbm_page', {
                  initialValue: this.props.widgetSettings ? this.props.widgetSettings.fbm_page : '',
                  rules: [],
                })(<Input placeholder='Page URL' />)}
              </FormItem>
            </Panel>

          </Collapse>
          <FormItem>
            <br />
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit'>Save</Button>
          </FormItem>
        </Form >
      </div>
    );
  }
}

export default Form.create()(RegistrationForm);