import React from 'react';
import Parser from 'html-react-parser';
import { Avatar, Comment, Tooltip } from 'antd';
import * as Api from '../../api';

export default class CommentList extends React.Component {

  componentWillMount() {
    this.client = JSON.parse(localStorage.getItem('XUSER'));
  }

  render() {
    let { item } = this.props;
    let time = typeof item.ts === 'string' ? new Date(item.ts) : new Date(item.ts.$date);
    let { shortName: name } = item.u;
    return (
      <Comment
        key={item._id}
        author={<b>{item.u.shortName}</b>}
        avatar={(
          <Avatar style={{ backgroundColor: item.u._id === this.client ? '#77a2ff' : '#ff87a3' }}>{name ? name.charAt(0).toUpperCase() : null}</Avatar>
        )}
        content={(
          <div>
            {Parser(item.msg.replace(/\n/g, '<br/>'))}
            <div>{item.fileLink ? item.fileLink : ''}</div>
          </div>
        )}
        datetime={(
          <Tooltip title="">
            <span>{Api.formatDate(time)}</span>
          </Tooltip>
        )}
      />
    );
  }
}