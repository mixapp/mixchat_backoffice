import { FETCH_SETTINGS_REQUEST, SAVE_SETTINGS_REQUEST } from '../constants'
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