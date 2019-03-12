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

  handleInputChange = (value) => {
    this.props.form.setFieldsValue({
      nickname: value.split('@')[0]
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
        <Col span={10}>
          {!registrationFormSuccess && <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className='form-title'>{t('Registration')}</h2>
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
                    <Input onChange={e => this.handleInputChange(e.target.value)} />
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
                    }]
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
                    }]
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
                    rules: [{
                      required: true,
                      min: 8,
                      max: 30,
                      message: t('Please input your nickname!') + ' ' + t('min 8 symb'),
                      whitespace: true
                    }]
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">{t('Register')}</Button>
                  <div className='login-link'><a href="/login">{t('Log in')}</a></div>
                </Form.Item>
                {registrationFormError && <Alert
                  message={t('Error')}
                  description={t(error_message)}
                  type="error"
                  showIcon
                />}
              </Form>
            </div>
          </div>}
          {registrationFormSuccess && <div>
            <h2 className='form-title'>{t('Successful registration')}</h2>
            <p>{t('To continue working in the system, you need to confirm your account by clicking on the link in the letter that we sent you by mail')}</p>
            <div className='login-link'><a href="/login">{t('Log in')}</a></div>
          </div>}
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default Form.create()(WrappedRegistrationForm);