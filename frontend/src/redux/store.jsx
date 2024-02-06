import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbar/NavbarSlice';

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
  },
});

export default store;