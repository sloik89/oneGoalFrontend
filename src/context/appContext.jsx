import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useCallback,
} from "react";
import reducer from "./reducer";
import axios from "axios";
import { getToken } from "../utils/getToken";
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  FETCH_JOBS,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
} from "./actions";
const AppContext = React.createContext();
const getUser = () => {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.name;
  }
  return null;
};
const initialState = {
  user: getUser(),
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
    setLoading();

    try {
      const { data } = await axios.post("/api/auth/register", auth);
      console.log(data);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });

      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user, token: data.token })
      );
    } catch (err) {
      console.log(err);
      dispatch({ type: REGISTER_USER_ERROR, payload: err.response.data.msg });
      console.log(err.response.data.msg);
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_USER });
  };
  // created Job
  const createJob = async (formData) => {
    setLoading();
    let { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const { data } = await axios.post("/api/jobs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      fetchJobs();
      console.log(data);
    } catch (err) {
      dispatch({ type: CREATE_JOB_ERROR, payload: err.response.data.msg });
      console.log(err);
    }
    console.log(formData);
  };
  const fetchJobs = useCallback(async () => {
    setLoading();
    const token = getToken();
    console.log(token);
    console.log("fetch jobs");
    try {
      const { data } = await axios.get("/api/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: FETCH_JOBS, payload: data });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const fetchSingleJob = async (id) => {
    try {
      const { data } = await axios.get(`/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log(data);
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteSingleTask = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.delete(`/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      fetchJobs();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const editJob = async (id, userInput) => {
    console.log(userInput);
    setLoading();
    try {
      const { data } = await axios.patch(
        `/api/jobs/${id}`,
        { ...userInput },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        createJob,
        fetchJobs,
        deleteSingleTask,
        fetchSingleJob,
        editJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
