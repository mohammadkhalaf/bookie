import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';
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
  return state;
};
