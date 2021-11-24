import { createSlice } from '@reduxjs/toolkit';
import findAndReplace from '../../utils/findAndReplace';
import {CLEAR} from '../../app/store/actions';

const initialState = {
  value: [
    { id: '0', timeCreate: 1632253539471, name: 'Хлеб', amount: 500, unit: 'г.' },
    { id: '1', timeCreate: 1632253539470, name: 'Молоко', amount: 1.5, unit: 'л.' },
    /*{ id: '2', timeCreate: 1632253539487, name: 'Кефир', amount: 800, unit: 'л.' },
    { id: '3', timeCreate: 1632253539377, name: 'Йогурт', amount: 800, unit: 'г.' },
    { id: '4', timeCreate: 1632253539474, name: 'Масло сливочное', amount: 800, unit: 'г.' },
    { id: '5', timeCreate: 1632253539417, name: 'Творог', amount: 800, unit: 'г.' },
    { id: '6', timeCreate: 1632253539473, name: 'Лосось', amount: 800, unit: 'г.' },
    { id: '7', timeCreate: 1632253539274, name: 'Картофель', amount: 300, unit: 'г.' },*/
    { id: '8', timeCreate: 1632253539473, name: 'Помидоры', amount: 800, unit: 'г.' },
    { id: '9', timeCreate: 1632253539476, name: 'Огурцы', amount: 800, unit: 'г.' },
    /*{ id: '10', timeCreate: 1632253539457, name: 'Морковь', amount: 800, unit: 'г.' },
    { id: '11', timeCreate: 1632253539476, name: 'Лук репчатый', amount: 800, unit: 'г.' },*/
    { id: '12', timeCreate: 1632253539379, name: 'Яйца', amount: 800, unit: 'шт.' },
    /*{ id: '13', timeCreate: 1632253539435, name: 'Рис', amount: 800, unit: 'г.' },
    { id: '14', timeCreate: 1632253539477, name: 'Авокадо', amount: 800, unit: 'г.' },*/
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
