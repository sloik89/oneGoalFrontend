import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "../components";
import { useParams } from "react-router-dom";
import { FormRow } from "../components";
import { useGlobalContext } from "../context/appContext";
const Edit = () => {
  const { fetchSingleJob, isLoading, editItem, editJob } = useGlobalContext();
  const { id } = useParams();
  const [values, setValues] = useState({
    company: "",
    position: "",
    status: "",
  });
  useEffect(() => {
    fetchSingleJob(id);
  }, []);
  useEffect(() => {
    if (editItem) {
      const { company, position, status } = editItem;
      setValues({ company, position, status });
    }
  }, [editItem]);
  const handleChange = (e) => {
    console.log(values);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    const { company, position, status } = values;
    if (company && position) {
      editJob(id, { company, position, status });
    }
  };
  return (
    <Wrapper>
      <Navbar />
      <div className="form__edit section-center">
        <Link className="btn btn__edit" to="/dashboard">
          Go back
        </Link>
        <form className="form form-create-edit">
          <h3 className="form__edit__title">Edit</h3>
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
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={values.status}
            onChange={handleChange}
            className="select__edit"
          >
            <option value="pending">pending</option>
            <option value="interview">interview</option>
            <option value="declined">declined</option>
          </select>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn__form"
          >
            Edit
          </button>
        </form>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .form__edit__title {
    align-self: center;
    font-size: 2rem;
  }
  .btn__edit {
    margin-top: 2rem;
    align-self: center;
  }
  .form__edit {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .select__edit {
    align-self: flex-start;
    font-size: 1.1rem;
    letter-spacing: 2px;
    padding: 0.5rem 0.5rem;
    border: none;
    background-color: var(--bg-color);
  }
  .select__edit:focus {
    outline: none;
  }
  .btn__form {
    margin-top: 2rem;
    align-self: center;
    max-width: 500px;
    width: 100%;
  }
`;
export default Edit;
