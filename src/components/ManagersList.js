import React from 'react';
import { Table } from 'antd';
import AddManagerForm from './forms/managers/addManagerForm';

const columns = [
    { title: '№', dataIndex: 'number', key: 'number' },
    { title: '_id', dataIndex: '_id', key: '_id' },
    { title: 'Nickname', key: 'nickname', dataIndex: 'nickname' },
    { title: 'Action', dataIndex: '', key: 'x', render: () => <div>Delete | Edit</div> }
];

export default class ManagersList extends React.Component {

    state = {
        size: 'small'
    }

    render() {
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
                <Table {...this.state} columns={columns} dataSource={data} />
                <AddManagerForm addManager={this.props.addManager} />
            </div>
        );
    }
}