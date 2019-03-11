import React from 'react';
import {
  Form,
  Input,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
  Alert
} from 'antd';
import * as Api from '../api';

class RegistrationForm extends React.Component {

  state = {
    confirmDirty: false
  };

  componentDidUpdate() {
    if (this.props.app.registrationFormSuccess)
      Api.getAuthUrl();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.registration({ user: values });
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    let { t } = this.props;
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(t('Two passwords that you enter is inconsistent!'));
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    let { t } = this.props;
    let { registrationFormError, error_message } = this.props.app;

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelcol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrappercol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100vh' }}>
        <Col span={10} style={{ backgroundColor: '#f8f8f8', padding: '25px 40px 10px 40px', borderRadius: '15px' }}>
          <h2>{t('Registration form')}</h2>
          <div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item
                label={t('Email')}
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: t('The input is not valid E-mail!'),
                  }, {
                    required: true, message: t('Please input your E-mail!'),
                  }],
                  initialValue: 'threelo@ya.ru'
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                label={t('Password')}
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: t('Please input your password!'),
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                  initialValue: 'qwerty123456'
                })(
                  <Input type="password" />
                )}
              </Form.Item>
              <Form.Item
                label={t('Confirm Password')}
              >
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: t('Please confirm your password!'),
                  }, {
                    validator: this.compareToFirstPassword.bind(t),
                  }],
                  initialValue: 'qwerty123456'
                })(
                  <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
              </Form.Item>
              <Form.Item
                label={(
                  <span>
                    {t('Nickname')}
                  </span>
                )}
              >
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: t('Please input your nickname!'), whitespace: true }],
                  initialValue: 'SashaMailRu'
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                label={t('Captcha')}
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: t('Please input the captcha you got!') }],
                      initialValue: 'qwerty123456'
                    })(
                      <Input />
                    )}
                  </Col>
                  <Col span={12}>
                    <Button><Icon type="retweet" /></Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>{t('I have read the')} <a href="">{t('agreement')}</a></Checkbox>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">{t('Register')}</Button>
              </Form.Item>
              {registrationFormError && <Alert
                message={t('Error')}
                description={t(error_message)}
                type="error"
                showIcon
              />}
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default Form.create()(WrappedRegistrationForm);