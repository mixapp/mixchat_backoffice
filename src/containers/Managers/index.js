import React from 'react';
import { connect } from 'react-redux';
import ManagersView from '../../components/ManagersView';
import { fetchManagers, addManager, removeManager } from '../../actions/settings';

const Managers = (props) => {
    return <ManagersView {...props} />;
};

const mapStateToProps = (state, ownProps) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchManagers: () => { dispatch(fetchManagers()) },
        addManager: (data) => { dispatch(addManager(data)) },
        removeManager: (data) => { dispatch(removeManager(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Managers);