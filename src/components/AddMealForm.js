import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {add} from '../features/meals/mealsSlice';
import {nanoid} from 'nanoid';
import {Portal} from "react-portal";
import AddProductForm from "./AddProductForm";

const Form = styled.form`
  max-width: 600px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`
const Field = styled.input`
  margin-bottom: 0.8rem;
  padding: 0.3rem;
`
const Select = styled.select`
  margin-bottom: 0.8rem;
  padding: 0.3rem;
  min-width: 30%;
  font-size: 16px;
  background-color: yellowgreen;
  border-color: forestgreen;
  border-radius: 6px;
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
const IngredientsList = styled.ul`
  max-height: 500px;
  overflow-y: auto;
  padding-left: 0;
`
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
const IngredientRowCheck = styled.input`
  margin-right: 10px;
`
const IngredientRowQty = styled.input`
  width: 60px;
  height: 26px;
  margin-left: 25px;
  background-color: #f5f5f5;
  border: 1px solid;
  border-color: ${props => props.checked ? "green" : "#dadada"};
`

function AddMealForm() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value);

  const [name, setName] = useState('');
  const [productsValue, setProductsValue] = useState({}); //{product.id: product.amount}
  // if id -> is checked

  const getCurrentDate = (separator = '') => {
    return Date.now();
  }

  const handleAddProduct = (e, id) => {
    e.preventDefault();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add({id: nanoid(4), timeCreate: getCurrentDate(), name}));
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <h2>Добавить новое блюдо</h2>
        <Field placeholder='Блюдо' value={name} onChange={(e) => setName(e.target.value)} required/>
        <IngredientsList>
          {products.map((product) =>
            <ProductCheck
              product={product}
              checked={productsValue[product.id] !== undefined}
              amountValue={productsValue[product.id] || ''}
              onAmountChange={console.log('')}
              onToogleCheck={(id) => {
                handleAddProduct(id)
              }}/>
          )}
        </IngredientsList>
        <ButtonAdd>Сохранить</ButtonAdd>
      </Form>
    </React.Fragment>
  );
}

function ProductCheck(props) {
  /*const [active, setActive] = useState(false);
  const [qty, setQty] = useState(0);*/

  /*const handleHightlight = (e) => {
    setActive(!active);
  }*/

  return (
    <IngredientRow active={props.checked}>
      <label onClick={props.onToogleCheck}>
        {/*<IngredientRowCheck type="checkbox" onChange={props.onToogleCheck} />*/}
        <IngredientRowTitle>#{props.product.id} - {props.product.name}</IngredientRowTitle>
      </label>
      <IngredientRowQty
        active={props.checked}
        type="number"
        value=""
        onFocus={props.onToogleCheck}
        onChange={(e)=> {props.onAmountChange(e.target.value)}}
      />
    </IngredientRow>
  );
}

export default AddMealForm;
