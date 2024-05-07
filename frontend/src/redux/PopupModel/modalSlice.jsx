import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  showSecondModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setShowSecondModal: (state, action) => {
      state.showSecondModal = action.payload;
    },
  },
});

export const { setShowModal, setShowSecondModal } = modalSlice.actions;
export default modalSlice.reducer;
