import React from 'react';
import { Table, Button, Modal } from 'antd';
import AddManagerForm from './forms/managers/addManagerForm';
const confirm = Modal.confirm;

export default class ManagersList extends React.Component {
  state = {
    size: 'small',
    managers: [],
    visible: false,
  }

  showConfirm(obj) {
    let { removeManager, t } = this.props;
    confirm({
      title: t('Do you want to delete manager?'),
      okText: t('Yes'),
      cancelText: t('Cancel'),
      onOk() {
        removeManager(obj);
      },
      onCancel() {
      },
    });
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
    let { t } = this.props;
    let columns = [
      { title: '№', dataIndex: 'number', key: 'number' },
      { title: t('Email'), dataIndex: 'email', key: 'email' },
      { title: t('Nickname'), key: 'nickname', dataIndex: 'nickname' },
      {
        title: t('Action'), dataIndex: '', key: '', render: (obj) => {
          async function removeManager() {
            try {
              this.showConfirm(obj);
            } catch (err) {
              throw err;
            }
          }
          return <Button onClick={removeManager.bind(this)} type="danger">{t('Delete')}</Button>
        }, fixed: 'right', width: 100
      }
    ];
    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: "20px" }}>
          {t('buttons.addManager')}
        </Button>
        <Table {...this.state} columns={columns} dataSource={this.props.app.managers} />
        <AddManagerForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          {... this.props}
        />
      </div>
    );
  }
}