import React, { useEffect } from "react";
import { useGlobalContext } from "../context/appContext";
import styled from "styled-components";
const JobList = () => {
  const { fetchJobs, jobs, isLoading } = useGlobalContext();
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <>
      {jobs.length === 0 ? (
        <p>No data</p>
      ) : (
        <Wrapper>
          {jobs.map((item) => {
            const date = new Date();
            const { _id: id, company, position, status, createdAt } = item;
            return (
              <div className="job" key={id}>
                <p className="job__date">{date.toDateString(createdAt)}</p>
                <p className="job__title">{position}</p>
                <p className="job__company">{company}</p>
                <div className="job__footer">
                  <div className="btn__wrapper">
                    <button>edit</button>
                    <button>delete</button>
                  </div>
                  <p className="job__status">{status}</p>
                </div>
              </div>
            );
          })}
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  .job {
    padding: 1rem;
    width: 300px;
    background-color: white;
    border-radius: 0.5rem;
    position: relative;
    overflow: hidden;
  }
  .job__date {
    font-size: 0.8rem;
    position: absolute;
    right: 0;
    top: 0;
    background-color: var(--clr-main);
    color: white;
    padding: 0.3rem;
  }
  .job__title {
    font-weight: bold;
    margin-top: 2rem;
    letter-spacing: 2px;
    text-transform: capitalize;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;
export default JobList;
