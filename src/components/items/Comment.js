import React from 'react';
import { List, Avatar, Spin } from 'antd';

export default class Comment extends React.Component {
  render() {
    return <List
      dataSource={this.props.state.data}
      renderItem={item => {
        if (item.file) {
          switch (item.file.type) {
            case 'image/png':
              item.fileLink = <img height='200px' src={'https://chat.mixapp.io/file-upload/' + item.file._id + '/' + item.file.name} />;
              break;
            case 'text/plain':
              item.fileLink = <a href={'https://chat.mixapp.io/file-upload/' + item.file._id + '/' + item.file.name}>{item.file.name}</a>;
              break;
          }
        }
        return <List.Item key={item._id}>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<a href="https://ant.design">{item.u.name}</a>}
          />
          <div>{item.msg}</div>
          {item.fileLink ? item.fileLink : ''}
        </List.Item>
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