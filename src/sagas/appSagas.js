import { put, fork, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
    SET_AUTHORIZE,
    FETCH_SETTINGS_REQUEST, FETCH_SETTINGS_SUCCESS, //FETCH_SETTINGS_ERROR,
    SAVE_SETTINGS_REQUEST, SAVE_SETTINGS_SUCCESS, //SAVE_SETTINGS_ERROR,
    FETCH_MANAGERS_REQUEST, FETCH_MANAGERS_SUCCESS, //FETCH_MANAGERS_ERROR,
    ADD_MANAGER_REQUEST, ADD_MANAGER_SUCCESS, //ADD_MANAGER_ERROR
} from '../constants';
import * as Api from '../api';

function* addManager() {
    yield takeLatest(ADD_MANAGER_REQUEST, function* (action) {
        try {
            let result = yield Api.addManager(action.data);
            if (!result.data.error) {
                yield put({ type: ADD_MANAGER_SUCCESS, result });
                let managers = yield put({ type: FETCH_MANAGERS_REQUEST });
                yield put({ FETCH_MANAGERS_SUCCESS, managers });
            }
        } catch (err) {
            throw err;
        }
    })
}

function* fetchManagers() {
    yield takeLatest(FETCH_MANAGERS_REQUEST, function* (action) {
        try {
            let managers = yield Api.fetchManagers();
            yield put({ type: FETCH_MANAGERS_SUCCESS, managers });
        } catch (err) {
            throw err;
        }
    })
}

function* saveSettingsSaga() {
    yield takeLatest(SAVE_SETTINGS_REQUEST, function* (action) {
        try {
            yield Api.saveSettings(action.data);
            yield put({ type: SAVE_SETTINGS_SUCCESS });
        } catch (err) {
            throw err;
        }
    })
}

function* fetchSettingsSaga() {
    yield takeLatest(FETCH_SETTINGS_REQUEST, function* (action) {
        try {
            let widgetSettings = yield Api.fetchSettings();
            yield put({ type: FETCH_SETTINGS_SUCCESS, widgetSettings });
        } catch (err) {
            throw err;
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
        } catch (err) {
            throw err;
        }
    });
}

export default function* ordersSaga() {
    yield [
        fork(loginSaga),
        fork(fetchSettingsSaga),
        fork(saveSettingsSaga),
        fork(fetchManagers),
        fork(addManager)
    ];
}