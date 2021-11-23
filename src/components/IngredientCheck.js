import React, {useState} from 'react';
import styled from 'styled-components';

const IngredientRow = styled.li`
  cursor: pointer;
  list-style: none;
  padding: 8px 0 8px 30px;
  display: flex;
  align-items: center;
  background: no-repeat 0 50%;
  background-image: ${props => props.checked ? "url(\"data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='green' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\")" : ""};
`
const IngredientRowTitle = styled.span`
  padding: 0;
`
const IngredientRowQty = styled.input`
  width: 60px;
  height: 26px;
  margin-left: 25px;
  background-color: #f5f5f5;
  border: 1px solid;
  border-color: ${props => props.checked ? "green" : "#dadada"};
`
const IngredientRowUnit = styled.div`
  margin-left: 6px;
  color: #4a4a4a;
`
const IngredientRowQtyError = styled.div`
  margin-left: 8px;
  color: red;
`

function IngredientCheck(props) {
  return (
    <IngredientRow checked={props.checked}>
      <label onClick={props.onToogleCheck}>
        {/*<IngredientRowCheck type="checkbox" onChange={props.onToogleCheck} />*/}
        <IngredientRowTitle>#{props.product.id} - {props.product.name}</IngredientRowTitle>
      </label>
      <IngredientRowQty
        checked={props.checked}
        type="number"
        value={props.amountValue}
        onFocus={props.onToogleCheck}
        onChange={(e)=> {props.onAmountChange(Number(e.target.value))}}
      />
      <IngredientRowUnit>{props.product.unit}</IngredientRowUnit>
      <IngredientRowQtyError>{props.errors}</IngredientRowQtyError>
    </IngredientRow>
  );
}

export default IngredientCheck;
