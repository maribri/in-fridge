import React, {useState} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid limegreen;
  background-color: darkseagreen;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
`

function ShoppingList() {
  return (
    <React.Fragment>
      <Wrapper>
        Planner
      </Wrapper>
    </React.Fragment>
  );
}

export default ShoppingList;
