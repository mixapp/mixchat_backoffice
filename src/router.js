import React from 'react';
import { history } from './store';
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";
import PrivateRoute from './containers/PrivateRouter';

import MainPage from './containers/MainPage';
import Wrapper from './components/Wrapper';

import Authorize from './containers/Authorize';
import Settings from './containers/Settings';
import Dialogs from './containers/Dialogs';
import Managers from './containers/Managers';
import { connect } from 'react-redux';
import { fetchSettings, saveSettings } from './actions/settings';
import { Spin } from 'antd';


const Router = (props) =>
    <ConnectedRouter history={history}>
        <div>
            <Route path="/authorize" exact component={Authorize} />
            <Wrapper>
                <Spin spinning={props.app.loader} delay={0}>
                    <PrivateRoute path='/' exact component={MainPage} />
                    <PrivateRoute path='/settings' exact component={Settings} />
                    <PrivateRoute path='/dialogs' exact component={Dialogs} />
                    <PrivateRoute path='/managers' exact component={Managers} />
                </Spin>
            </Wrapper>
        </div>
    </ConnectedRouter>;

const mapStateToProps = (state, ownProps) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchSettings: () => { dispatch(fetchSettings()) },
        saveSettings: (data) => { dispatch(saveSettings(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);