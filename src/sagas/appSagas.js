import { put, fork, takeLatest, call, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  SET_AUTHORIZE,
  FETCH_SETTINGS_REQUEST, FETCH_SETTINGS_SUCCESS, //FETCH_SETTINGS_ERROR,
  SAVE_SETTINGS_REQUEST, SAVE_SETTINGS_SUCCESS, //SAVE_SETTINGS_ERROR,
  FETCH_MANAGERS_REQUEST, FETCH_MANAGERS_SUCCESS, //FETCH_MANAGERS_ERROR,
  ADD_MANAGER_REQUEST, ADD_MANAGER_SUCCESS, //ADD_MANAGER_ERROR,
  REMOVE_MANAGER_REQUEST, REMOVE_MANAGER_SUCCESS,  //REMOVE_MANAGER_ERROR,
  FETCH_DIALOGS_REQUEST, FETCH_DIALOGS_SUCCESS, //FETCH_DIALOGS_ERROR
  LOADER_ON, LOADER_OFF,
  FETCH_DIALOG_REQUEST, FETCH_DIALOG_SUCCESS, //FETCH_DIALOG_ERROR
  SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, //SEND_MESSAGE_ERROR
} from '../constants';
import * as Api from '../api';

function* sendMessageSaga() {
  yield takeLatest(SEND_MESSAGE_REQUEST, function* (action) {
    try {
      let result = yield Api.sendMessageSaga(action.data);
      if (result.status === 200) {
        yield put({ type: SEND_MESSAGE_SUCCESS });
      }
    } catch (err) {
      throw err;
    }
  })
}

var sockets = [];

function* fetchDialogSaga() {
  yield takeLatest(FETCH_DIALOG_REQUEST, function* (action) {
    try {
      yield put({ type: LOADER_ON });
      let { roomId, count } = action.data;
      let messages = yield Api.fetchDialog({ roomId, count });
      yield put({ type: FETCH_DIALOG_SUCCESS, messages });
      if (!sockets[roomId]) {
        sockets[roomId] = yield call(Api.websocketInitChannel, roomId);
      }
      yield put({ type: LOADER_OFF });
      while (true) {
        const action = yield take(sockets[roomId]);
        yield put(action);
      }
    } catch (err) {
      throw err;
    }
  })
}

function* fetchDialogs() {
  yield takeLatest(FETCH_DIALOGS_REQUEST, function* (action) {
    try {
      yield put({ type: LOADER_ON });
      let dialogs = yield Api.fetchDialogs();
      yield put({ type: FETCH_DIALOGS_SUCCESS, dialogs });
      yield put({ type: LOADER_OFF });
    } catch (err) {
      throw (err);
    }
  })
}

function* removeManager() {
  yield takeLatest(REMOVE_MANAGER_REQUEST, function* (action) {
    try {
      let result = yield Api.removeManager(action.data);
      if (!result.data.error) {
        yield put({ type: REMOVE_MANAGER_SUCCESS, result });
        let managers = yield put({ type: FETCH_MANAGERS_REQUEST });
        yield put({ type: FETCH_MANAGERS_SUCCESS, managers });
      }
    } catch (err) {
      throw err;
    }
  })
}

function* addManager() {
  yield takeLatest(ADD_MANAGER_REQUEST, function* (action) {
    try {
      let result = yield Api.addManager(action.data);
      if (!result.data.error) {
        yield put({ type: ADD_MANAGER_SUCCESS, result });
        let managers = yield put({ type: FETCH_MANAGERS_REQUEST });
        yield put({ type: FETCH_MANAGERS_SUCCESS, managers });
      }
    } catch (err) {
      throw err;
    }
  })
}

function* fetchManagers() {
  yield takeLatest(FETCH_MANAGERS_REQUEST, function* (action) {
    try {
      yield put({ type: LOADER_ON });
      let managers = yield Api.fetchManagers();
      managers.forEach((value, key) => {
        value.key = String(key + 1);
        value.number = key + 1;
      });
      yield put({ type: FETCH_MANAGERS_SUCCESS, managers });
      yield put({ type: LOADER_OFF });
    } catch (err) {
      throw err;
    }
  })
}

function* saveSettingsSaga() {
  yield takeLatest(SAVE_SETTINGS_REQUEST, function* (action) {
    try {
      yield put({ type: LOADER_ON });
      yield Api.saveSettings(action.data);
      yield put({ type: SAVE_SETTINGS_SUCCESS });
      yield put({ type: LOADER_OFF });
    } catch (err) {
      throw err;
    }
  })
}

function* fetchSettingsSaga() {
  yield takeLatest(FETCH_SETTINGS_REQUEST, function* (action) {
    try {
      yield put({ type: LOADER_ON });
      let widgetSettings = yield Api.fetchSettings();
      yield put({ type: FETCH_SETTINGS_SUCCESS, widgetSettings });
      yield put({ type: LOADER_OFF });
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
    fork(addManager),
    fork(removeManager),
    fork(fetchDialogs),
    fork(fetchDialogSaga),
    fork(sendMessageSaga),
  ];
}