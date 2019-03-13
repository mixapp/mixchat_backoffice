import React from 'react';
import { Form, Input, Button, Radio, Collapse, Alert, message, Icon } from 'antd';
import { CirclePicker } from 'react-color';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;

class RegistrationForm extends React.Component {

  state = {
    widgetCode: true
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.saveSettings(values);
      }
    });
  }

  handleChange(color, event) {
    this.props.form.setFieldsValue({
      color: color.hex
    });
  }

  fallbackCopyTextToClipboard(text) {
    let { t } = this.props;
    var textArea = document.createElement("textarea");
    textArea.value = this.widgetCode;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      if (successful)
        message.success(t('Code copied'));
      else
        message.error(t('Copy failed'));
    } catch (err) {
      message.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  }

  render() {
    let { t } = this.props;
    const { getFieldDecorator } = this.props.form;
    const companyId = this.props.app.config ? this.props.app.config.companyId : ' pending... ';
    this.meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    this.widgetCode = "<script src='https://cdn.jsdelivr.net/gh/mixapp/mixchat_widget@8d1cb879d6565ea7cfb4182fbf2a32aaa6265cbd/build/widget.js?v=1'></script>" +
      "<script>window.onload=()=>{ Omni.Widget({ companyId: '" + companyId + "' }); }</script>";

    return (
      <div>
        <h2><b>{t('mainMenu.settings')}</b></h2>
        <label className='settings-header-bold'>{t('Copy this code into HTML header')}</label>
        <div className='settings-alert'>
          <Alert message={this.meta} type="info" />
          <span className='settings-copy-button'><Icon type='copy' /> Click to copy</span>
        </div>

        <label className='settings-header-bold'>{t('Copy this code into body of your HTML')}</label>
        <div className='settings-alert'>
          <Alert message={this.widgetCode} type="info" />
          <span className='settings-copy-button'><Icon type='copy' /> Click to copy</span>
          {/* this.fallbackCopyTextToClipboard.bind(this) */}
        </div>
        <br />
        <Form onSubmit={this.handleSubmit} layout='vertical'>
          <FormItem label={t('Company name')}>
            {getFieldDecorator('companyName', {
              initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.companyName : '',
              rules: [
                { required: true }
              ],
            })(<Input placeholder={t('Company name')} />)}
          </FormItem>

          <FormItem label={t('Widget is active')}>
            {getFieldDecorator('isActive', {
              initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.isActive : '',
              rules: []
            })(<RadioGroup>
              <Radio value={true}>{t('Yes')}</Radio>
              <Radio value={false}>{t('No')}</Radio>
            </RadioGroup>)}
          </FormItem>

          <FormItem label={t('Chat should be open?')}>
            {getFieldDecorator('openChat', {
              initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.openChat : '',
              rules: []
            })(<RadioGroup>
              <Radio value={true}>{t('Yes')}</Radio>
              <Radio value={false}>{t('No')}</Radio>
            </RadioGroup>)}
          </FormItem>

          <FormItem label={t('Widget color')}>
            {getFieldDecorator('colorR', {
              initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.colorR : '',
              rules: [],
            })(<CirclePicker onChangeComplete={this.handleChange.bind(this)} />)}
          </FormItem>


          <FormItem>
            {getFieldDecorator('color', {
              initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.color : '',
              rules: [],
            })(<Input placeholder='Color picker soon ...' />)}
          </FormItem>

          <FormItem label={t('eventWebhook')}>
            {getFieldDecorator('eventWebhook', {
              initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.eventWebhook : '',
              rules: [],
            })(<Input />)}
          </FormItem>

          <Collapse bordered={false} accordion defaultActiveKey={['1']} onChange={this.callback}>
            <Panel header="Telegram" key="1">
              <FormItem label={t('Bot name')}>
                {getFieldDecorator('telegram_bot_name', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.telegram_bot_name : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>

              <FormItem label={t('Bot token')}>
                {getFieldDecorator('telegram_token', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.telegram_token : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>
            </Panel>

            <Panel header="Viber" key="2">
              <FormItem label={t('Bot name')}>
                {getFieldDecorator('viber_bot_name', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.viber_bot_name : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>

              <FormItem label={t('Bot token')}>
                {getFieldDecorator('viber_token', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.viber_token : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>
            </Panel>

            <Panel header="Plusofon" key="3">
              <FormItem label={t('Phone')}>
                {getFieldDecorator('sms_phone', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.sms_phone : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>

              <FormItem label={t('API token')}>
                {getFieldDecorator('sms_token', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.sms_token : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>
            </Panel>

            <Panel header="VK" key="4">
              <FormItem label={t('Group name')}>
                {getFieldDecorator('vk_group_name', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.vk_group_name : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>

              <FormItem label={t('Group token')}>
                {getFieldDecorator('vk_token', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.vk_token : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>

              <FormItem label={t('Confirmation code')}>
                {getFieldDecorator('vk_confirmation_code', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.vk_confirmation_code : '',
                  rules: [],
                })(<Input placeholder='' />)
                }
              </FormItem>
            </Panel>

            <Panel header="FB Messenger" key="5">
              <FormItem label={t('API key')}>
                {getFieldDecorator('fbm_api_key', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.fbm_api_key : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>

              <FormItem label={t('Secret')}>
                {getFieldDecorator('fbm_secret', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.fbm_secret : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>

              <FormItem label={t('Page URL')}>
                {getFieldDecorator('fbm_page', {
                  initialValue: this.props.app.widgetSettings ? this.props.app.widgetSettings.fbm_page : '',
                  rules: [],
                })(<Input placeholder='' />)}
              </FormItem>
            </Panel>

          </Collapse>
          <FormItem>
            <br />
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit'>{t('Save')}</Button>
          </FormItem>
        </Form >
      </div>
    );
  }
}

export default Form.create()(RegistrationForm);