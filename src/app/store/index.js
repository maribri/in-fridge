import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import productsReducer from '../../features/products/productsSlice';
import mealsReducer from '../../features/meals/mealsSlice';
import plansReducer from '../../features/planner/plannerSlice';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'products',
  storage,
};

const reducers = combineReducers({
  counter: counterReducer,
  products: productsReducer,
  meals: mealsReducer,
  plans: plansReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const index = configureStore({
  /*reducer: {
    counter: counterReducer,
    products: productsReducer,
    meals: mealsReducer,
  },*/
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
