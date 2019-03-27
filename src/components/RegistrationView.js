import React from 'react';
import Registration from './Registration';

export default class RegistrationView extends React.Component {
  render() {
    return <Registration
      {... this.props}
    />
  }
}