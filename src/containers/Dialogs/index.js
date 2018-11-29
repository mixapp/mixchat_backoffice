import React from 'react';
import { connect } from 'react-redux';
import DialogsListView from '../../components/Dialogs';
import { fetchDialogs } from '../../actions/settings';

const Dialogs = (props) => {
    return <DialogsListView {...props} />;
};

const mapStateToProps = (state, ownProps) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchDialogs: () => { dispatch(fetchDialogs()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);