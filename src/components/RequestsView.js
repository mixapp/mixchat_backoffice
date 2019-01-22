import React from 'react';
import Requests from './Requests';

export default class SettinggsView extends React.Component {
  componentDidMount() {
    this.props.fetchRequests();
  }
  render() {
    console.log();
    return <Requests requests={this.props.app.requests} deleteRequest={this.props.deleteRequest} />
  }
}