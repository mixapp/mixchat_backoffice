import React from 'react';
import { Modal, Form, Button } from 'antd';
import AddManagerForm from '../forms/managers/addManagerForm';

class AddManagerModal extends React.Component {
  state = { visible: false }

  state = {
    loading: false,
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Добавить нового менеджера
        </Button>
        <Modal
          visible={visible}
          title="Add new manager"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Отмена</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Добавить
            </Button>,
          ]}
        >
          <AddManagerForm addManager={this.props.addManager} />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AddManagerModal);