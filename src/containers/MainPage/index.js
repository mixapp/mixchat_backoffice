import React from 'react';
import { connect } from 'react-redux';
import MainPageView from '../../components/MainPage'
import { loaderOff } from '../../actions/settings';

const MainPage = (props) => {
  return <MainPageView {...props} />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loaderOff: (data) => { dispatch(loaderOff()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);