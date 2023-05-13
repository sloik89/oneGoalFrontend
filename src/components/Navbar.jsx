import React from "react";
import { Logo } from "./";
import { useGlobalContext } from "../context/appContext";
import styled from "styled-components";
const Navbar = () => {
  const { user, logout } = useGlobalContext();
  return (
    <Wrapper className="section-center">
      <Logo />
      <div className="container">
        <h3>hello {user}</h3>
        <button onClick={logout} className="btn">
          logout
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .container {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;
export default Navbar;
