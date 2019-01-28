import React from 'react';
import { Table, Button } from 'antd';
import AddManagerForm from './forms/managers/addManagerForm';

export default class ManagersList extends React.Component {
  state = {
    size: 'small',
    managers: [],
    visible: false,
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = (e) => {
    const form = this.formRef.props.form;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.props.addManager(values);
        form.resetFields();
        this.setState({ visible: false });
      }
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    let columns = [
      { title: '№', dataIndex: 'number', key: 'number' },
      { title: 'email', dataIndex: 'email', key: 'email' },
      { title: 'Nickname', key: 'nickname', dataIndex: 'nickname' },
      {
        title: 'Action', dataIndex: '', key: '', render: (obj) => {
          async function removeManager() {
            try {
              await this.props.removeManager(obj);
            } catch (err) {
              throw err;
            }
          }
          return <Button onClick={removeManager.bind(this)} type="danger">Delete</Button>
        }, fixed: 'right', width: 100
      }
    ];
    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: "20px" }}>
          Add manager
        </Button>
        <Table {...this.state} columns={columns} dataSource={this.props.managers} />
        <AddManagerForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          addManager={this.props.addManager}
          error_message={this.props.error_message}
        />
      </div>
    );
  }
}