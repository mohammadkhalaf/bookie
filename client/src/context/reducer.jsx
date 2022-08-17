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
  HANDEL_CHANGE,
  CLEAR_FIELDS,
  CREATE_BOOK,
  CREATE_BOOK_FAIL,
  CREATE_BOOK_SUCCESS,
  GET_BOOKS,
  GET_BOOKS_FAIL,
  GET_BOOKS_SUCCESS,
  START_READING_SUCCESS,
  START_READING,
  DELETE_BOOK,
  DELETE_BOOK_FAIL,
  DELETE_BOOK_SUCCESS,
  SHOW_STATS_BEGAINS,
  SHOW_STATS_SUCCESS,
  SHOW_STATS_FAIL,
  CHANGE_PAGE,
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

  if (action.type === CLEAR_FIELDS) {
    const initialState = {
      title: '',

      author: '',
      editBookId: '',
      status: 'read now',

      pages: '',
      hasRead: 0,
      cover: '',
      createdBy: '',
      isEdited: false,
      isOngoing: false,
    };
    return {
      ...state,
      ...initialState,
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
      isLoading: false,
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
  if (action.type === UPDATE_USER_FAIL) {
    return {
      ...state,
      isLoading: false,
      alert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }
  if (action.type === HANDEL_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CREATE_BOOK) {
    return {
      ...state,
      page: 1,
      isLoading: true,
    };
  }
  if (action.type === CREATE_BOOK_SUCCESS) {
    return {
      ...state,
      isReading: action.payload,

      isLoading: false,
      alert: true,
      alertType: 'success',
      alertText: 'new book added',
    };
  }
  if (action.type === CREATE_BOOK_FAIL) {
    return {
      ...state,
      isLoading: false,
      alert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_BOOKS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_BOOKS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      books: action.payload.books,
      totalBooks: action.payload.totalBooks,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === START_READING) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === START_READING_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // isReading: true,
      // test: action.payload,
    };
  }
  if (action.type === DELETE_BOOK) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === DELETE_BOOK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      books: state.books.filter((book) => book._id !== action.payload.id),
      alert: true,
      alertType: 'success',
      alertText: action.payload.msg,
    };
  }

  if (action.type === DELETE_BOOK_FAIL) {
    return {
      ...state,
      isLoading: false,
      alert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === SHOW_STATS_BEGAINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,

      stats: action.payload.defaultStats,
      monthlyStats: action.payload.monthlyStats,
    };
  }
  if (action.type === SHOW_STATS_FAIL) {
    return {
      ...state,
      isLoading: false,
      alert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  return state;
};
