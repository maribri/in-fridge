import { createSlice } from '@reduxjs/toolkit';
import {CLEAR} from '../../app/store/actions';
import findAndReplace from "../../utils/findAndReplace";

const initialState = {
  value: [
    { id: '0', timeCreate: 1632253539470, date: 1636059600000, set: 'завтрак', meals: ['0','2','2'] },
    { id: '1', timeCreate: 1632253539470, date: 1636059600000, set: 'обед', meals: ['2','2','2'] },
    { id: '2', timeCreate: 1632253539470, date: 1632253539470, set: 'ужин', meals: ['0','0','2'] },
  ],
};

export const plannerSlice = createSlice({
  name: 'plans',
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

export const { add, edit, remove } = plannerSlice.actions;

export default plannerSlice.reducer;
