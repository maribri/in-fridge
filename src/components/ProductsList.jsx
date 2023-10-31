import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {remove} from '../features/products/productsSlice';
import {Portal} from 'react-portal';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import Modal from './Modal';
import {SORTING} from '../app/constants';

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
const Select = styled.select`
  margin-bottom: 0.8rem;
  padding: 0.3rem;
  min-width: 30%;
  font-size: 16px;
  background-color: yellowgreen;
  border-color: forestgreen;
  border-radius: 6px;
`

function ProductsList() {
  console.log(useStore().getState().products.value)
  //const products = useStore().getState().products.value;
  const products = useSelector((state) => state.products.value);
  const dispatch = useDispatch();

  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState({open: false, product: {}});
  const [sorting, setSorting] = useState(SORTING.DATE_DESC);

  const handleAdd = () => {
    setAddFormOpen(true);
  }
  const handleEdit = (product) => {
    setEditFormOpen({open: true, product});
  }
  const handleDelete = (id) => {
    dispatch(remove(id));
  }
  const handleClose = () => {
    setAddFormOpen(false);
    setEditFormOpen({open: false, product: {}});
  }

  return (
    <React.Fragment>
      <Select value={sorting} onChange={(e) => setSorting(e.target.value)}>
        <option value={SORTING.DATE_DESC}>By date ↓</option>
        <option value={SORTING.DATE_ASC}>By date ↑</option>
        <option value={SORTING.NAME_DESC}>By name ↓</option>
        <option value={SORTING.NAME_ASC}>By name ↑</option>
      </Select>
      {[...products].sort((a,b)=>{
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
      }).map((product) => {
        return <Product key={product.id}>
          <div><small>#{product.id}</small> {product.name} date {product.timeCreate}</div>
          <Amount>{product.amount}&nbsp;{product.unit !== 'uncountable' ? product.unit : ''}</Amount>
          <Available>{product.amount ? 'Yes' : 'No'}</Available>
          <ButtonEdit type='button' onClick={()=> handleEdit(product)}>✏️</ButtonEdit>
          <ButtonDelete type='button' onClick={()=> handleDelete(product.id)}>x</ButtonDelete>
        </Product>
      })}
      <ButtonAdd type='button' onClick={handleAdd}>Add +</ButtonAdd>
      {addFormOpen && <Modal handleClose={handleClose}><AddProductForm/></Modal>}
      {editFormOpen.open && <Modal handleClose={handleClose}><EditProductForm key={editFormOpen.product.id} product={editFormOpen.product}/></Modal>}
    </React.Fragment>
  );
}

export default ProductsList;
