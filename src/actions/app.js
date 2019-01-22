import {
  SET_AUTHORIZE
} from '../constants';

export const setAuthorize = (data) => {
  return {
    type: SET_AUTHORIZE,
    data
  }
};