import { put, fork, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
   SET_AUTHORIZE, FETCH_SETTINGS_REQUEST, FETCH_SETTINGS_SUCCESS, FETCH_SETTINGS_ERROR
} from '../constants';
//import * as Api from '../api';

function* fetchSettingsSaga() {
    yield takeLatest(FETCH_SETTINGS_REQUEST, function* (action) {
        try {
            yield alert();
        } catch (e) {
            alert(e);
        }
    });
}

function* loginSaga() {
    yield takeLatest(SET_AUTHORIZE, function* (action) {
        try {
            localStorage.setItem('user', JSON.stringify(action.data))
            const uri = localStorage.getItem('redirect');
            localStorage.removeItem('redirect');
            yield put(push(uri || '/'));
        } catch (e) {
            alert(e);
        }
    });
}

export default function* ordersSaga() {
    yield [
        fork(loginSaga),
        fork(fetchSettingsSaga)
    ];
}