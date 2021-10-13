import {
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  USER_LOGIN,
  AUTH_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  DELETE_ACCOUNT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAILURE:
    case AUTH_FAIL:
    case LOGIN_FAIL:
    case LOGOUT: 
    case DELETE_ACCOUNT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
