import { createSlice } from "@reduxjs/toolkit";
import { SubmittedFormType } from "../../pages/Register/validation";
const initialState:SubmittedFormType={
    name:'',
    emailId:'',
    mobileNumber:'',
    branch:'',
    regdNo:'',
    rollNo:'',
    passYear:'',
    gender:'',
    verifyed:false,
   
};

const userSlice=createSlice({
    name:'User',
    initialState:()=>{
        const localUser=localStorage.getItem('UserAuth');
        if (localUser===null) {
            return initialState;
        }
        const userData:SubmittedFormType=JSON.parse(localUser);
        const {name,emailId,mobileNumber,branch,regdNo,rollNo,passYear,gender,verifyed}=userData;
        return{
            name,
            emailId,
            mobileNumber,
            branch,
            regdNo,
            rollNo,
            passYear,
            gender,
            verifyed,
        };
    },
    reducers:{
        setUserDetails:(state,action)=>{
            const{name,emailId,mobileNumber,branch,regdNo,rollNo,passYear,gender,verifyed}=action.payload;
            localStorage.setItem('UserAuth',JSON.stringify({name,emailId,mobileNumber,branch,regdNo,rollNo,passYear,gender,verifyed}));
            state.name=name;
            state.emailId=emailId;
            state.mobileNumber=mobileNumber;
            state.branch=branch;
            state.regdNo=regdNo;
            state.rollNo=rollNo;
            state.passYear=passYear;
            state.gender=gender;
            state.verifyed=verifyed
        },
        setCertificateValue:(state,action)=>{

        },
        emptyValue: (state) => {
            state = initialState;
            localStorage.removeItem("UserAuth");
        },
    }
})

const userReducer=userSlice.reducer;
export default userReducer;
export const {setUserDetails,emptyValue}=userSlice.actions