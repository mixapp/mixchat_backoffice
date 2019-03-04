import React from 'react';
import { history } from '../store';

export default class MainPageView extends React.Component {
  componentDidMount() {
    history.push("/dialogs");
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <div>Login</div>
      </div>
    );
  }
}