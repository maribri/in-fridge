import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {edit} from '../features/meals/mealsSlice';
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

function EditMealForm(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value);

  const [name, setName] = useState(props.meal.name);
  const [productsValue, setProductsValue] = useState(props.meal.products); //{product.id: product.amount}
  const [errors, setErrors] = useState({});

  console.log(33, props.meal.products)

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    //debugger;
    for (const [key, value] of Object.entries(productsValue)) {
      if (!Number(value)) {
        //{...errors, id: 'text'}
        errors[key] = 'Ошибка не заполнено';
      } else if ((Number(value) < 0)) {
        errors[key] = 'Ошибка отрицательное';
      }
    }
    setErrors(errors);
    //console.log(productsValue)

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) return;

    dispatch(edit({
      id: props.meal.id,
      timeCreate:  props.meal.timeCreate,
      name,
      products,
      //products: Object.entries(productsValue).map((key)=> {
      //         return {id: key[0], requiredAmount: Number(key[1])};
      //       })
    }));
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <h2>Изменить блюдо #{props.meal.id} ({props.meal.name})</h2>
        <Field placeholder='Блюдо' value={name} onChange={(e) => setName(e.target.value)} required/>
        <IngredientsList>
          {products.map((product) =>
            {
              console.log(productsValue, Object.keys(productsValue).indexOf(product.id), product.id);
              return (
                <IngredientCheck
                  key={product.id}
                  product={product}
                  //checked={productsValue[product.id] !== undefined}
                  checked={Object.keys(productsValue).indexOf(product.id) >= 0}
                  amountValue={productsValue[product.id] ? productsValue[product.id].requiredAmount : ''}
                  errors={errors[product.id]}
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

export default EditMealForm;
