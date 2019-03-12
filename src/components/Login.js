import React from 'react';
import {
  Form,
  Input,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
} from 'antd';

class LoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    let { t } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100vh' }}>
        <Col>
          <h2 className='form-title'>{t('Authorization')}</h2>
          <div className='tech-forms'>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: t('Please input your username!') }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={t('Username')} />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: t('Please input your password!') }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={t('Password')} />
                )}
              </Form.Item>
              <Form.Item>
                <a href="/registration">{t('Register now')}</a>
                <a className="login-form-forgot" href="/forgot">{t('Forgot password')}</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  {t('Log in')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);

export default Form.create()(WrappedLoginForm);