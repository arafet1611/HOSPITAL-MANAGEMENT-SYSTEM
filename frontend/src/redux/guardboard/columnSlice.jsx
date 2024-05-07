import { createSlice } from "@reduxjs/toolkit";

export const columnSlice = createSlice({
  name: "columns",
  initialState: {
    columnsData: [] 
  },
  reducers: {
    updateColumnsData: (state, action) => {
      state.columnsData = action.payload;
    },
    addColumns: (state, action) => {
      state.columnsData = action.payload; 
    }
  }
});

export const { updateColumnsData , addColumns  } = columnSlice.actions;
export default columnSlice.reducer;
