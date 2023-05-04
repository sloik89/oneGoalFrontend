import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
} from "./actions";
const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false, msgError: "" };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      msgError: action.payload,
      showAlert: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload,
      isLoading: false,
      showAlert: false,
      msgError: "",
    };
  }
  if (action.type === LOGOUT_USER) {
    return { ...state, user: null, isLoading: false };
  }
  return state;
};
export default reducer;
