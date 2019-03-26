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
import * as Api from '../api';

class ForgotForm extends React.Component {

  state = {
    loading: false,
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
          recovery_token: a[1],
          loading: false
        })
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
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
    let { recovery_token, loading } = this.state;

    return (
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100vh' }}>
        <Col span={10}>
          {!recovery_token && <div>
            {!recoveryFormSuccess && <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 className='form-title'>{t('Recovery password')}</h2>
              <div className='tech-forms'>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item
                    label={t('Email')}
                  >
                    {getFieldDecorator('email', {
                      rules: [{
                        type: 'email', message: t('The input is not valid E-mail!'),
                      }, {
                        required: true, message: t('Please input your E-mail!'),
                      }]
                    })(
                      <Input />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>{t('Recovery')}</Button>
                    <div className='login-link'><a href={Api.getAuthUrl()}>{t('Log in')}</a></div>
                  </Form.Item>
                  {recoveryFormError && <Alert
                    message={t('Error')}
                    description={t(error_message)}
                    type="error"
                    showIcon
                  />}
                </Form>
              </div>
            </div>}
            {recoveryFormSuccess && <div>
              <h2 className='form-title'>{t('Operation successful')}</h2>
              <p className='form-msg'>{t('To continue the password reset operation, you need to follow the link sent to your account registration mail')}</p>
              <div className='login-link'><a href={Api.getAuthUrl()}>{t('Log in')}</a></div>
            </div>}
          </div>}
          {recovery_token && <div>
            {!recoveryByTokenSuccess && <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 className='form-title'>{t('New password')}</h2>
              <div className='tech-forms'>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item
                    label={t('New password')}
                  >
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: t('Please input your password!'),
                      }, {
                        validator: this.validateToNextPassword,
                      }]
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
                      }]
                    })(
                      <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>{t('Apply')}</Button>
                    <div className='login-link'><a href={Api.getAuthUrl()}>{t('Log in')}</a></div>
                  </Form.Item>
                  {recoveryByTokenError && <Alert
                    type="error"
                    message={t(error_message)}
                    banner />}
                </Form>
              </div>
            </div>}
          </div>}
          {recoveryByTokenSuccess && <div>
            <h2 className='form-title'>{t('Operation successful')}</h2>
            <p className='form-msg'>{t('Your password has been changed to a new one')}</p>
            <div className='login-link'><a href={Api.getAuthUrl()}>{t('Log in')}</a></div>
          </div>}
        </Col>
      </Row>
    );
  }
}

const WrappedForgotForm = Form.create({ name: 'forgot' })(ForgotForm);

export default Form.create()(WrappedForgotForm);