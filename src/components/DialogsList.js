import React from 'react';
import { Menu, Input, Tag, Avatar } from 'antd';
import * as _ from 'underscore';

const Search = Input.Search;

class DialogsListMenu extends React.Component {

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
    let { t } = this.props;
    let dialogs = _.sortBy(this.props.app.dialogs, 'nmsgs').reverse();
    let unreaded = [];
    let readed = [];
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

      if (item.name.search(this.state.searchDialogText) !== -1) {
        let dialog = <Menu.Item key={item._id} onClick={fetchDialog.bind(this)}>
          <div className='dialogs-item-container'>
            <Avatar size='small'>U</Avatar>
            <span>{item.name.substring(0, item.name.length - 1)}</span>
            {item.nmsgs > 0 && <Tag color="#f50">{item.nmsgs}</Tag>}
          </div>
        </Menu.Item>;
        if (item.nmsgs > 0) {
          unreaded.push(dialog);
        } else {
          readed.push(dialog);
        }
      }
    })
    return (
      <div className='dialogs-list-container' style={{ display: this.props.dialogsListShow }}>
        <div>
          <Search
            placeholder={t("dialogsList.dialogName")}
            onSearch={value => this.searchDialog(value)}
          />
        </div>
        <div>
          <Menu theme="dark" mode="inline" className='dialogs-item-sider'>
            {unreaded.length > 0 ?
              <Menu.Item>
                Unreaded
            </Menu.Item> : null}
            {unreaded}
            {readed.length > 0 ?
              <Menu.Item>
                Readed
            </Menu.Item> : null}
            {readed}
          </Menu>
        </div>
      </div>
    )
  }
}

export default DialogsListMenu;