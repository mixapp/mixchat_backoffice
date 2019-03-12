import React from 'react';
import { history } from '../store';
import {
  Form,
  Input,
  Row,
  Col,
  Button
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
    let { recoveryFormSuccess } = this.props.app;
    const { getFieldDecorator } = this.props.form;
    let { recovery_token } = this.state;
    console.log(recoveryFormSuccess);

    return (
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100vh' }}>
        <Col span={10} style={{ backgroundColor: '#f8f8f8', padding: '25px 40px 10px 40px', borderRadius: '15px' }}>
          <h2>{t('Recovery form')}</h2>
          {!recovery_token && <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                <Button type="primary" htmlType="submit" className="login-form-button">{t('Send to Email')}</Button>
                {t('Or')} <a href="/login">{t('Log in')}</a>
              </Form.Item>
            </Form>
          </div>}
          {recovery_token && <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
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
            </Form>
          </div>}
        </Col>
      </Row>
    );
  }
}

const WrappedForgotForm = Form.create({ name: 'forgot' })(ForgotForm);

export default Form.create()(WrappedForgotForm);