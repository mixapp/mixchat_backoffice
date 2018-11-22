import React from 'react';
import { Table } from 'antd';

const columns = [{
    title: '_id',
    dataIndex: '_id',
    key: '_id   '
}, {
    title: 'Nickname',
    key: 'nickname',
    dataIndex: 'nickname',
}];

export default class ManagersList extends React.Component {

    render() {
        let data = [];
        if (this && this.props && this.props.managers) {
            this.props.managers.forEach((value, key) => {
                value.key = key;
            });
            data = this.props.managers;
        }
        return <Table columns={columns} dataSource={data} />;
    }
}