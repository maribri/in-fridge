import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {add} from '../features/products/productsSlice';
import {nanoid} from 'nanoid';

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

function AddProductForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState('гр.');

  const getCurrentDate = (separator='') => {
    return Date.now();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add({ id: nanoid(4), timeCreate: getCurrentDate(), name, amount, unit }));
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <h2>Добавить новый продукт</h2>
        <Field placeholder='Продукт' value={name} onChange={(e) => setName(e.target.value)} required />
        <Field placeholder='Количество' value={amount} onChange={(e) => setAmount(e.target.value)} type='number' />
        <Select onChange={(e) => setUnit(e.target.value)}>
          <option>гр.</option>
          <option>л.</option>
          <option>неисчисляемое</option>
        </Select>
        <ButtonAdd>Сохранить</ButtonAdd>
      </Form>
    </React.Fragment>
  );
}

export default AddProductForm;
