import React from 'react';
import ManagersList from './ManagersList';

export default class ManagersListView extends React.Component {
  componentDidMount() {
    this.props.fetchManagers();
  }
  render() {
    return <ManagersList addManager={this.props.addManager} managers={this.props.app.managers} />;
  }
}