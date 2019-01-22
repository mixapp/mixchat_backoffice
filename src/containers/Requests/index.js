import React from 'react';
import { connect } from 'react-redux';
import RequestsView from '../../components/RequestsView';
import { fetchRequests, deleteRequest } from '../../actions/settings';

const Settings = (props) => {
    return <RequestsView {...props} />;
};

const mapStateToProps = (state, ownProps) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchRequests: (data) => { dispatch(fetchRequests(data)) },
        deleteRequest: (data) => { dispatch(deleteRequest(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);