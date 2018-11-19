import { SET_AUTHORIZE } from '../constants';
const initialState = {
  user: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) { 
        case SET_AUTHORIZE:
            return { ...state, user: action.data };
        default:
            return state;
  }
}
