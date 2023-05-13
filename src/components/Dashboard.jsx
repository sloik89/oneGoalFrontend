import React, { useState } from "react";
import { Logo, Navbar } from "../components";
import { useGlobalContext } from "../context/appContext";
import { FormRow, JobList } from "./";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
const Dashboard = () => {
  const { user, logout, createJob, msgError, showAlert, isLoading } =
    useGlobalContext();
  const [values, setValues] = useState({ company: "", position: "" });
  const handleChange = (e) => {
    console.log(e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();

    createJob(values);
  };
  return (
    <Wrapper className="section-center">
      <Navbar />
      <form className="form-create-edit" onSubmit={submitForm}>
        {showAlert && <p>{msgError}</p>}
        <h1>new job</h1>
        <FormRow
          value={values.company}
          type={"text"}
          name={"company"}
          handleChange={handleChange}
        />
        <FormRow
          value={values.position}
          type={"text"}
          name={"position"}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="btn"
          disabled={isLoading ? true : false}
        >
          {isLoading ? "Loading" : "submit"}
        </button>
      </form>

      <JobList />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .form-create {
    .btn {
      align-self: center;
    }
    h1 {
      align-self: center;
      text-transform: capitalize;
      letter-spacing: 2px;
      margin-top: 1rem;
    }
  }
`;
export default Dashboard;
