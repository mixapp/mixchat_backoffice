import * as _ from 'underscore';
import {
  SET_AUTHORIZE,
  FETCH_SETTINGS_SUCCESS,
  FETCH_MANAGERS_SUCCESS,
  ADD_MANAGER_SUCCESS, ADD_MANAGER_ERROR,
  REMOVE_MANAGER_SUCCESS,
  FETCH_DIALOGS_SUCCESS,
  LOADER_ON, LOADER_OFF,
  FETCH_DIALOG_SUCCESS,
  SOCKET_ROOMS_CHANGED_EVENT,
  FETCH_ROLE_SUCCESS,
  FETCH_REQUESTS_SUCCESS,
  DELETE_REQUESTS_SUCCESS,
  FETCH_CONFIG_SUCCESS
} from '../constants';
const initialState = {
  user: null,
  messages: [],
  message: null,
  dialogs: [],
  loader: false,
  messagesCount: null,
  currentRoom: null,
  currentPage: 1,
  requests: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_AUTHORIZE:
      return { ...state, user: action.data };
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
    case FETCH_DIALOG_SUCCESS:
      state.currentRoom = action.data.room;
      state.messagesCount = action.data.messagesCount;
      state.currentPage = 1;
      return { ...state, messages: action.data.messages.reverse() };
    case SOCKET_ROOMS_CHANGED_EVENT:
      let { lastMessage } = action.data.fields.args[1];
      if (lastMessage) {
        let messages = null;
        if (state.currentRoom && state.currentRoom._id === lastMessage.rid) {
          messages = [...state.messages, lastMessage];
        } else {
          messages = state.messages;
        }
        return { ...state, message: lastMessage, messages: messages };
      } else
        return { ...state, message: null, messages: state.messages }
    case FETCH_ROLE_SUCCESS:
      return { ...state, role: action.role };
    case FETCH_REQUESTS_SUCCESS:
      return { ...state, requests: action.messages };
    case DELETE_REQUESTS_SUCCESS:
      return { ...state, result: action };
    case FETCH_CONFIG_SUCCESS:
      return { ...state, config: action.config };
    default:
      return state;
  }
}
