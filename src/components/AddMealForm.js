import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {add} from '../features/meals/mealsSlice';
import {nanoid} from 'nanoid';
import IngredientCheck from "./IngredientCheck";

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

function AddMealForm() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value);

  const [name, setName] = useState('');
  const [productsValue, setProductsValue] = useState({}); //{product.id: product.amount}
  // if id -> is checked

  let errors = {};

  const getCurrentDate = (separator = '') => {
    return Date.now();
  }

  const handleAddProduct = (e, id) => {
    e.preventDefault();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(productsValue)) {
      if (!Number(value)) {
        //{...errors, id: 'text'}
        errors[key] = 'Ошибка';
      }
    }
    console.log(errors)
    console.log(productsValue)

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) return;

    dispatch(add({
      id: nanoid(4),
      timeCreate: getCurrentDate(),
      name,
      /*products: Object.keys(productsValue).map((key)=> {
        return {id: key, requiredAmount: Number(productsValue[key])};
      })*/
      products: Object.entries(productsValue).map((key)=> {
        return {id: key[0], requiredAmount: Number(key[1])};
      })
    }));
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <h2>Добавить новое блюдо</h2>
        <Field placeholder='Блюдо' value={name} onChange={(e) => setName(e.target.value)} required/>
        <IngredientsList>
          {products.map((product) =>
            {
              console.log(Object.keys(errors))
              return (
                <IngredientCheck
                  key={product.id}
                  product={product}
                  checked={productsValue[product.id] !== undefined}
                  amountValue={productsValue[product.id] || ''}
                  errors={Object.keys(errors).indexOf(Number(product.id))}
                  onAmountChange={(amount)=> {
                    setProductsValue((productsValue)=> {
                      return {...productsValue, [product.id]: amount};
                    })
                  }}
                  onToogleCheck={() => {
                    setProductsValue((productsValue)=> {
                      return {...productsValue, [product.id]: '0'};
                    })
                  }}/>
              );
            }
          )}
        </IngredientsList>
        <ButtonAdd>Сохранить</ButtonAdd>
      </Form>
    </React.Fragment>
  );
}

export default AddMealForm;
