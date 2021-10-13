import React, {useState} from 'react';
import styled from 'styled-components';

const PlannerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid limegreen;
  background-color: darkseagreen;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
`
const ButtonAdd = styled.button`
  appearance: none;
  border: 0;
  background-color: darkolivegreen;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  padding: 0.74rem 0;
  font-size: 1.2rem;
`

function Planner() {
  const handleAdd = () => {
    //
  }

  return (
    <React.Fragment>
      <PlannerWrapper>
        Planner
      </PlannerWrapper>
      <ButtonAdd type='button' onClick={handleAdd}>Добавить +</ButtonAdd>
    </React.Fragment>
  );
}

export default Planner;
