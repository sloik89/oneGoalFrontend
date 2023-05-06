import React from "react";
import styled from "styled-components";
import { Logo } from "../components";
import img from "../assets/goal.svg";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
const Home = () => {
  const { user } = useGlobalContext();

  return (
    <>
      {user && <Navigate to="/dashboard" />}
      <Wrapper className="section-center">
        <Logo />
        <div className="content">
          <div className="content__desc">
            <h1 className="content__header">Goal Tracking App</h1>
            <p className="content__par">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              labore odio officia dolorem sapiente perferendis cumque repellat
              dignissimos neque illum. Officiis quasi aperiam modi sapiente
              possimus facere cupiditate perspiciatis labore!
            </p>
            <button className="btn auth__btn">
              <Link className="link" to="register">
                login/register
              </Link>
            </button>
          </div>
          <div className="content__img">
            <img src={img} alt="" />
          </div>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.main`
  .content {
    min-height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    &__img {
      flex-basis: 100%;
      @media screen and (max-width: 800px) {
        display: none;
      }
    }
    &__desc {
      flex-basis: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
`;
export default Home;
