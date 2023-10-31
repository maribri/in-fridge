import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {remove} from '../features/meals/mealsSlice';
import {Portal} from 'react-portal';
import AddMealForm from './AddMealForm';
import Modal from './Modal';
import {SORTING} from '../app/constants';

const Meal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid limegreen;
  background-color: darkseagreen;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
`
const Amount = styled.span`
  margin-left: auto;
  margin-right: 2rem;
`
const Available = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.8rem;
  height: 1.4rem;
  border-radius: 9px;
  border: 1px solid green;
`
const Ingredients = styled.ul`
  list-style: none;
  width: 35%;
  font-size: 0.9rem;
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
const ButtonEdit = styled.button`
  appearance: none;
  border: 0;
  background-color: green;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 1.3rem;
  height: 1.3rem;
  margin-left: 1rem;
`
const ButtonDelete = styled.button`
  appearance: none;
  border: 0;
  background-color: red;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 1.3rem;
  height: 1.3rem;
  margin-left: 1rem;
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

function MealsList() {
  //console.log(useStore().getState().meals.value)
  const meals = useSelector((state) => state.meals.value);
  const products = useSelector((state) => state.products.value);
  const dispatch = useDispatch();

  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState({open: false, meal: {}});
  const [sorting, setSorting] = useState(SORTING.DATE_DESC);

  const handleAdd = () => {
    setAddFormOpen(true);
  }
  const handleEdit = (meal) => {
    setEditFormOpen({open: true, meal});
  }
  const handleDelete = (id) => {
    dispatch(remove(id));
  }
  const handleClose = () => {
    setAddFormOpen(false);
    setEditFormOpen({open: false, meal: {}});
  }

  return (
    <React.Fragment>
      <Select value={sorting} onChange={(e) => setSorting(e.target.value)}>
        <option value={SORTING.DATE_DESC}>By date ↓</option>
        <option value={SORTING.DATE_ASC}>By date ↑</option>
        <option value={SORTING.NAME_DESC}>By name ↓</option>
        <option value={SORTING.NAME_ASC}>By name ↑</option>
      </Select>
      {[...meals].sort((a,b)=>{
        switch (sorting) {
          case SORTING.NAME_DESC:
            return a.name.localeCompare(b.name);
          case SORTING.NAME_ASC:
            return b.name.localeCompare(a.name);
          case SORTING.DATE_DESC:
            return b.timeCreate - a.timeCreate;
          case SORTING.DATE_ASC:
            return a.timeCreate - b.timeCreate;
          default:
            return 0;
        }
      }).map((meal) => {
        return <Meal key={meal.id}>
          <div><small>#{meal.id}</small> {meal.name}</div>
          <Amount>{/*meal.unit !== 'неисчисляемое' ? meal.unit : ''*/}</Amount>
          <Ingredients>
            {meal.products.map((product) => <MealProduct key={product.id} product={products.find((item)=> product.id===item.id)} requiredAmount={product.requiredAmount} />)}
          </Ingredients>
          <ButtonEdit type='button' onClick={()=> handleEdit(meal)}>✏️</ButtonEdit>
          <ButtonDelete type='button' onClick={()=> handleDelete(meal.id)}>x</ButtonDelete>
        </Meal>
      })}
      <ButtonAdd type='button' onClick={handleAdd}>Add +</ButtonAdd>
      {addFormOpen && <Modal handleClose={handleClose}><AddMealForm/></Modal>}
      {editFormOpen.open && <Modal handleClose={handleClose}><AddMealForm edit={true} key={editFormOpen.meal.id} meal={editFormOpen.meal}/></Modal>}
    </React.Fragment>
  );
}

function MealProduct(props) {
  return (
    <li>
      {props.product ? (
        <>
          <small>#{props.product.id}</small> {props.product.name} x {props.requiredAmount}&nbsp;{props.product.unit}
        </>
      ) : (
        'Loading...'
      )}
    </li>
  );
}

export default MealsList;
