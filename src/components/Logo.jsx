import React from "react";
import styled from "styled-components";
const Logo = ({ center }) => {
  return (
    <Wrapper>
      <h1 className={`logo ${center && "logo__center"}`}>
        <span className="logo__one">1</span>
        <p className="logo__goal">goal</p>
      </h1>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .logo__center {
    justify-content: center;
    margin-bottom: 1rem;
  }
  .logo {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 2rem;

    &__one {
      padding: 0.5rem 1rem;
      color: white;
      border-radius: 1rem;
      background-color: var(--clr-main);
    }
    &__goal {
      letter-spacing: 2px;
      text-transform: capitalize;
    }
  }
`;
export default Logo;
