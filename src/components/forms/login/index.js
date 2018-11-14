import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './style.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //TODO
        window.location.href = "/company/admin/";
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let windowHeight = window.innerHeight;

    return (
      <Row style={{ height: windowHeight }} type="flex" justify="space-around" align="middle">
        <Col span={6}></Col>
        <Col span={10}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
              Or <Link to="/registration/">register now!</Link>
            </FormItem>
          </Form>
        </Col>
        <Col span={6}></Col>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends Component {
  render() {
    return (
      <WrappedNormalLoginForm />
    );
  }
}

export default Login;
