import {
    FETCH_SETTINGS_REQUEST,
    SAVE_SETTINGS_REQUEST,
    FETCH_MANAGERS_REQUEST,
    ADD_MANAGER_REQUEST,
    REMOVE_MANAGER_REQUEST,
    FETCH_DIALOGS_REQUEST
} from '../constants'
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