import {
  SET_AUTHORIZE,
  FETCH_SETTINGS_SUCCESS,
  FETCH_MANAGERS_SUCCESS,
  ADD_MANAGER_SUCCESS,
  REMOVE_MANAGER_SUCCESS,
  FETCH_DIALOGS_SUCCESS,
  LOADER_ON, LOADER_OFF,
  FETCH_DIALOG_SUCCESS,
  SOCKET_ROOMS_CHANGED_EVENT,
  FETCH_ROLE_SUCCESS
} from '../constants';
const initialState = {
  user: null,
  messages: [],
  message: null,
  dialogs: [],
  loader: false,
  currentRoomId: null
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
    case REMOVE_MANAGER_SUCCESS:
      return { ...state, result: action };
    case FETCH_DIALOGS_SUCCESS:
      return { ...state, dialogs: action.dialogs };
    case LOADER_ON:
      return { ...state, loader: true };
    case LOADER_OFF:
      return { ...state, loader: false };
    case FETCH_DIALOG_SUCCESS:
      state.currentRoomId = action.data.roomId;
      return { ...state, messages: action.data.messages.reverse() };
    case SOCKET_ROOMS_CHANGED_EVENT:
      let lastMsg = action.data.fields.args[1].lastMessage;
      if (lastMsg)
        return { ...state, message: lastMsg, messages: state.currentRoomId === lastMsg.rid ? [...state.messages, lastMsg] : state.messages };
      else
        return { ...state, message: null, messages: state.messages }
    case FETCH_ROLE_SUCCESS:
      return { ...state, role: action.role };
    default:
      return state;
  }
}
