import { createSlice } from "@reduxjs/toolkit";

interface stateType {
    isLoggedIn: boolean,
    isVerifyed: boolean,
    mobileLogin:boolean
}
const initialState: stateType = {
    isLoggedIn: false,
    isVerifyed: false,
    mobileLogin:false
}
const authSlice = createSlice({
    name: 'Auth',
    initialState: () => {
        const localLoginCheck = localStorage.getItem('isLoggedIn');
        const localVerificationData = localStorage.getItem('isVerifyed');
        if (localLoginCheck === null) {
            localStorage.setItem("isLoggedIn", "false");
            return initialState;
        } return {
            isLoggedIn: localLoginCheck === "true",
            isVerifyed: localVerificationData === "true",
            mobileLogin:false
        }
    },
    reducers: {
        userLoggedIn: (state) => {
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", "true");
        },
        loginType:(state)=>{
            state.mobileLogin=true;
        }
        ,
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
            localStorage.clear();
            localStorage.setItem("isLoggedIn", "false");
            localStorage.setItem("isVerifyed", "false");
        },
        userVerifyed: (state) => {
            state.isVerifyed = true;
            localStorage.setItem("isVerifyed", "true");
        },
    }
});

export const authReducer = authSlice.reducer;
export const { userLoggedIn,loginType, userVerifyed, userLoggedOut } = authSlice.actions
