import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbar/NavbarSlice';
import columnReducer from "./guardboard/columnSlice";
import rowReducer from "./guardboard/rowSlice";
import datesReducer from "./guardboard/datesSlice";
import modalReducer from "./PopupModel/modalSlice";

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    columns: columnReducer,
    rows: rowReducer,
    dates: datesReducer,
    modal :  modalReducer


  },
});

export default store;