import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import thunk from 'redux-thunk';
import * as Api from './api';

import reducers from './reducers';
import rootSaga from './sagas';

const history = createHistory({
  basename: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : `/${Api.getAppPath()}`
});
const sagaMiddleware = createSagaMiddleware();

const user = localStorage.getItem('user');
const initialState = {
  app: {
    user: user ? JSON.parse(user) : null
  }
};

const store = createStore(
  combineReducers({
    ...reducers
  }),
  initialState,
  applyMiddleware(thunk, sagaMiddleware, routerMiddleware(history))
);

sagaMiddleware.run(rootSaga);

export { store, history };