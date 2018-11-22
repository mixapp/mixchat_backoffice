import React from 'react';
import { connect } from 'react-redux';
import ManagersListView from '../../components/Managers';
import { fetchManagers, addManager } from '../../actions/settings';

const Managers = (props) => {
    return <ManagersListView {...props} />;
};

const mapStateToProps = (state, ownProps) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchManagers: () => { dispatch(fetchManagers()) },
        addManager: (data) => { dispatch(addManager(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Managers);