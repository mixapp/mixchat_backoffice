import { SET_AUTHORIZE, FETCH_SETTINGS_SUCCESS, FETCH_MANAGERS_SUCCESS } from '../constants';
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
            return { ...state, managers: action.managers }
        default:
            return state;
    }
}
