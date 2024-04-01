import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbar/NavbarSlice';
import columnReducer from "./guardboard/columnSlice";
import rowReducer from "./guardboard/rowSlice";
const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    columns: columnReducer,
    rows: rowReducer
  },
});

export default store;