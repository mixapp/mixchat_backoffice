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
  FETCH_ROLE_REQUEST
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

export const fetchRole = () => {
  return {
    type: FETCH_ROLE_REQUEST
  }
}