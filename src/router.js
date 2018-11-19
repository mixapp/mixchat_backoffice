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

const Router = () => 
    <ConnectedRouter history={history}>
        <div>
            <Route path="/authorize" exact component={Authorize} />
            <Wrapper>
                <PrivateRoute path='/' exact component={MainPage} />
                <PrivateRoute path='/settings' exact component={Settings} />
                <PrivateRoute path='/dialogs' exact component={Dialogs} />
                <PrivateRoute path='/managers' exact component={Managers} />
            </Wrapper>
        </div>  
    </ConnectedRouter>;
  
export default Router;