import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {add, edit, remove} from "../features/products/productsSlice";
import { Portal } from 'react-portal';
import {nanoid} from 'nanoid';

const Product = styled.div`
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
`

function ProductsList() {
  console.log(useStore().getState().products.value)
  //const products = useStore().getState().products.value;
  const products = useSelector((state) => state.products.value);
  const dispatch = useDispatch();

  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState({open: false, product: {}});

  const handleAdd = () => {
    setAddFormOpen(true);
  }
  const handleEdit = (product) => {
    //console.log(product);
    setEditFormOpen({open: false, product: {}});
    setEditFormOpen({open: true, product});
  }
  const handleDelete = (id) => {
    console.log(id);
    dispatch(remove(id));
  }

  return (
    <React.Fragment>
      {products.map((product) => {
        return <Product key={product.id}>
          <div>#{product.id} {product.name}</div>
          <Amount>{product.amount}&nbsp;{product.unit !== 'неисчисляемое' ? product.unit : ''}</Amount>
          <Available>{product.amount ? 'Есть' : 'Нет'}</Available>
          <ButtonEdit type='button' onClick={()=> handleEdit(product)}>✏️</ButtonEdit>
          <ButtonDelete type='button' onClick={()=> handleDelete(product.id)}>x</ButtonDelete>
        </Product>
      })}
      <ButtonAdd type='button' onClick={handleAdd}>Добавить +</ButtonAdd>
      {addFormOpen && <Portal><AddForm/></Portal>}
      {editFormOpen.open && <Portal><EditForm product={editFormOpen.product}/></Portal>}
    </React.Fragment>
  );
}

function AddForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState('гр.');

  const getCurrentDate = (separator='') => {
    let newDate = new Date();
    let time = newDate.getTime();
    /*let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();*/

    //return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}${separator}${time}`
    return time
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

function EditForm(props) {
  const dispatch = useDispatch(); // question
  //const productEdited = useSelector((state) => state.products.value);
  console.log(props.product)


  const [name, setName] = useState(props.product.name); // question
  const [amount, setAmount] = useState(props.product.amount);
  const [unit, setUnit] = useState(props.product.unit);
  console.log(name)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(edit({ id: props.product.id, timeCreate:  props.product.timeCreate, name, amount, unit }));
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <h2>Изменить продукт #{props.product.id} ({props.product.name})</h2>
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

export default ProductsList;
