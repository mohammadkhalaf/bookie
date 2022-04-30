import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  USER_REGISTER,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from './actions';
export const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      alert: true,
      alertText: 'Please Provide all values',
      alertType: 'danger',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      alert: false,
      alertText: '',
      alertType: '',
    };
  }
  if (action.type === USER_REGISTER) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === USER_REGISTER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      alert: true,
      alertText: 'User created!!',
      alertType: 'success',
    };
  }
  if (action.type === USER_REGISTER_FAIL) {
    return {
      ...state,
      isLoading: false,
      alert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === USER_LOGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === USER_LOGIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      alert: true,
      alertText: 'Login successful',
      alertType: 'success',
    };
  }
  if (action.type === USER_LOGIN_FAIL) {
    return {
      ...state,
      isLoading: false,
      alert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === USER_LOGOUT) {
    return {
      ...state,
      user: null,
      token: null,
    };
  }
  if (action.type === UPDATE_USER) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      alert: true,
      alertText: 'Profile updated',
      alertType: 'success',
    };
  }
  if (action.type === UPDATE_USER_FAIL) {
    return {
      ...state,
      isLoading: false,
      alert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }
  return state;
};
