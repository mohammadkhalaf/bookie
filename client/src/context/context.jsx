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
  USER_LOGOUT,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  HANDEL_CHANGE,
  CLEAR_FIELDS,
  CREATE_BOOK,
  CREATE_BOOK_FAIL,
  CREATE_BOOK_SUCCESS,
  GET_BOOKS,
  GET_BOOKS_FAIL,
  GET_BOOKS_SUCCESS,
  START_READING,
  START_READING_FAIL,
  START_READING_SUCCESS,
  UPDATE_BOOK,
  UPDATE_BOOK_SUCCESS,
  DELETE_BOOK,
  DELETE_BOOK_FAIL,
  DELETE_BOOK_SUCCESS,
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
  title: '',
  author: '',

  types: ['fiction', 'nonfiction', 'math'],
  genre: 'nonfiction',
  pages: '',
  hasRead: 0,
  isReading: false,
  test: 0,

  createdBy: '',
  isEdited: false,

  editBookId: '',
  books: [],
  totalBooks: 0,
  numOfPages: 1,
  page: 1,
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
  const removeFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: USER_REGISTER });
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);

      const { user, token } = response.data;

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: { user, token },
      });

      setInLocalStorage(user, token);
    } catch (error) {
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
  const logOut = () => {
    dispatch({ type: USER_LOGOUT });
    removeFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER });
    try {
      const { data } = await axios.patch(
        '/api/v1/auth/updateuser',
        currentUser,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      const { user, token } = data;

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } });
      setInLocalStorage(user, token);
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const handleChange = (name, value) => {
    dispatch({ type: HANDEL_CHANGE, payload: { name, value } });
  };
  const clearInputs = () => {
    dispatch({ type: CLEAR_FIELDS });
  };

  const createBook = async () => {
    dispatch({ type: CREATE_BOOK });
    try {
      const { title, author, pages, hasRead, genre, isReading } = state;
      await axios.post(
        '/api/v1/books',
        {
          title,
          author,
          hasRead,
          pages,
          genre,
          isReading,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({ type: CREATE_BOOK_SUCCESS });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const getAllBooks = async () => {
    dispatch({ type: GET_BOOKS });
    try {
      const { data } = await axios.get(
        '/api/v1/books',

        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({ type: GET_BOOKS_SUCCESS, payload: { books: data } });
    } catch (error) {
      console.log(error);
    }
  };
  const startReading = async (id) => {
    dispatch({ type: START_READING });
    try {
      await axios.patch(
        `/api/v1/books`,
        {
          id: id,
          isReading: true,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({ type: START_READING_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: START_READING_FAIL });
    }
  };
  const updateReadPages = async (pages, id) => {
    dispatch({ type: START_READING });
    try {
      const { data } = await axios.patch(
        `/api/v1/books/`,
        {
          id,
          hasRead: pages,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const { hasRead } = data;
      console.log(hasRead);
      dispatch({ type: START_READING_SUCCESS, payload: hasRead });
    } catch (error) {
      console.log(error);
      dispatch({ type: START_READING_FAIL });
    }
    getAllBooks();
  };
  const deleteBook = async (id) => {
    dispatch({ type: DELETE_BOOK });

    try {
      const { data } = await axios.delete(
        `/api/v1/books/${id}`,

        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({ type: DELETE_BOOK_SUCCESS, payload: { id, msg: data } });
    } catch (error) {
      console.log(`THE ERROR IS ${error}`);
      dispatch({
        type: DELETE_BOOK_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const showStats = async () => {
    const { data } = await axios.get(
      `/api/v1/books/stats`,

      {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }
    );
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logOut,
        updateUser,
        handleChange,
        clearInputs,
        createBook,
        getAllBooks,
        startReading,
        updateReadPages,
        deleteBook,
        showStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState, useAppContext };
