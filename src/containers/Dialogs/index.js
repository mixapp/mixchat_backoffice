import React from 'react';
import { connect } from 'react-redux';
import DialogsView from '../../components/DialogsView';
import { fetchDialogs, fetchDialog, sendMessage, loaderOff } from '../../actions/settings';

const Dialogs = (props) => {
    return <DialogsView {...props} />;
};

const mapStateToProps = (state, ownProps) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchDialogs: () => { dispatch(fetchDialogs()) },
        fetchDialog: (data) => { dispatch(fetchDialog(data)) },
        sendMessage: (data) => { dispatch(sendMessage(data)) },
        loaderOff: () => { dispatch(loaderOff()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);