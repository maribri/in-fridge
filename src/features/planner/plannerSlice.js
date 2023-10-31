import { createSlice } from '@reduxjs/toolkit';
import {CLEAR} from '../../app/store/actions';
import findAndReplace from "../../utils/findAndReplace";

const initialState = {
  value: [
    { id: '0', timeCreate: 1632253539470, date: 1639256400000, set: 'breakfast', meals: ['0','1','2'] },
    { id: '1', timeCreate: 1632253539470, date: 1639256400000, set: 'lunch', meals: ['3','2','2'] },
    { id: '2', timeCreate: 1632253539470, date: 1639256400000, set: 'dinner', meals: ['0','1','2'] },
    { id: '3', timeCreate: 1632253539470, date: 1639342800000, set: 'dinner', meals: ['2','0','2'] },
    { id: '4', timeCreate: 1632253539470, date: 1639602000000, set: 'breakfast', meals: ['0','0','2'] },
    { id: '5', timeCreate: 1632253539470, date: 1639688400000, set: 'breakfast', meals: ['0','0','2'] },
    { id: '6', timeCreate: 1632253539470, date: 1639688400000, set: 'dinner', meals: ['0','0','2'] },
  ],
};

export const plannerSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    add: (state, action) => {
      //state.value
      console.log(action.payload)
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
