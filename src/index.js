import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import { Provider } from 'react-redux';
import { store } from './store';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import './index.css'
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();