import {FormikErrors, FormikValues} from 'formik';

export interface formType {
    name: string,
    gender: string,
    mobileNumber: number,
    emailId: string,
    registrationNumber: number,
    rollNumber: number,
    passingYear: number
}


export const validateForm = (values: FormikValues) => {
    let errors: FormikErrors<formType> ={};
    if (values.name.trim() === "") {
        errors.name = 'Name is required';
    } else if (values.name === 'undefined' || values.name === null) {
        errors.name = "Enter the Name"
    }
    
    if (values.mobileNumber.toString() === "") {
        errors.mobileNumber = 'Mobile Number is required';
    }else if(values.mobileNumber===0){
        errors.mobileNumber = 'Mobile Number can\'t be zero';
    }else if(values.mobileNumber.toString().length>10){
        errors.mobileNumber = 'Mobile Number must be of 10 digits';
    }

    if (values.registrationNumber === 0) {
        errors.registrationNumber = "Enter Your Registration Number";
    } else if ((values.registrationNumber.toString().length) < 5) {
        errors.registrationNumber = "Enter valid Registration Number";
    }
    if (values.rollNumber === 0) {
        errors.rollNumber = "Enter Your Roll Number";
    } else if ((values.rollNumber.toString().length) < 5) {
        errors.rollNumber = "Enter valid Roll Number";
    }
    if (values.passingYear === 0) {
        errors.passingYear = 'Enter passing Year';
    } else if (values.passingYear.toString().length > 4) {
        errors.passingYear = "Year must be 4 digit";
    }   
    return errors;
}

export interface placeHolder {
    displayName: string,
    email: string,
    phoneNumber: string
}

export interface SubmittedFormType{
    name:string,
    mobileNumber:string,
    emailId:string,
    regdNo:string,
    rollNo:string,
    passYear:string,
    gender:string
    verifyed:boolean
}