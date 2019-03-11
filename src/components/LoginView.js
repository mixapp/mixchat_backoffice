import React from 'react';
import Login from './Login';

export default class LoginView extends React.Component {
  render() {
    return <Login
      {... this.props}
    />
  }
}