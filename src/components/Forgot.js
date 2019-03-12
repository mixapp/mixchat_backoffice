import React from 'react';
import { history } from '../store';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Alert
} from 'antd';

class ForgotForm extends React.Component {

  state = {
    recovery_token: null
  }

  componentWillMount() {
    let { search } = history.location;
    search = search.length > 1 ? search.substr(1) : search;
    search = search.split('&');
    for (let i = 0; i < search.length; i++) {
      let a = search[i].split('=');
      if (a[0] === 'recovery_token') {
        this.setState({
          recovery_token: a[1]
        })
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (this.state.recovery_token) {
          values.token = this.state.recovery_token;
          this.props.recoveryToken(values);
        } else
          this.props.recovery(values);
      }
    });
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

  render() {
    let { t } = this.props;
    let { recoveryFormSuccess, recoveryFormError, recoveryByTokenError, recoveryByTokenSuccess, error_message } = this.props.app;
    const { getFieldDecorator } = this.props.form;
    let { recovery_token } = this.state;

    return (
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100vh' }}>
        <Col>
          <h2 className='form-title'>{t('Recovery password')}</h2>
          {!recovery_token && <div className='tech-forms'>
            {!recoveryFormSuccess && <Form onSubmit={this.handleSubmit}>
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
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">{t('Recovery')}</Button>
                <div className='login-link'><a href="/login">{t('Log in')}</a></div>
              </Form.Item>
              {recoveryFormError && <Alert
                message={t('Error')}
                description={t(error_message)}
                type="error"
                showIcon
              />}
            </Form>}
            {recoveryFormSuccess && <Alert style={{ marginBottom: '15px' }}
              message={t('Operation successful')}
              description={t('To continue the password reset operation, you need to follow the link sent to your account registration mail')}
              type="success"
              showIcon
            />}
          </div>}
          {recovery_token && <div className='tech-forms'>
            {!recoveryByTokenSuccess && <Form onSubmit={this.handleSubmit}>
              <Form.Item
                label={t('New password')}
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
                label={t('Confirm new password')}
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
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">{t('Change password')}</Button>
                {t('Or')} <a href="/login">{t('Log in')}</a>
              </Form.Item>
              {recoveryByTokenError && <Alert
                message={t('Error')}
                description={t(error_message)}
                type="error"
                showIcon
              />}
            </Form>}
            {recoveryByTokenSuccess && <div>
              <Alert style={{ marginBottom: '15px' }}
                message={t('Operation successful')}
                description={t('Your password has been changed to a new one')}
                type="success"
                showIcon
              />
              <a href="/login">{t('Log in')}</a>
            </div>}
          </div>}
        </Col>
      </Row>
    );
  }
}

const WrappedForgotForm = Form.create({ name: 'forgot' })(ForgotForm);

export default Form.create()(WrappedForgotForm);