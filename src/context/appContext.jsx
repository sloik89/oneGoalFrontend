import React, { useState, useEffect, useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
} from "./actions";
const AppContext = React.createContext();
// const getUser = () => {
//   if (localStorage.getItem("user")) {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user.name;
//   }
//   return null;
// };
const initialState = {
  user: null,
  isLoading: false,
  jobs: [],
  showAlert: false,
  editItem: null,
  singleJobError: false,
  editComplete: false,
  msgError: "",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };
  const login = async (auth) => {
    setLoading();
    try {
      const { data } = await axios.post("/api/auth/login", auth);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
      console.log(data);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user, token: data.token })
      );
    } catch (err) {
      dispatch({ type: REGISTER_USER_ERROR, payload: err.response.data.msg });
      console.log(err.response.data.msg);
    }
    console.log(auth);
  };
  const register = async (auth) => {
    console.log(auth);
  };
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_USER });
  };
  return (
    <AppContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
