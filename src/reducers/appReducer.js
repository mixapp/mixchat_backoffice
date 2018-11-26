import { SET_AUTHORIZE, FETCH_SETTINGS_SUCCESS, FETCH_MANAGERS_SUCCESS, ADD_MANAGER_SUCCESS, REMOVE_MANAGER_SUCCESS } from '../constants';
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
        default:
            return state;
    }
}
