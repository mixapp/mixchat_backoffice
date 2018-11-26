import React from 'react';
import { Table, Button } from 'antd';
import AddManagerForm from './forms/managers/addManagerForm';

export default class ManagersList extends React.Component {

    state = {
        size: 'small',
        currentManagerId: ''
    }

    render() {
        let columns = [
            { title: '№', dataIndex: 'number', key: 'number' },
            { title: '_id', dataIndex: '_id', key: '_id' },
            { title: 'Nickname', key: 'nickname', dataIndex: 'nickname' },
            { title: 'Action', dataIndex: '', key: '', render: (obj) => <Button type="primary" shape="circle" icon="delete" size='large' /> }
        ];

        let data = [];
        if (this.props.managers) {
            this.props.managers.forEach((value, key) => {
                value.key = String(key + 1);
                value.number = key + 1;
            });
            data = this.props.managers;
        }
        return (
            <div>
                <Table {...this.state} removeManager={this.props.removeManager} columns={columns} dataSource={data} />
                <AddManagerForm addManager={this.props.addManager} />
            </div>
        );
    }
}