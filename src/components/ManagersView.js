import React from 'react';
import Managers from './Managers';

export default class ManagersListView extends React.Component {
  componentDidMount() {
    this.props.fetchManagers();
  }
  render() {
    return <Managers
      error_message={this.props.app.error_message}
      addManager={this.props.addManager}
      removeManager={this.props.removeManager}
      managers={this.props.app.managers} />;
  }
}