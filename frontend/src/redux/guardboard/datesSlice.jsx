import { createSlice } from "@reduxjs/toolkit";

const datesSlice = createSlice({
  name: "dates",
  initialState: [],
  reducers: {
    setDates(state, action) {
      return action.payload;
    },
  },
});

export const { setDates } = datesSlice.actions;
export default datesSlice.reducer;