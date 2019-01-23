import React from 'react';
import { Form, Input, Button, message } from 'antd';

const FormItem = Form.Item;

class AddManagerForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addManager(values);
      }
    });
  }

/*   componentDidMount() {
    this.props.form.setFieldsValue({
      email: 'm2dev@mixapp.io',
      nickname: 'manager2dev',
      password: 'qwerty123456'
    })
  }
 */
  componentDidUpdate() {
    if (this.props.error_message && this.props.error_message.error) {
      message.error(this.props.error_message.error_message);
    }
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 14 },
      },
    };


    return (
      <Form onSubmit={this.handleSubmit} layout='vertical'>

        <FormItem {...formItemLayout} label='E-mail'>
          {getFieldDecorator('email', {
            rules: [
              { required: true }
            ],
          })(<Input placeholder='email@gmail.com' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Nickname'>
          {getFieldDecorator('nickname', {
            rules: [
              { required: true }
            ],
          })(<Input placeholder='BestNickname' />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Password'>
          {getFieldDecorator('password', {
            rules: [
              { required: true }
            ],
          })(<Input placeholder='*********' type='password' />)}
        </FormItem>

        <FormItem {...formItemLayout}>
          <Button type='primary' htmlType='submit'>Add</Button>
        </FormItem>

      </Form>
    );
  }
}

export default Form.create()(AddManagerForm);