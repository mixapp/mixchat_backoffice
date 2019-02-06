import React from 'react';
import { connect } from 'react-redux';
import ManagersView from '../../components/ManagersView';
import { fetchManagers, addManager, removeManager } from '../../actions/settings';
import { withNamespaces } from 'react-i18next';

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

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Managers));