import { createSlice } from "@reduxjs/toolkit";

interface stateType{
    emailVerified:boolean,
    isAnonymous: boolean,
    phoneNumber:string
    uid:string,
}
const initialState:stateType={
    emailVerified: false,
    isAnonymous: false,
    phoneNumber: "",
    uid: "",
}

const mobileSlice=createSlice({
    name:'MobileAuth',
    initialState:()=>{
        const localAuth=localStorage.getItem('mobileAuth');
        if (localAuth===null) {
            return initialState;
        }
        const load:stateType=JSON.parse(localAuth);
        const {emailVerified,isAnonymous,phoneNumber,uid}=load;
        return {
            emailVerified,isAnonymous,phoneNumber,uid
        };
    },
    reducers:{
        setAtLogin:(state,action)=>{
            const {emailVerified,isAnonymous,phoneNumber,uid}=action.payload;
            localStorage.setItem('mobileAuth',JSON.stringify({emailVerified,isAnonymous,phoneNumber,uid}));
            state.emailVerified=emailVerified;
            state.isAnonymous=isAnonymous;
            state.phoneNumber=phoneNumber;
            state.uid=uid;
        },
        resetAtLogoutMobile:(state)=>{
            state=initialState;
            localStorage.removeItem('mobileAuth');
        }
    }
});

export const mobileReducer=mobileSlice.reducer;
export const {setAtLogin,resetAtLogoutMobile}=mobileSlice.actions