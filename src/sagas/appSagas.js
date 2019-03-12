import { put, fork, takeLatest, call, take, select } from 'redux-saga/effects';
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
  FETCH_ROLE_SUCCESS, //FETCH_ROLE_REQUEST, FETCH_ROLE_ERROR
  FETCH_HISTORY_REQUEST, FETCH_HISTORY_SUCCESS, //FETCH_HISTORY_ERROR
  FETCH_CONFIG_SUCCESS,
  LOGOUT,
  SET_COMPANIES,
  SET_CURRENT_COMPANY_REQUEST,
  SET_CURRENT_COMPANY_SUCCESS,
  SET_XUSER_SUCCESS,
  FETCH_CLIENT_INFO_REQUEST,
  FETCH_CLIENT_INFO_SUCCESS,
  FETCH_WEBSOCKET_REQUEST,
  FETCH_WEBSOCKET_SUCCESS,
  SET_STATUS_REQUEST,
  FETCH_MANAGER_INFO_REQUEST,
  FETCH_MANAGER_INFO_SUCCESS,
  FETCH_XUSER_REQUEST,
  FETCH_XUSER_SUCCESS,
  SEND_REGISTRATION_FORM_REQUEST,
  SEND_REGISTRATION_FORM_SUCCESS,
  SEND_REGISTRATION_FORM_ERROR,
  SEND_RECOVERY_PWD_REQUEST,
  SEND_RECOVERY_PWD_TOKEN_REQUEST,
  SEND_RECOVERY_PWD_SUCCESS,
  SEND_RECOVERY_PWD_ERROR,
  SEND_RECOVERY_PWD_TOKEN_SUCCESS,
  SEND_RECOVERY_PWD_TOKEN_ERROR
} from '../constants';
import * as Api from '../api';
import * as _ from 'underscore';

function* sendMessageSaga() {
  yield takeLatest(SEND_MESSAGE_REQUEST, function* (action) {
    try {
      let { room, text } = action.data;
      let result = yield Api.sendMessage(room, text);
      if (result.status === 200) {
        yield put({ type: SEND_MESSAGE_SUCCESS, result });
      }
    } catch (err) {
      throw err;
    }
  })
}

function* fetchDialogSaga() {
  yield takeLatest(FETCH_DIALOG_REQUEST, function* (action) {
    try {
      const currentCompany = yield select((state) => state.app.currentCompany);
      const dialogs = yield select((state) => state.app.dialogs);
      let { room, fetchNew } = action.data;
      let dialog = _.find(dialogs, function (dialog) { return dialog._id === room._id; });
      let groupInfo = yield Api.memoizedFetchGroupInfo(room._id);
      let { userId } = JSON.parse(localStorage.getItem('XUSER')).data;
      if (dialog.customFields.notify && groupInfo.data.group.customFields.notify) {
        yield Api.takeRequest({
          roomId: room._id,
          userId: userId
        }, currentCompany);
      }
      let groupMembers = yield Api.memoizedFetchGroupMembers(room._id);
      let messages = yield Api.memoizedFetchDialog(room._id, true, action.data.count);
      let client = _.find(groupMembers.data.members, function (member) {
        return member.username === room.name.substring(0, room.name.length - 1);
      });
      let userInfo = yield Api.memoizedFetchUserInfo(currentCompany, client._id);
      yield put({ type: FETCH_CLIENT_INFO_SUCCESS, userInfo });
      yield put({
        type: FETCH_DIALOG_SUCCESS, data: {
          groupMembers: groupMembers,
          room: room,
          messagesCount: groupInfo.data.group.msgs,
          fetchNew: fetchNew
        }
      });
      yield put({ type: FETCH_HISTORY_SUCCESS, data: { messages: messages } });

    } catch (err) {
      throw err;
    }
  })
}

function* fetchHistorySaga() {
  yield takeLatest(FETCH_HISTORY_REQUEST, function* (action) {
    try {

      let { room, count } = action.data;
      let messages = yield Api.fetchDialog(room._id, true, count);
      yield put({
        type: FETCH_HISTORY_SUCCESS, data: {
          messages: messages
        }
      });

    } catch (err) {
      throw err;
    }
  })
}

function* fetchDialogsSaga() {
  yield takeLatest(FETCH_DIALOGS_REQUEST, function* () {
    try {

      yield put({ type: LOADER_ON });
      let dialogs = yield Api.fetchDialogs();
      yield put({ type: FETCH_DIALOGS_SUCCESS, dialogs });
      yield put({ type: LOADER_OFF });

      /* NEW */
      const ddp = yield select((state) => state.app.socket);
      let socket = yield call(Api.websocketInitRoomsChanged, ddp);
      while (true) {
        const action = yield take(socket);
        yield put(action);
        const dialogs = yield select((state) => state.app.dialogs);
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
      const currentCompany = yield select((state) => state.app.currentCompany);
      let result = yield Api.removeManager(action.data, currentCompany);
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
      const currentCompany = yield select((state) => state.app.currentCompany);
      let result = yield Api.addManager(action.data, currentCompany);
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
  yield takeLatest(FETCH_MANAGERS_REQUEST, function* () {
    try {

      yield put({ type: LOADER_ON });
      const currentCompany = yield select((state) => state.app.currentCompany);
      let managers = yield Api.fetchManagers(currentCompany);
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
      const currentCompany = yield select((state) => state.app.currentCompany);
      yield Api.saveSettings(action.data, currentCompany);
      yield put({ type: SAVE_SETTINGS_SUCCESS });
      yield put({ type: LOADER_OFF });

    } catch (err) {
      throw err;
    }
  })
}

function* fetchSettingsSaga() {
  yield takeLatest(FETCH_SETTINGS_REQUEST, function* () {
    try {

      yield put({ type: LOADER_ON });
      const currentCompany = yield select((state) => state.app.currentCompany);
      yield put({ type: FETCH_SETTINGS_SUCCESS, widgetSettings: yield Api.fetchSettings(currentCompany) });
      let config = yield Api.fetchConfig();
      config.companyId = currentCompany;
      yield put({ type: FETCH_CONFIG_SUCCESS, config: config });
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
      let companies = yield Api.getCompany();
      localStorage.setItem('companies', JSON.stringify(companies));
      yield put({ type: SET_COMPANIES, companies });
      //Get RocketChat Token
      const uri = localStorage.getItem('redirect') || '/';
      localStorage.removeItem('redirect');
      if (companies.data.length < 2) {
        yield put({ type: SET_CURRENT_COMPANY_REQUEST, data: companies.data[0]._id });
      }

      const currentCompany = yield select((state) => state.app.currentCompany);
      let result = yield Api.getXauthToken(currentCompany);
      yield put({ type: SET_XUSER_SUCCESS, result });

      companies.data.length > 1 ? yield put(push('/companies?redirect=' + uri)) : yield put(push(uri));

    } catch (err) {
      throw err;
    }
  });
}

function* loaderOff() {
  yield takeLatest(LOADER_TURN_OFF, function* () {
    try {
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

function* setCurrentCompanySaga() {
  yield takeLatest(SET_CURRENT_COMPANY_REQUEST, function* (action) {
    try {

      localStorage.setItem('currentCompany', action.data);
      yield put({ type: SET_CURRENT_COMPANY_SUCCESS, currentCompany: action.data })
      let role = yield Api.fetchRole(action.data);
      if (!role.error) {
        yield put({ type: FETCH_ROLE_SUCCESS, role: role.role });
      }

    } catch (err) {
      throw err;
    }
  });
}

function* fetchClientInfoSaga() {
  yield takeLatest(FETCH_CLIENT_INFO_REQUEST, function* (action) {
    try {

      const currentCompany = yield select((state) => state.app.currentCompany);
      let userInfo = yield Api.memoizedFetchUserInfo(currentCompany, action.data);
      yield put({ type: FETCH_CLIENT_INFO_SUCCESS, userInfo });

    } catch (err) {
      throw err;
    }
  })
}

function* fetchWebsocketSaga() {
  yield takeLatest(FETCH_WEBSOCKET_REQUEST, function* () {
    try {

      let socket = yield Api.fetchWebsocket();
      yield put({ type: FETCH_WEBSOCKET_SUCCESS, socket });

    } catch (err) {
      throw err;
    }
  })
}

function* setStatusSaga() {
  yield takeLatest(SET_STATUS_REQUEST, function* (action) {
    try {

      let { userId } = JSON.parse(localStorage.getItem('XUSER')).data;
      const currentCompany = yield select((state) => state.app.currentCompany);
      const ddp = yield select((state) => state.app.socket);
      yield Api.setStatus(action.data, ddp);
      let managerInfo = yield Api.fetchUserInfo(currentCompany, userId);
      yield put({ type: FETCH_MANAGER_INFO_SUCCESS, managerInfo });

    } catch (err) {
      throw err;
    }
  })
}

function* fetchManagerInfoSaga() {
  yield takeLatest(FETCH_MANAGER_INFO_REQUEST, function* () {
    try {

      let { userId } = JSON.parse(localStorage.getItem('XUSER')).data;
      const currentCompany = yield select((state) => state.app.currentCompany);
      let managerInfo = yield Api.fetchUserInfo(currentCompany, userId);
      yield put({ type: FETCH_MANAGER_INFO_SUCCESS, managerInfo });

    } catch (err) {
      throw err;
    }
  })
}

function* fetchXUSERSaga() {
  yield takeLatest(FETCH_XUSER_REQUEST, function* () {
    try {

      let XUSER = JSON.parse(localStorage.getItem('XUSER'));
      if (XUSER)
        yield put({ type: FETCH_XUSER_SUCCESS, xuser: XUSER.data });

    } catch (err) {
      throw err;
    }
  })
}

function* registrationFormSaga() {
  yield takeLatest(SEND_REGISTRATION_FORM_REQUEST, function* (action) {
    try {

      let result = yield Api.registration(action.data);
      if (!result.data.error) {
        yield put({ type: SEND_REGISTRATION_FORM_SUCCESS, result });
      } else {
        yield put({ type: SEND_REGISTRATION_FORM_ERROR, result });
      }

    } catch (err) {
      throw err;
    }
  })
}

function* recoveryFormSaga() {
  yield takeLatest(SEND_RECOVERY_PWD_REQUEST, function* (action) {
    try {

      let result = yield Api.recovery(action.data);
      if (result.data.result)
        yield put({ type: SEND_RECOVERY_PWD_SUCCESS });
      else
        yield put({ type: SEND_RECOVERY_PWD_ERROR, data: result.data });

    } catch (err) {
      throw err;
    }
  })
}

function* recoveryTokenSaga() {
  yield takeLatest(SEND_RECOVERY_PWD_TOKEN_REQUEST, function* (action) {
    try {

      let result = yield Api.recoveryToken(action.data);
      if (result.data.error) {
        yield put({ type: SEND_RECOVERY_PWD_TOKEN_ERROR, result });
      } else {
        yield put({ type: SEND_RECOVERY_PWD_TOKEN_SUCCESS });
      }

    } catch (err) {
      throw err;
    }
  })
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
    fork(logoutSaga),
    fork(fetchHistorySaga),
    fork(setCurrentCompanySaga),
    fork(fetchWebsocketSaga),
    fork(setStatusSaga),
    fork(fetchClientInfoSaga),
    fork(fetchManagerInfoSaga),
    fork(fetchXUSERSaga),
    fork(registrationFormSaga),
    fork(recoveryFormSaga),
    fork(recoveryTokenSaga)
  ];
}