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
  LOADER_TURN_OFF,
  FETCH_ROLE_REQUEST, FETCH_ROLE_SUCCESS, //FETCH_ROLE_ERROR
  FETCH_REQUESTS_REQUEST, FETCH_REQUESTS_SUCCESS, //FETCH_REQUESTS_ERROR
  DELETE_REQUEST_REQUEST, DELETE_REQUEST_SUCCESS, //DELETE_REQUEST_ERROR
} from '../constants';
import * as Api from '../api';
import { readDialog, updateDialogs, getDialogs, setDialogs } from '../lsApi';
import * as _ from 'underscore';

function* sendMessageSaga() {
  yield takeLatest(SEND_MESSAGE_REQUEST, function* (action) {
    try {
      let result = yield Api.sendMessageSaga(action.data);
      let lsDialogs = getDialogs();
      let lsDialog = _.findIndex(lsDialogs, { _id: action.data.roomId });
      lsDialogs[lsDialog].nmsgs = 0;
      lsDialogs[lsDialog].msgs = lsDialogs[lsDialog].msgs + 1;
      updateDialogs(lsDialogs);
      if (result.status === 200) {
        yield put({ type: SEND_MESSAGE_SUCCESS });
      }
    } catch (err) {
      throw err;
    }
  })
}

function* fetchDialogSaga() {
  yield takeLatest(FETCH_DIALOG_REQUEST, function* (action) {
    try {
      yield put({ type: LOADER_ON });
      let { count, room } = action.data;
      updateDialogs(readDialog(room));
      let dialogs = yield Api.fetchDialogs();
      setDialogs(dialogs);
      yield put({ type: FETCH_DIALOGS_SUCCESS, dialogs });
      let messages = yield Api.fetchDialog({ roomId: room._id, count });
      yield put({ type: FETCH_DIALOG_SUCCESS, data: { messages: messages, roomId: room._id } });
      yield put({ type: LOADER_OFF });
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
      setDialogs(dialogs);
      yield put({ type: FETCH_DIALOGS_SUCCESS, dialogs });
      yield put({ type: LOADER_OFF });
      /* NEW */
      let socket = yield call(Api.websocketInitRoomsChanged);
      while (true) {
        const action = yield take(socket);
        yield put(action);
        //TODO
        let dialogs = yield Api.fetchDialogs();
        yield put({ type: FETCH_DIALOGS_SUCCESS, dialogs });
      }
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
        yield put({ type: FETCH_MANAGERS_REQUEST });
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
        yield put({ type: FETCH_MANAGERS_REQUEST });
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
      if (!managers.error) {
        managers.managers.forEach((value, key) => {
          value.key = String(key + 1);
          value.number = key + 1;
        });
      }
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
      
      //Get RocketChat Token
      let result = yield Api.getXauthToken();
      localStorage.setItem('XUSER', JSON.stringify(result));

      const uri = localStorage.getItem('redirect');
      localStorage.removeItem('redirect');
      yield put(push(uri || '/'));
    } catch (err) {
      throw err;
    }
  });
}

function* loaderOff() {
  yield takeLatest(LOADER_TURN_OFF, function* (action) {
    try {
      yield put({ type: LOADER_OFF });
    } catch (err) {
      throw err;
    }
  });
}

function* fetchRole() {
  yield takeLatest(FETCH_ROLE_REQUEST, function* (action) {
    try {
      let role = yield Api.fetchRole();
      if (!role.error) {
        yield put({ type: FETCH_ROLE_SUCCESS, role: role.role });
      }
    } catch (err) {
      throw err;
    }
  });
}

function* fetchRequests() {
  yield takeLatest(FETCH_REQUESTS_REQUEST, function* (data) {
    try {
      let config = Api.fetchConfig();
      let groupInfo = yield Api.fetchGroupInfo({ roomName: 'Requests_' + config.companyId });
      let messages = yield Api.fetchDialog({ roomId: groupInfo.data.group._id, count: data.data.count || 20 });
      //messages = _.filter(messages, function (item) { return item.bot === null; });
      yield put({ type: FETCH_REQUESTS_SUCCESS, messages });
    } catch (err) {
      throw err;
    }
  })
}

function* deleteRequest() {
  yield takeLatest(DELETE_REQUEST_REQUEST, function* (data) {
    try {
      let config = Api.fetchConfig();
      let groupInfo = yield Api.fetchGroupInfo({ roomName: 'Requests_' + config.companyId });
      let result = yield Api.deleteRequest({ roomId: groupInfo.data.group._id, msgId: data.data.msgId });
      yield put({ type: DELETE_REQUEST_SUCCESS, result });
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
    fork(loaderOff),
    fork(fetchRole),
    fork(fetchRequests),
    fork(deleteRequest)
  ];
}