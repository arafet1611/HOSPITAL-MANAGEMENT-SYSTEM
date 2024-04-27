import { createSlice } from "@reduxjs/toolkit";

export const rowSlice = createSlice({
  name: "rows",
  initialState: {
    rowsData: [] 
  },  reducers: {
    addRows: (state, action) => {
      state.rowsData = action.payload;
    }
  }
});

export const { addRows } = rowSlice.actions;
export default rowSlice.reducer