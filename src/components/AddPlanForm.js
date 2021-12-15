import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {add, edit} from '../features/planner/plannerSlice';
import {nanoid} from 'nanoid';
import Select from 'react-select';
import findAndReplace from "../utils/findAndReplace"
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

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
const SelectSimple = styled.select`
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
  margin-top: 0.8rem;
  padding: 0.74rem 0;
  font-size: 1.2rem;
`

const initializeState = (props, meals) => {
  return meals.map(
    (meal) => {
      if (!props.edit) {
        return { id: meal.id };
      }
      const mealProduct = props.meal.meals.find((productProp)=> productProp.id === meal.id);
      if (mealProduct) {
        return { ...mealProduct };
      } else {
        return { id: meal.id };
      }
    }
  );
}

function AddPlanForm(props) {
  const dispatch = useDispatch();
  //const products = useSelector((state) => state.products.value);
  const meals = useSelector((state) => state.meals.value);

  const [set, setSet] = useState('');
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [productsValue, setProductsValue] = useState(initializeState(props, meals)); //{product.id: product.amount}
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
    //console.log(productsValue)
    /*for (const value of productsValue) {
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
    if (hasErrors) return;*/

    if (props.edit) {
      /*dispatch(edit({
        id: props.meal.id,
        timeCreate:  props.meal.timeCreate,
        products: productsValue.filter((productValue, ) => productValue.checked)
      }));*/
    } else {
      dispatch(add({
        id: nanoid(4),
        timeCreate: getCurrentDate(),
        date: 1639688400000,
        set: set,
        meals: []
      }));
    }
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        {props.edit ? <h2>Изменить прием пищи #{props.meal.id} ({props.meal.name})</h2> : <h2>Добавить новый прием пищи</h2>}
        <DayPicker />
        <SelectSimple onChange={(e) => setSet(e.target.value)} required>
          <option defaultChecked>завтрак</option>
          <option>обед</option>
          <option>ужин</option>
          <option>перекус</option>
        </SelectSimple>
        <Select
          placeholder="Выберите блюдо..."
          isMulti
          name="colors"
          //value={selectedMeals}
          onChange={(e) => setSelectedMeals(e.target.value)}
          options={meals.map(item => ({ value: item.id, label: item.name }))}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <ButtonAdd>Сохранить</ButtonAdd>
      </Form>
    </React.Fragment>
  );
}

export default AddPlanForm;
