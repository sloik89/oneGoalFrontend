import React, { useState } from "react";
import styled from "styled-components";
import { Logo, FormRow } from "../components";
import { useGlobalContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
const Register = () => {
  const { login, register, msgError, showAlert, isLoading, user } =
    useGlobalContext();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isMember: true,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues({ ...values, [name]: value });
  };
  const handleMember = (e) => {
    e.preventDefault();
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (values.isMember) {
      login({ email, password });
    } else {
      register({ name, email, password });
    }
  };
  return (
    <>
      {user && <Navigate to="/dashboard" />}
      <Wrapper className="page">
        <div className="form__container">
          <form className="form" onSubmit={handleSubmit}>
            {showAlert && <p>{msgError}</p>}
            <Logo className="form__logo" center={true} />

            <h3 className="form__title">
              {values.isMember ? "Login" : "Register"}
            </h3>
            {!values.isMember && (
              <FormRow
                type="text"
                name="name"
                value={values.name}
                handleChange={handleChange}
              />
            )}
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />
            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />
            <button type="submit" className="btn btn__form">
              {isLoading ? "Loading" : "Submit"}
            </button>
            <p>
              {values.isMember ? "Not a member yet?" : "Already a member?"}
              <button className="member-btn" onClick={handleMember}>
                {values.isMember ? "Register" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  .form__container {
    background-color: white;
    max-width: 800px;
    width: 90%;
    padding: 2rem;
    border-radius: 0.5rem;
    border-top: 10px solid var(--clr-main);
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form__title {
    text-align: center;
    font-weight: 700;
    font-size: 2.5rem;
  }
  .btn__form {
    align-self: stretch;
    padding: 0.5rem 0;
  }
  .member-btn {
    border: none;
    background-color: transparent;
    color: var(--clr-main);
    font-size: 1.2rem;

    cursor: pointer;
  }
  p {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;
export default Register;
