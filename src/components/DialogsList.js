import React from 'react';
import { Menu, Input, Avatar } from 'antd';
import * as _ from 'underscore';
import MessageIcon from '../components/svg/message_icon';
import VKIcon from './svg/vk_icon';
import TelegramIcon from '../components/svg/telegram_icon';
import ViberIcon from '../components/svg/viber_icon';
import FBMIcon from '../components/svg/fbm_icon';
import SMSIcon from '../components/svg/sms_icon';

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

  componentDidMount() {
    this.props.fetchWidget();
  }

  getMessengerIcon(messenger) {
    switch (messenger) {
      case 'viber':
        return <ViberIcon />;
      case 'fbm':
        return <FBMIcon />;
      case 'vk':
        return <VKIcon />;
      case 'telegram':
        return <TelegramIcon />;
      case 'sms':
        return <SMSIcon />;
      case 'web':
      default:
        return <MessageIcon />;
    }
  }

  render() {
    let { t } = this.props;
    let { xuser, role } = this.props.app;
    let dialogs = _.sortBy(this.props.app.dialogs, '_updatedAt').reverse();
    let unreaded = [];
    let readed = [];
    if (!dialogs) dialogs = [];
    dialogs.forEach(item => {
      let { manager, notify, clientNumber, messenger } = item.customFields;
      if (!manager || manager === xuser.userId || role === 'admin') {
        let result = item.name.split('_');
        let companyid = result[result.length - 1];
        let messengerIcon = this.getMessengerIcon(messenger);
        item.name = item.name.replace(companyid, '');
        async function fetchDialog() {
          try {
            await this.fetchDialog(item);
          } catch (err) {
            throw err;
          }
        }

        if (item.name.search(this.state.searchDialogText) !== -1) {
          let newDialog = notify ? ' new-dialog' : '';
          let dialog = <Menu.Item key={item._id} onClick={fetchDialog.bind(this)} className='dialogs-item'>
            <div className={'dialogs-item-container ' + newDialog}>
              <Avatar size='small'>{item.name.substring(0, 1).toUpperCase()}</Avatar>
              <div className='dialogs-item-caption'>
                <div>{t('Client') + ' ' + clientNumber}</div>
                {item.lastMessage ?
                  <div>{messengerIcon}<div className='dialogs-item-caption-text'>{item.lastMessage.msg}</div></div> :
                  <div><MessageIcon /><div className='dialogs-item-caption-text'></div></div>
                }
              </div>
            </div>
          </Menu.Item>;
          if (notify) {
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