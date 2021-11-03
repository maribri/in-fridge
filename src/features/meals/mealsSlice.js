import { createSlice } from '@reduxjs/toolkit';
import {CLEAR} from '../../app/store/actions';

const initialState = {
  value: [
    { id: '0', timeCreate: 1632253539470, name: 'Омлет', products: [{id: '0', requiredAmount: 3}, {id: '1', requiredAmount: 3}] },
    { id: '1', timeCreate: 1632253539471, name: 'Салат', products: [{id: '1', requiredAmount: 9}] },
    { id: '2', timeCreate: 1632253539474, name: 'Каша', products: [{id: '2', requiredAmount: 2}, {id: '0', requiredAmount: 2}] },
  ],
};

export const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    add: (state, action) => {
      //state.value
      return {...state, value: [...state.value, action.payload]}
    },
    edit: (state, action) => {
      console.log(action.payload);
      const newList = [...state.value];
      state.value[0] = action.payload;
      return false;
      //return {...state, value: [...state.value, action.payload]}
    },
    remove: (state, action) => {// question
      const newList = state.value.filter((item) => item.id !== action.payload);
      return { ...state, value: newList };
    }
  },
  extraReducers: {
    [CLEAR]: (state, action) => {
      return initialState;
    },
  },
});

export const { add, edit, remove } = mealsSlice.actions;

export default mealsSlice.reducer;
