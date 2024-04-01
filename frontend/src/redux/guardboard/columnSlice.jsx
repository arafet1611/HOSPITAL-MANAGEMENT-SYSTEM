import { createSlice } from "@reduxjs/toolkit";

export const columnSlice = createSlice({
  name: "columns",
  initialState: [],
  reducers: {
    addColumns: (state, action) => {
      return action.payload;
    }
  }
});

export const { addColumns } = columnSlice.actions;
export default columnSlice.reducer;
