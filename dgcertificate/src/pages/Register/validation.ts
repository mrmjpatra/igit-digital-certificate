export interface formType {
    name: string,
    gender: string,
    mobileNumber: number,
    emailId: string,
    registrationNumber: number,
    rollNumber: number,
    passingYear: number
}
export interface errorType {
    name: string,
    gender: string,
    mobileNumber: string,
    emailId: string,
    registrationNumber: string,
    rollNumber: string,
    passingYear: string
}
export const initialValues: formType = {
    name: '',
    gender: '',
    mobileNumber: 0,
    emailId: '',
    registrationNumber: 0,
    rollNumber: 0,
    passingYear: 0
}
export const validateForm = (values: formType) => {
    const errors: errorType = {
        name: '',
        gender: '',
        mobileNumber: '',
        emailId: '',
        registrationNumber: '',
        rollNumber: '',
        passingYear: ''
    };
    if (values.name.trim() === "") {
        errors.name = 'Name is required';
    } else if (values.name === 'undefined' || values.name === null) {
        errors.name = "Enter the Name"
    }else{
        errors.name = '';
    }
    if (values.mobileNumber.toString() === "") {
        errors.mobileNumber = 'Mobile Number is required';
    } else{
        errors.mobileNumber = '';
    }

    if (values.registrationNumber === 0) {
        errors.registrationNumber = "Enter Your Registration Number";
    } else if ((values.registrationNumber.toString().length) < 5) {
        errors.registrationNumber = "Enter valid Registration Number";
    }else{
        errors.registrationNumber = '';
    }
    if (values.rollNumber === 0) {
        errors.rollNumber = "Enter Your Registration Number";
    } else if ((values.rollNumber.toString().length) < 5) {
        errors.rollNumber = "Enter valid Registration Number";
    }else{
        errors.rollNumber = '';
    }
    if (values.passingYear === 0) {
        errors.passingYear = 'Enter passing Year';
    } else if (values.passingYear.toString().length < 4) {
        errors.passingYear = "Year must be 4 digit";
    }else{
        errors.passingYear = '';
    }
    return errors;
}