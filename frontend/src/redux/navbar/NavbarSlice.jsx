import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isNavbarSticky: true,
};

const navbarSlice = createSlice({
name: "navbar",
initialState,
reducers: {
    setNavbarSticky:(state , action) => {
        state.isNavbarSticky = action.payload;
       },
},
});
export const {setNavbarSticky} = navbarSlice.actions;

export default navbarSlice.reducer;