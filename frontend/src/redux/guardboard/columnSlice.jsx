import { createSlice } from "@reduxjs/toolkit";

export const columnSlice = createSlice({
  name: "columns",
  initialState: {
    columnsData: [] // Initialize columnsData as an empty array
  },
  reducers: {
    addColumns: (state, action) => {
      state.columnsData = action.payload; // Update columnsData with the payload
    }
  }
});

export const { addColumns } = columnSlice.actions;
export default columnSlice.reducer;
