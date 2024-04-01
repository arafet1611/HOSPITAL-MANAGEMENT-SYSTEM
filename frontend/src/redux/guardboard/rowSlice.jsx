import { createSlice } from "@reduxjs/toolkit";

export const rowSlice = createSlice({
  name: "rows",
  initialState: [],
  reducers: {
    addRows: (state, action) => {
      return action.payload;
    }
  }
});

export const { addRows } = rowSlice.actions;
export default rowSlice.reducer