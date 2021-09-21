import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [
    { id: '0', timeCreate: 1632253539470, name: 'Молоко', amount: 1.5, unit: 'л.' },
    { id: '1', timeCreate: 1632253539471, name: 'Хлеб', amount: 500, unit: 'г.' },
  ],
};

export const productsSlice = createSlice({
  name: 'products',
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
  }
});

export const { add, edit, remove } = productsSlice.actions;

export default productsSlice.reducer;
