import React from 'react';
import { List } from 'antd';

export default class DialogsList extends React.Component {

    state = {
        size: 'small'
    }

    render() {
        let data = [];

        /* TEMP */
        if (this.props.dialogs) {
            this.props.dialogs.groups.forEach((value, key) => {
                data.push(value.name + '(' + value.usersCount + ')');
            });
        }
        return (
            <List
                size="small"
                header={<div>List of groups</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        );
    }
}