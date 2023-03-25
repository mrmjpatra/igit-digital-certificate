import { createSlice } from "@reduxjs/toolkit";

const initialState={
    open:false
};


const themeSlice=createSlice({
    name:"Theme",
    initialState,
    reducers:{
        setDrawerState:(state,action)=>{
            state.open=action.payload;
        },
    }
})

const themeReducer=themeSlice.reducer;
export default themeReducer;
export const {setDrawerState}=themeSlice.actions;
