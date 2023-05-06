import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  FETCH_JOBS,
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
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      msgError: action.payload,
      showAlert: true,
      isLoading: false,
    };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    console.log("create job");
    return { ...state, isLoading: false };
  }
  if (action.type === FETCH_JOBS) {
    return { ...state, isLoading: false, jobs: action.payload };
  }
  return state;
};
export default reducer;
