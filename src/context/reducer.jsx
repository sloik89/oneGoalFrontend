import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  FETCH_JOBS,
  FETCH_SINGLE_JOB_SUCCESS,
  EDIT_SINGLE_ITEM,
  CLEAR_MSG,
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
    return { ...state, isLoading: false };
  }
  if (action.type === FETCH_JOBS) {
    return { ...state, isLoading: false, jobs: action.payload };
  }
  if (action.type === FETCH_SINGLE_JOB_SUCCESS) {
    const { _id, company, position, status } = action.payload;

    return {
      ...state,
      isLoading: false,
      showAlert: false,
      msgError: false,
      editItem: { company, position, status },
    };
  }
  if (action.type === EDIT_SINGLE_ITEM) {
    console.log(action.payload);
    return { ...state, msg: action.payload, isLoading: false };
  }
  if (action.type === CLEAR_MSG) {
    return { ...state, msg: "" };
  }
  return state;
};
export default reducer;
