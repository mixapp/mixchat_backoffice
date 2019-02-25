import React from 'react';
import Comment from './Comment';
import { List } from 'antd';

export default class CommentList extends React.Component {

  componentDidMount() {
    this.client = JSON.parse(localStorage.getItem('XUSER')).data.userId;
  }

  render() {
    return <List
      size="small"
      dataSource={this.props.messages}
      renderItem={item => {
        if (item.u.name)
          item.u.name.length > 15 ? item.u.shortName = item.u.name.substring(0, 15) + '...' : item.u.shortName = item.u.name;
        if (item.file) {
          switch (item.file.type) {
            case 'image/png':
              item.fileLink = <img height='150px' src={'https://chat.mixapp.io/file-upload/' + item.file._id + '/' + item.file.name} alt={item.file.name} />;
              break;
            case 'text/plain':
              item.fileLink = <a href={'https://chat.mixapp.io/file-upload/' + item.file._id + '/' + item.file.name}>{item.file.name}</a>;
              break;
            default:
              item.fileLink = null;
              break;
          }
        }
        return (
          <Comment item={item} />
        );
      }
      }
    >
    </List>;
  }
}