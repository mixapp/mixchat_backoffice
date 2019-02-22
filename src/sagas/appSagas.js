import { put, fork, takeLatest, call, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  SET_AUTHORIZE,
  FETCH_SETTINGS_REQUEST, FETCH_SETTINGS_SUCCESS, //FETCH_SETTINGS_ERROR,
  SAVE_SETTINGS_REQUEST, SAVE_SETTINGS_SUCCESS, //SAVE_SETTINGS_ERROR,
  FETCH_MANAGERS_REQUEST, FETCH_MANAGERS_SUCCESS, //FETCH_MANAGERS_ERROR,
  ADD_MANAGER_REQUEST, ADD_MANAGER_SUCCESS, ADD_MANAGER_ERROR,
  REMOVE_MANAGER_REQUEST, REMOVE_MANAGER_SUCCESS,  //REMOVE_MANAGER_ERROR,
  FETCH_DIALOGS_REQUEST, FETCH_DIALOGS_SUCCESS, //FETCH_DIALOGS_ERROR
  LOADER_ON, LOADER_OFF,
  FETCH_DIALOG_REQUEST, FETCH_DIALOG_SUCCESS, //FETCH_DIALOG_ERROR
  SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, //SEND_MESSAGE_ERROR
  LOADER_TURN_OFF,
  FETCH_ROLE_REQUEST, FETCH_ROLE_SUCCESS, //FETCH_ROLE_ERROR
  FETCH_CONFIG_SUCCESS,
  LOGOUT
} from '../constants';
import * as Api from '../api';
import * as lsApi from '../lsApi';
import * as _ from 'underscore';

function* sendMessageSaga() {
  yield takeLatest(SEND_MESSAGE_REQUEST, function* (action) {
    try {
      let { room, text } = action.data;
      let result = yield Api.sendMessageSaga(room, text);

      let lsDialogs = lsApi.getDialogs();
      let lsDialog = _.findIndex(lsDialogs, { _id: action.data.roomId });
      lsDialogs[lsDialog].nmsgs = 0;
      lsDialogs[lsDialog].msgs = lsDialogs[lsDialog].msgs + 1;
      lsApi.updateDialogs(lsDialogs);

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
      let { room } = action.data;

      lsApi.updateDialogs(lsApi.readDialog(room));
      let dialogs = yield Api.fetchDialogs();
      lsApi.setDialogs(dialogs);
      yield put({ type: FETCH_DIALOGS_SUCCESS, dialogs });

      let groupInfo = yield Api.fetchGroupInfo({ roomId: room._id });
      let groupMembers = yield Api.fetchGroupMembers({ roomId: room._id });
      let messages = yield Api.fetchDialog({ roomId: room._id, unreads: true, count: action.data.count });
      yield put({
        type: FETCH_DIALOG_SUCCESS, data: {
          groupMembers: groupMembers,
          messages: messages,
          room: room,
          messagesCount: groupInfo.data.group.msgs
        }
      });
      yield put({ type: LOADER_OFF });

    } catch (err) {
      throw err;
    }
  })
}

function* fetchDialogsSaga() {
  yield takeLatest(FETCH_DIALOGS_REQUEST, function* (action) {
    try {

      yield put({ type: LOADER_ON });
      let dialogs = yield Api.fetchDialogs();

      lsApi.setDialogs(dialogs);

      yield put({ type: FETCH_DIALOGS_SUCCESS, dialogs });
      yield put({ type: LOADER_OFF });

      /* NEW */
      let socket = yield call(Api.websocketInitRoomsChanged);
      while (true) {
        const action = yield take(socket);
        yield put(action);
        //TODO
        let dialogs = yield Api.fetchDialogs();
        lsApi.setDialogs(dialogs);
        yield put({ type: FETCH_DIALOGS_SUCCESS, dialogs });
      }
    } catch (err) {
      throw (err);
    }
  })
}

function* removeManagerSaga() {
  yield takeLatest(REMOVE_MANAGER_REQUEST, function* (action) {
    try {

      yield put({ type: LOADER_ON });
      let result = yield Api.removeManager(action.data);
      if (!result.data.error) {
        yield put({ type: REMOVE_MANAGER_SUCCESS, result });
        yield put({ type: FETCH_MANAGERS_REQUEST });
      }
      yield put({ type: LOADER_OFF });

    } catch (err) {
      throw err;
    }
  })
}

function* addManagerSaga() {
  yield takeLatest(ADD_MANAGER_REQUEST, function* (action) {
    try {

      yield put({ type: LOADER_ON });
      let result = yield Api.addManager(action.data);
      if (!result.data.error) {
        yield put({ type: ADD_MANAGER_SUCCESS, result });
        yield put({ type: FETCH_MANAGERS_REQUEST });
      } else {
        yield put({ type: ADD_MANAGER_ERROR, result });
      }
      yield put({ type: LOADER_OFF });

    } catch (err) {
      throw err;
    }
  })
}

function* fetchManagersSaga() {
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
      yield put({ type: FETCH_SETTINGS_SUCCESS, widgetSettings: yield Api.fetchSettings() });
      yield put({ type: FETCH_CONFIG_SUCCESS, config: yield Api.fetchConfig() });
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

function* fetchRoleSaga() {
  yield takeLatest(FETCH_ROLE_REQUEST, function* (action) {
    try {

      yield put({ type: LOADER_ON });
      let role = yield Api.fetchRole();
      if (!role.error) {
        yield put({ type: FETCH_ROLE_SUCCESS, role: role.role });
      }
      yield put({ type: LOADER_OFF });

    } catch (err) {
      throw err;
    }
  });
}

function* logoutSaga() {
  yield takeLatest(LOGOUT, function* () {
    try {

      yield put({ type: FETCH_ROLE_SUCCESS, role: false });
      localStorage.clear();
      window.location.href = Api.getCurrentURL();

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
    fork(fetchManagersSaga),
    fork(addManagerSaga),
    fork(removeManagerSaga),
    fork(fetchDialogsSaga),
    fork(fetchDialogSaga),
    fork(sendMessageSaga),
    fork(loaderOff),
    fork(fetchRoleSaga),
    fork(logoutSaga)
  ];
}