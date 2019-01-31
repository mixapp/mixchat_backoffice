import React from 'react';
import { connect } from 'react-redux';
import { fetchDialog } from '../../actions/settings';
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
        fetchDialog: (data) => { dispatch(fetchDialog(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogsList);