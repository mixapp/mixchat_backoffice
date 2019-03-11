import React from 'react';
import {
  Form,
  Input,
  Icon,
  Row,
  Col,
  Checkbox,
  Button
} from 'antd';

class ForgotForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.recovery(values);
      }
    });
  }

  render() {
    let { t } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100vh' }}>
        <Col span={10} style={{ backgroundColor: '#f8f8f8', padding: '25px 40px 10px 40px', borderRadius: '15px' }}>
          <h2>{t('Forgot form')}</h2>
          <div>
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
          </div>
        </Col>
      </Row>
    );
  }
}

const WrappedForgotForm = Form.create({ name: 'forgot' })(ForgotForm);

export default Form.create()(WrappedForgotForm);