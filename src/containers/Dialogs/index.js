import React from 'react';
import { connect } from 'react-redux';
import DialogsView from '../../components/DialogsView';
import {
    fetchDialogs,
    fetchDialog,
    sendMessage,
    loaderOff,
    fetchHistory
} from '../../actions/settings';
import { withNamespaces } from 'react-i18next';

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
        loaderOff: () => { dispatch(loaderOff()) },
        fetchHistory: (data) => { dispatch(fetchHistory(data)) }
    }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Dialogs));