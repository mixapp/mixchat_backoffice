import React from 'react';
import Parser from 'html-react-parser';
import { List, Avatar, Spin, Comment, Tooltip } from 'antd';
import * as Api from '../../api';

export default class CommentClass extends React.Component {
  render() {
    return <List
      size="small"
      dataSource={this.props.messages}
      renderItem={item => {
        let time = typeof item.ts === 'string' ? new Date(item.ts) : new Date(item.ts.$date);
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
          <Comment
            key={item._id}
            author={item.u.shortName}
            avatar={(
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt={item.u.shortName}
              />
            )}
            content={(
              <div>
                {Parser(item.msg.replace(/\n/g, '<br/>'))}
                <div>{item.fileLink ? item.fileLink : ''}</div>
              </div>
            )}
            datetime={(
              <Tooltip title="">
                <span>{Api.formatDate(time, 'ru')}</span>
              </Tooltip>
            )}
          />
        );
      }
      }
    >
      {this.props.state.loading && this.props.state.hasMore && (
        <div className="demo-loading-container">
          <Spin />
        </div>
      )}
    </List>;
  }
}