import {
    SET_AUTHORIZE,
    FETCH_SETTINGS_SUCCESS,
    FETCH_MANAGERS_SUCCESS,
    ADD_MANAGER_SUCCESS,
    REMOVE_MANAGER_SUCCESS,
    FETCH_DIALOGS_SUCCESS,
    LOADER_ON, LOADER_OFF,
    FETCH_DIALOG_SUCCESS
} from '../constants';
const initialState = {
    user: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_AUTHORIZE:
            return { ...state, user: action.data };
        case FETCH_SETTINGS_SUCCESS:
            return { ...state, widgetSettings: action.widgetSettings };
        case FETCH_MANAGERS_SUCCESS:
            return { ...state, managers: action.managers };
        case ADD_MANAGER_SUCCESS:
            return { ...state, result: action };
        case REMOVE_MANAGER_SUCCESS:
            return { ...state, result: action };
        case FETCH_DIALOGS_SUCCESS:
            return { ...state, dialogs: action.dialogs };
        case LOADER_ON:
            console.log('LOADER_ON');
            return { ...state, loader: true };
        case LOADER_OFF:
            console.log('LOADER_OFF');
            return { ...state, loader: false };
        case FETCH_DIALOG_SUCCESS:
            return { ...state, messages: action.messages };
        default:
            return state;
    }
}
