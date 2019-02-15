import React from 'react';
import { connect } from 'react-redux';
import { fetchDialog } from '../../actions/settings';
import DialogsListMenu from '../../components/DialogsList';
import { withNamespaces } from 'react-i18next';

const DialogsList = (props) => {
  if (props.app.role)
    return <DialogsListMenu {...props} />;
  else
    return <div></div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDialog: (data) => { dispatch(fetchDialog(data)) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(DialogsList));