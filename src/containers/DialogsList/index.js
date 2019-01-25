import React from 'react';
import { connect } from 'react-redux';
import { fetchDialogs, fetchDialog } from '../../actions/settings';
import DialogsListMenu from '../../components/DialogsList';

const DialogsList = (props) => {
    return <DialogsListMenu {...props} />
};

const mapStateToProps = (state, ownProps) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchDialogs: () => { dispatch(fetchDialogs()) },
        fetchDialog: (data) => { dispatch(fetchDialog(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogsList);