import React from 'react';
import { Table, Button } from 'antd';
import AddManagerForm from './forms/managers/addManagerForm';

export default class ManagersList extends React.Component {
  state = {
    size: 'small',
    managers: []
  }

  render() {
    let columns = [
      { title: '№', dataIndex: 'number', key: 'number' },
      { title: '_id', dataIndex: '_id', key: '_id' },
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
          return <Button onClick={removeManager.bind(this)} type="primary" shape="circle" icon="delete" size='large' />
        }
      }
    ];
    return (
      <div>
        <Table {...this.state} columns={columns} dataSource={this.props.managers} />
        <AddManagerForm
          addManager={this.props.addManager}
          error_message={this.props.error_message}
        />
      </div>
    );
  }
}