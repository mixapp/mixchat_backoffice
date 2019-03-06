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
  FETCH_CONFIG_SUCCESS,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_REQUEST,
  SET_COMPANIES,
  SET_CURRENT_COMPANY_SUCCESS,
  SET_XUSER_SUCCESS,
  SEND_MESSAGE_SUCCESS,
  FETCH_USER_INFO_SUCCESS
} from '../constants';
const initialState = {
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
  userInfo: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_AUTHORIZE:
      return { ...state, user: action.data };

    case SEND_MESSAGE_SUCCESS:
      return { ...state };

    case FETCH_SETTINGS_SUCCESS:
      return { ...state, widgetSettings: action.widgetSettings };

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
          if (state.messages[state.messages.length - 1]._id !== lastMessage._id &&
            state.currentRoom._id === lastMessage.rid) {
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

    case FETCH_CONFIG_SUCCESS:
      state.config = action.config;
      return { ...state };

    case FETCH_HISTORY_REQUEST:
      state.dialogLoader = true;
      return { ...state }

    case FETCH_HISTORY_SUCCESS:
      let { messages } = action.data;
      let messages_ = [];
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].parseUrls) {
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
      state.xuser = action.result;
      localStorage.setItem('XUSER', JSON.stringify(action.result));
      return { ...state };

    case FETCH_USER_INFO_SUCCESS:
      state.userInfo = action.userInfo;
      return { ...state };
    default:
      return state;
  }
}
