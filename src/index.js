import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import './index.css'
console.log('START');
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
