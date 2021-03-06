import * as _ from 'underscore';
import * as Api from '../api';
import {
  SET_AUTHORIZE,
  FETCH_SETTINGS_SUCCESS,
  FETCH_DIALOG_REQUEST,
  FETCH_MANAGERS_SUCCESS,
  ADD_MANAGER_SUCCESS, ADD_MANAGER_ERROR,
  REMOVE_MANAGER_SUCCESS,
  FETCH_DIALOGS_SUCCESS,
  LOADER_ON, LOADER_OFF,
  FETCH_DIALOG_SUCCESS,
  SOCKET_ROOMS_CHANGED_EVENT,
  FETCH_ROLE_SUCCESS,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_REQUEST,
  SET_COMPANIES,
  SET_CURRENT_COMPANY_SUCCESS,
  SET_XUSER_SUCCESS,
  FETCH_CLIENT_INFO_SUCCESS,
  FETCH_WEBSOCKET_SUCCESS,
  FETCH_MANAGER_INFO_SUCCESS,
  FETCH_XUSER_SUCCESS,
  SEND_REGISTRATION_FORM_SUCCESS,
  SEND_REGISTRATION_FORM_ERROR,
  SEND_RECOVERY_PWD_SUCCESS,
  SEND_RECOVERY_PWD_TOKEN_SUCCESS,
  SEND_RECOVERY_PWD_TOKEN_ERROR,
  SEND_RECOVERY_PWD_ERROR,
  FETCH_SETTINGS_REQUEST,
  FETCH_WIDGET_SUCCESS
} from '../constants';
const initialState = {
  error_message: '',
  xuser: null,
  user: null,
  messages: [],
  message: null,
  dialogs: [],
  companies: [],
  currentCompany: null,
  loader: false,
  dialogLoader: false,
  messagesCount: null,
  currentRoom: null,
  currentPage: 1,
  role: null,
  clientInfo: null,
  socket: null,
  manager: null,
  /* Registration form */
  registrationFormSuccess: false,
  registrationFormError: false,
  /* Recovery form */
  recoveryFormSuccess: false,
  recoveryFormError: false,
  /* Recovery process by token */
  recoveryByTokenSuccess: false,
  recoveryByTokenError: false,
  widgetSettings: null,
  widget: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_AUTHORIZE:
      return { ...state, user: action.data };

    case FETCH_SETTINGS_REQUEST:
      return { ...state, loader: true };

    case FETCH_SETTINGS_SUCCESS:
      return { ...state, widgetSettings: action.widgetSettings, loader: false };

    case FETCH_MANAGERS_SUCCESS:
      return { ...state, managers: action.managers.managers };

    case ADD_MANAGER_SUCCESS:
      return { ...state, result: action };

    case ADD_MANAGER_ERROR:
      return { ...state, error_message: action.result.data };

    case REMOVE_MANAGER_SUCCESS:
      return { ...state, result: action.result };

    case FETCH_DIALOGS_SUCCESS:
      return { ...state, dialogs: action.dialogs };

    case LOADER_ON:
      return { ...state, loader: true };

    case LOADER_OFF:
      return { ..._.omit(state, 'error_message'), loader: false };

    case FETCH_DIALOG_REQUEST:
      return { ...state, loader: true };

    case FETCH_DIALOG_SUCCESS:
      let { room, messagesCount, groupMembers, fetchNew } = action.data;
      if (fetchNew) {
        state.currentRoom = room;
        state.messagesCount = messagesCount;
        state.currentPage = 1;
      }
      state.loader = false;
      state.dialogLoader = false;
      state.groupMembers = groupMembers.data;
      state.message = room.lastMessage;
      return { ...state };

    case SOCKET_ROOMS_CHANGED_EVENT:
      let { lastMessage, name, _id } = action.data.fields.args[1];

      /* Filter GENERAL CHANNEL */
      if (name === 'GENERAL' || name === 'general' || _id === 'GENERAL')
        return { ...state };

      let dialog = _.find(state.dialogs, function (dialog) { return dialog._id === _id; });

      // new group or group update
      if (dialog) {
        state.dialogs = state.dialogs.map((dialog) => {
          if (dialog._id === _id) {
            Api.deleteMemoizedFetchGroupInfo(_id);
            Api.deleteMemoizedFetchGroupMembers(_id);
            return action.data.fields.args[1];
          }
          return dialog;
        });
      } else {
        state.dialogs.push(action.data.fields.args[1]);
      }

      if (lastMessage) {
        Api.deleteMemoizedFetchDialog(lastMessage.rid, true, 15);
        if (state.messages && state.messages.length > 0) {
          if (
            state.currentRoom &&
            state.messages[state.messages.length - 1]._id !== lastMessage._id &&
            state.currentRoom._id === lastMessage.rid
          ) {
            state.messages = [...state.messages, lastMessage];
          }
        } else {
          state.messages = [lastMessage];
        }
        state.message = lastMessage;
      } else {
        state.message = null;
      }
      return { ...state }

    case FETCH_ROLE_SUCCESS:
      state.role = action.role;
      return { ...state };

    case FETCH_HISTORY_REQUEST:
      state.dialogLoader = true;
      return { ...state }

    case FETCH_HISTORY_SUCCESS:
      let { messages } = action.data;
      let messages_ = [];
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].t === undefined) {
          messages_.push(messages[i]);
        }
      }
      state.dialogLoader = false;
      state.messages = messages_.reverse();
      return { ...state };

    case SET_COMPANIES:
      state.companies = action.companies;
      return { ...state };

    case SET_CURRENT_COMPANY_SUCCESS:
      state.currentCompany = action.currentCompany;
      return { ...state };

    case SET_XUSER_SUCCESS:
      state.xuser = action.data;
      localStorage.setItem('XUSER', JSON.stringify(state.xuser));
      return { ...state };

    case FETCH_CLIENT_INFO_SUCCESS:
      state.userInfo = action.userInfo;
      return { ...state };

    case FETCH_WEBSOCKET_SUCCESS:
      state.socket = action.socket;
      return { ...state };
    case FETCH_MANAGER_INFO_SUCCESS:
      state.manager = action.managerInfo.data.user;
      return { ...state };
    case FETCH_XUSER_SUCCESS:
      state.xuser = action.xuser;
      return { ...state };
    case SEND_REGISTRATION_FORM_SUCCESS:
      state.registrationFormSuccess = true;
      state.registrationFormError = false;
      state.error_message = action.data;
      return { ...state };
    case SEND_REGISTRATION_FORM_ERROR:
      state.registrationFormSuccess = false;
      state.registrationFormError = true;
      state.error_message = action.result.data.error_message;
      return { ...state };
    case SEND_RECOVERY_PWD_SUCCESS:
      state.recoveryFormSuccess = true;
      state.recoveryFormError = false;
      return { ...state };
    case SEND_RECOVERY_PWD_ERROR:
      state.recoveryFormSuccess = false;
      state.recoveryFormError = true;
      state.error_message = action;
      return { ...state };
    case SEND_RECOVERY_PWD_TOKEN_SUCCESS:
      state.recoveryByTokenSuccess = true;
      state.recoveryByTokenError = false;
      return { ...state };
    case SEND_RECOVERY_PWD_TOKEN_ERROR:
      state.recoveryByTokenError = true;
      state.recoveryByTokenSuccess = false;
      state.error_message = action.result.data.error_message;
      return { ...state };
    case FETCH_WIDGET_SUCCESS:
      state.widget = action.data.result;
      return { ...state };
    default:
      return state;
  }
}
