import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {edit} from '../features/meals/mealsSlice';

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

function EditMealForm(props) {
  const dispatch = useDispatch();
  console.log(props.meal)


  const [name, setName] = useState(props.meal.name);
  const [amount, setAmount] = useState(props.meal.amount);
  const [unit, setUnit] = useState(props.meal.unit);
  console.log(name)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(edit({ id: props.meal.id, timeCreate:  props.meal.timeCreate, name, amount, unit }));
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <h2>Изменить продукт #{props.meal.id} ({props.meal.name})</h2>
        <Field placeholder='Продукт' value={name} onChange={(e) => setName(e.target.value)} required />
        <Field placeholder='Количество' value={amount} onChange={(e) => setAmount(e.target.value)} type='number' />
        <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option>гр.</option>
          <option>л.</option>
          <option>неисчисляемое</option>
        </Select>
        <ButtonAdd>Сохранить</ButtonAdd>
      </Form>
    </React.Fragment>
  );
}

export default EditMealForm;
