import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Alert
} from 'antd';

class RegistrationForm extends React.Component {

  state = {
    confirmDirty: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.registrationForm({ user: values });
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
    let { registrationFormError, registrationFormSuccess, error_message } = this.props.app;

    const { getFieldDecorator } = this.props.form;

    return (
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100vh' }}>
        <Col>
          <h2 className='form-title'>{t('Registration form')}</h2>
          <div className='tech-forms'>
            {!registrationFormSuccess && <Form onSubmit={this.handleSubmit} className='login-form'>
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
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">{t('Register')}</Button>
                {t('Or')} <a href="/login">{t('Log in')}</a>
              </Form.Item>
              {registrationFormError && <Alert
                message={t('Error')}
                description={t(error_message)}
                type="error"
                showIcon
              />}
            </Form>}
            {registrationFormSuccess && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Alert style={{ marginBottom: '15px' }}
                message={t('Successful registration')}
                description={t('To continue working in the system, you need to confirm your account by clicking on the link in the letter that we sent you by mail')}
                type="success"
                showIcon
              />
              <a href="/login">{t('Log in')}</a>
            </div>}
          </div>
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default Form.create()(WrappedRegistrationForm);