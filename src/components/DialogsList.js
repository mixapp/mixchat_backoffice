import React from 'react';
import { Layout, Menu, Input, Tag, Avatar } from 'antd';
import * as _ from 'underscore';

const { Sider } = Layout;
const Search = Input.Search;

export default class DialogsListMenu extends React.Component {

  state = {
    searchDialogText: ''
  }

  async searchDialog(value) {
    await this.setState({
      searchDialogText: value
    });
  }

  fetchDialog = async (currentRoom) => {
    await this.props.fetchDialog({
      count: 15,
      room: currentRoom
    });
  }

  render() {
    let dialogs = _.sortBy(this.props.app.dialogs, 'nmsgs').reverse();
    let menuItems = [];
    if (!dialogs) dialogs = [];
    dialogs.forEach(item => {
      let result = item.name.split('_');
      let companyid = result[result.length - 1];
      item.name = item.name.replace(companyid, '');

      async function fetchDialog() {
        try {
          await this.fetchDialog(item);
        } catch (err) {
          throw err;
        }
      }

      if (item.name.search(this.state.searchDialogText) !== -1)
        menuItems.push(
          <Menu.Item key={item._id} onClick={fetchDialog.bind(this)}>
            <div className='dialogs-item-container'>
              <Avatar size='small'>U</Avatar>
              <span>{item.name}</span>
              {item.nmsgs > 0 && <Tag color="#f50">{item.nmsgs}</Tag>}
            </div>
          </Menu.Item>
        );
    })
    return (
      <Sider style={{ display: this.props.dialogsListShow }} className='dialogs-item-sider' >
        <div className="logo_container">
          <div className="logo">
            <Search
              placeholder="Dialog name"
              onSearch={value => this.searchDialog(value)}
            />
          </div>
        </div>
        <Menu theme="dark" mode="inline" className='dialogs-item-sider'>
          {menuItems}
        </Menu>
      </Sider>
    )
  }
}