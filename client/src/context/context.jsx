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
  CREATE_BOOK_SUCCESS,
  GET_BOOKS,
  GET_BOOKS_SUCCESS,
  START_READING,
  START_READING_FAIL,
  START_READING_SUCCESS,
  DELETE_BOOK,
  DELETE_BOOK_SUCCESS,
  SHOW_STATS_BEGAINS,
  SHOW_STATS_SUCCESS,
  CHANGE_PAGE,
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
  search: '',
  types: ['fiction', 'nonfiction'],
  genre: 'nonfiction',
  pages: '',
  hasRead: 0,
  isReading: false,

  createdBy: '',
  isEdited: false,
  monthlyStats: [],
  stats: {},
  editBookId: '',
  books: [],
  totalBooks: 0,
  numOfPages: 1,
  page: 1,
};
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log('auth error');
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2500);
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
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
      const { data } = await authFetch.patch('/auth/updateuser', currentUser);

      const { user, token } = data;

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } });
      setInLocalStorage(user, token);
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
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
    const { search, page } = state;
    let url = `/api/v1/books?page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_BOOKS });

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      const { books, totalBooks, numOfPages } = data;
      dispatch({
        type: GET_BOOKS_SUCCESS,
        payload: { books, totalBooks, numOfPages },
      });
    } catch (error) {
      logOut();
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
      logOut();
    }
    clearAlert();
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGAINS });
    try {
      const { data } = await axios.get(
        `/api/v1/books/stats`,

        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          defaultStats: data.defaultStats,
          monthlyStats: data.monthlyStats,
        },
      });
    } catch (error) {
      logOut();
    }
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
        changePage,
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
