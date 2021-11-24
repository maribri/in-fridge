import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {add, edit} from '../features/meals/mealsSlice';
import {nanoid} from 'nanoid';
import IngredientCheck from "./IngredientCheck";
import findAndReplace from "../utils/findAndReplace"

const Form = styled.form`
  box-sizing: border-box;
  width: 100%;
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

const initializeState = (props, products) => {
  return products.map(
    (product) => {
      if (!props.edit) {
        return { id: product.id, requiredAmount: null, checked: false };
      }
      const mealProduct = props.meal.products.find((productProp)=> productProp.id === product.id);
      if (mealProduct) {
        return { ...mealProduct, checked: true };
      } else {
        return { id: product.id, requiredAmount: null, checked: false };
      }
    }
  );
}

function AddPlanForm(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value);

  const [set, setSet] = useState('');
  const [productsValue, setProductsValue] = useState(initializeState(props, products)); //{product.id: product.amount}
  //props.edit ? props.meal.products : []
  const [errors, setErrors] = useState({});
  // if id -> is checked

  const getCurrentDate = (separator = '') => {
    return Date.now();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    //debugger;
    console.log(productsValue)
    for (const value of productsValue) {
      console.log(value)
      if (value.checked) {
        if (!value.requiredAmount) {
          //{...errors, id: 'text'}
          errors[value.id] = 'Ошибка не заполнено';
        } else if ((Number(value.requiredAmount) < 0)) {
          errors[value.id] = 'Ошибка отрицательное';
        }
      }
    }
    setErrors(errors);

    console.log(errors)
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) return;

    if (props.edit) {
      dispatch(edit({
        id: props.meal.id,
        timeCreate:  props.meal.timeCreate,
        products: productsValue.filter((productValue, ) => productValue.checked)
      }));
    } else {
      dispatch(add({
        id: nanoid(4),
        timeCreate: getCurrentDate(),
        products: productsValue.filter((productValue, ) => productValue.checked)
      }));
    }
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        {props.edit ? <h2>Изменить прием пищи #{props.meal.id} ({props.meal.name})</h2> : <h2>Добавить новый прием пищи</h2>}
        <Select onChange={(e) => setSet(e.target.value)} required>
          <option>завтрак</option>
          <option>обед</option>
          <option>ужин</option>
          <option>перекус</option>
        </Select>
        <ButtonAdd>Сохранить</ButtonAdd>
      </Form>
    </React.Fragment>
  );
}

export default AddPlanForm;
