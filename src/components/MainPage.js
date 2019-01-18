import React from 'react';

export default class MainPageView extends React.Component {
  componentDidMount() {
    this.props.loaderOff();
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