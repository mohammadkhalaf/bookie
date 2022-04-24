import { useReducer, useContext } from 'react';
import { createContext } from 'react';
import { reducer } from './reducer';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  USER_REGISTER,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from './actions';
import axios from 'axios';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  isLoading: false,
  alert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token ? JSON.parse(token) : null,
};
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2500);
  };

  const setInLocalStorage = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
  };
  const removeFromLocalStorage = ({ user, token }) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  const registerUser = async (currentUser) => {
    dispatch({ type: USER_REGISTER });
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      console.log(response);

      const { user, token } = response.data;
      console.log(token);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: { user, token },
      });

      setInLocalStorage(user, token);
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: USER_LOGIN });
    try {
      const response = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token } = response.data;
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { user, token },
      });
      setInLocalStorage(user, token);
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  return (
    <AppContext.Provider
      value={{ ...state, displayAlert, registerUser, loginUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState, useAppContext };
