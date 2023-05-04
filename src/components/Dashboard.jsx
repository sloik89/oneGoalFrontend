import React from "react";
import { Logo } from "../components";
import { useGlobalContext } from "../context/appContext";
import styled from "styled-components";
const Dashboard = () => {
  const { user, logout } = useGlobalContext();
  return (
    <Wrapper className="section-center">
      <nav>
        <Logo />
        <div className="container">
          <h3>hello {user}</h3>
          <button onClick={logout} className="btn">
            logout
          </button>
        </div>
      </nav>
      <div className="jobs-list"></div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .container {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;
export default Dashboard;
