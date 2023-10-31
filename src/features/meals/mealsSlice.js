import { createSlice } from '@reduxjs/toolkit';
import {CLEAR} from '../../app/store/actions';
import findAndReplace from "../../utils/findAndReplace";

const initialState = {
  value: [
    { id: '0', timeCreate: 1632253539470, name: 'Omelette', products: [{id: '1', requiredAmount: 1}, {id: '12', requiredAmount: 3}] },
    { id: '1', timeCreate: 1632253539471, name: 'Salad', products: [{id: '8', requiredAmount: 400},{id: '9', requiredAmount: 400}] },
    { id: '2', timeCreate: 1632253539474, name: 'Porridge', products: [{id: '1', requiredAmount: 1.5}] },
    { id: '3', timeCreate: 1632253539484, name: 'Fried eggs', products: [{id: '12', requiredAmount: 4}, {id: '11', requiredAmount: 150}, {id: '8', requiredAmount: 500}] },
    { id: '4', timeCreate: 1632253539473, name: 'Poke', products: [{id: '13', requiredAmount: 300}, {id: '9', requiredAmount: 200}, {id: '6', requiredAmount: 150}, {id: '14', requiredAmount: 150}] },
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
      //state.value[0] = action.payload;
      return {value: findAndReplace(state.value, (item)=> item.id === action.payload.id, action.payload)};
      //return false;
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
