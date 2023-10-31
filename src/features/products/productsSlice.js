import { createSlice } from '@reduxjs/toolkit';
import findAndReplace from '../../utils/findAndReplace';
import {CLEAR} from '../../app/store/actions';

const initialState = {
  value: [
    { id: '0', timeCreate: 1632253539471, name: 'Bread', amount: 500, unit: 'g.' },
    { id: '1', timeCreate: 1632253539470, name: 'Milk', amount: 1.5, unit: 'ml.' },
    /*{ id: '2', timeCreate: 1632253539487, name: 'Kefir', amount: 800, unit: 'ml.' },
    { id: '3', timeCreate: 1632253539377, name: 'Yogurt', amount: 800, unit: 'g.' },
    { id: '4', timeCreate: 1632253539474, name: 'Butter', amount: 800, unit: 'g.' },
    { id: '5', timeCreate: 1632253539417, name: 'Cottage cheese', amount: 800, unit: 'g.' },*/
    { id: '6', timeCreate: 1632253539473, name: 'Salmon', amount: 800, unit: 'g.' },
    { id: '7', timeCreate: 1632253539274, name: 'Potato', amount: 300, unit: 'g.' },
    { id: '8', timeCreate: 1632253539473, name: 'Tomato', amount: 800, unit: 'g.' },
    { id: '9', timeCreate: 1632253539476, name: 'Cucumbers', amount: 800, unit: 'g.' },
    /*{ id: '10', timeCreate: 1632253539457, name: 'Carrot', amount: 800, unit: 'g.' },*/
    { id: '11', timeCreate: 1632253539476, name: 'Onions', amount: 800, unit: 'g.' },
    { id: '12', timeCreate: 1632253539379, name: 'Eggs', amount: 800, unit: 'pc.' },
    { id: '13', timeCreate: 1632253539435, name: 'Rice', amount: 800, unit: 'g.' },
    { id: '14', timeCreate: 1632253539477, name: 'Avocado', amount: 800, unit: 'g.' },
  ],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    add: (state, action) => {
      //state.value
      console.log(state.value)
      return {...state, value: [...state.value, action.payload]}
    },
    edit: (state, action) => {
      const newList = findAndReplace(state.value, (item)=> action.payload.id === item.id, action.payload);
      return { ...state, value: newList };

      //const newList = [...state.value];
      //state.value[0] = action.payload;
      //return {...state, value: [...state.value, action.payload]}
    },
    remove: (state, action) => {// question
      const newList = state.value.filter((item) => item.id !== action.payload);
      return { ...state, value: newList };
    },
  },
  extraReducers: {
    [CLEAR]: (state, action) => {
      return initialState;
    },
  },
});

export const { add, edit, remove } = productsSlice.actions;

export default productsSlice.reducer;
