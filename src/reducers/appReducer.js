import { SET_AUTHORIZE, FETCH_SETTINGS_SUCCESS } from '../constants';
const initialState = {
    user: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_AUTHORIZE:
            return { ...state, user: action.data };
        case FETCH_SETTINGS_SUCCESS:
            return { ...state, widgetSettings: action.widgetSettings };
        default:
            return state;
    }
}
