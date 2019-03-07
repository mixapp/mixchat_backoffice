import React from 'react';
import { Menu, Input, Tag, Avatar } from 'antd';
import * as _ from 'underscore';

const Search = Input.Search;

class DialogsListMenu extends React.Component {

  state = {
    searchDialogText: ''
  }

  async searchDialog(value) {
    this.setState({
      searchDialogText: value
    });
  }

  fetchDialog = async (currentRoom) => {
    await this.props.fetchDialog({
      count: 15,
      room: currentRoom,
      fetchNew: true
    });
  }

  render() {
    let { t } = this.props;
    let XUSER = JSON.parse(localStorage.getItem('XUSER'));
    let xuserId = null;
    if (XUSER)
      xuserId = XUSER.data.userId;
    let dialogs = _.sortBy(this.props.app.dialogs, '_updatedAt').reverse();
    let unreaded = [];
    let readed = [];
    if (!dialogs) dialogs = [];
    dialogs.forEach(item => {
      if (!item.customFields.manager || item.customFields.manager === xuserId) {
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
          let newDialog = item.customFields.notify ? ' new-dialog' : '';
          let dialog = <Menu.Item key={item._id} onClick={fetchDialog.bind(this)}>
            <div className={'dialogs-item-container ' + newDialog}>
              <Avatar size='small'>{item.name.substring(0, 1).toUpperCase()}</Avatar>
              <span>{t('Client') + ' ' + item.customFields.clientNumber}</span>
              {item.nmsgs > 0 && item.msgs > 1 && <Tag color="#f50">{item.nmsgs}</Tag>}
            </div>
          </Menu.Item>;
          if (item.nmsgs > 0 || item.customFields.notify) {
            unreaded.push(dialog);
          } else {
            readed.push(dialog);
          }
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
                {t('Unread')}
              </Menu.Item> : null}
            {unreaded}
            {readed.length > 0 ?
              <Menu.Item>
                {t('Dialogs')}
              </Menu.Item> : null}
            {readed}
          </Menu>
        </div>
      </div>
    )
  }
}

export default DialogsListMenu;