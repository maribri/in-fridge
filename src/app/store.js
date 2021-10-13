import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productsReducer from '../features/products/productsSlice';
import mealsReducer from '../features/meals/mealsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    meals: mealsReducer,
  },
});
