import {
  FETCH_SETTINGS_REQUEST,
  SAVE_SETTINGS_REQUEST,
  FETCH_MANAGERS_REQUEST,
  ADD_MANAGER_REQUEST,
  REMOVE_MANAGER_REQUEST,
  FETCH_DIALOGS_REQUEST,
  FETCH_DIALOG_REQUEST,
  SEND_MESSAGE_REQUEST,
  LOADER_OFF,
  LOADER_ON,
  FETCH_HISTORY_REQUEST,
  LOGOUT,
  SET_CURRENT_COMPANY_REQUEST,
  FETCH_WEBSOCKET_REQUEST,
  SET_STATUS_REQUEST,
  FETCH_CLIENT_INFO_REQUEST,
  FETCH_MANAGER_INFO_REQUEST,
  FETCH_XUSER_REQUEST
} from '../constants'

export const sendMessage = (data) => {
  return {
    type: SEND_MESSAGE_REQUEST,
    data
  }
}

export const fetchSettings = () => {
  return {
    type: FETCH_SETTINGS_REQUEST
  };
};

export const saveSettings = (data) => {
  return {
    type: SAVE_SETTINGS_REQUEST,
    data
  };
};

export const fetchManagers = () => {
  return {
    type: FETCH_MANAGERS_REQUEST
  }
}

export const addManager = (data) => {
  return {
    type: ADD_MANAGER_REQUEST,
    data
  }
}

export const removeManager = (data) => {
  return {
    type: REMOVE_MANAGER_REQUEST,
    data
  }
}

export const fetchDialogs = () => {
  return {
    type: FETCH_DIALOGS_REQUEST
  }
}

export const fetchDialog = (data) => {
  return {
    type: FETCH_DIALOG_REQUEST,
    data
  }
}

export const loaderOff = () => {
  return {
    type: LOADER_OFF
  }
}

export const loaderOn = () => {
  return {
    type: LOADER_ON
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const fetchHistory = (data) => {
  return {
    type: FETCH_HISTORY_REQUEST,
    data
  }
}

export const setCurrentCompany = (data) => {
  return {
    type: SET_CURRENT_COMPANY_REQUEST,
    data
  }
}

export const fetchWebsocket = () => {
  return {
    type: FETCH_WEBSOCKET_REQUEST
  }
}

export const setStatus = (data) => {
  return {
    type: SET_STATUS_REQUEST,
    data
  }
}

export const fetchClientInfo = (data) => {
  return {
    type: FETCH_CLIENT_INFO_REQUEST,
    data
  }
}

export const fetchManagerInfo = () => {
  return {
    type: FETCH_MANAGER_INFO_REQUEST
  }
}

export const fethcXUSER = () => {
  return {
    type: FETCH_XUSER_REQUEST
  }
}