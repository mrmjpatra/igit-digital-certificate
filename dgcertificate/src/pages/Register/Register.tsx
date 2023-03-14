import './register.css';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { validateForm, initialValues, formType } from './validation'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../state/hooks';

const Register = () => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const typeLogin = useAppSelector(state => state.auth.mobileLogin);
    const googleLoginState = useAppSelector(state => state.google);
    const mobileLoginState = useAppSelector(state => state.mobile);
    interface placeHolder {
        displayName: string,
        email: string,
        phoneNumber: string
    }
    let initalFormValue: placeHolder = {
        displayName: '',
        email: '',
        phoneNumber: ''
    }

    if (!typeLogin) {
        const { displayName, email } = googleLoginState;
        initalFormValue = { ...initalFormValue, displayName, email };
    } else {
        initalFormValue = { ...initalFormValue, phoneNumber: mobileLoginState.phoneNumber }
    }

    console.log(typeLogin);
    const formik = useFormik({
        initialValues,
        validate(values: formType) {
            return validateForm(values);
        },
        onSubmit: (values) => {
            console.log(values)
        },
    });
    // console.log(formik.errors)   
    return (
        <div className='register__container' >
            <div className='logo'>
                <img src="https://igitsarang.ac.in/assets/frontend//images/logo.png" alt="" />
                <hr />
                <p>Digital Certificate</p>
            </div>
            <div className="register__form__container">
                <p>Creating account is fast and easy!</p>
                <FormControl fullWidth>
                    <form onSubmit={formik.handleSubmit}>
                        <dd className='input__field'><TextField required id="outlined-basic" size='small' fullWidth label="Full Name" variant="outlined" name='name' onChange={formik.handleChange}
                            error={!(formik.errors.name === undefined)}
                            helperText={formik.errors.name? formik.errors.name:''}  />
                        </dd>

                        <dd className='input__field'><TextField required id="outlined-basic" size='small' fullWidth label="Mobile Number" type='number' variant="outlined" name='mobileNumber' value={formik.values.mobileNumber} onChange={formik.handleChange} helperText={(formik.errors.mobileNumber === undefined || formik.errors.mobileNumber === '') ? '' : formik.errors.mobileNumber} error={!(formik.errors.mobileNumber === undefined)}
                            placeholder={initalFormValue.phoneNumber}
                            InputProps={{
                                readOnly: typeLogin ? true : false
                            }}
                        />
                        </dd>
                        <dd className='input__field'>
                            <TextField required id="outlined-basic" size='small' fullWidth label="Email ID" variant="outlined" type='email' name='emailId'
                                InputProps={{
                                    readOnly: !typeLogin ? true : false
                                }}
                                value={formik.values.emailId}
                                onChange={formik.handleChange}
                                error={!(formik.errors.emailId === undefined)} placeholder={initalFormValue.email}
                            />
                        </dd>
                        <dd className='input__field'><TextField required id="outlined-basic" size='small' fullWidth label="Registration Number" variant="outlined" type='number' name='registrationNumber' value={formik.values.registrationNumber} onChange={formik.handleChange} helperText={(formik.errors.registrationNumber === undefined || formik.errors.registrationNumber === '') ? '' : formik.errors.registrationNumber} error={!(formik.errors.registrationNumber === undefined)} />
                        </dd>
                        <dd className='input__field'><TextField required id="outlined-basic" size='small' fullWidth label="Roll Number" type='number' variant="outlined" name='rollNumber' value={formik.values.rollNumber} onChange={formik.handleChange} helperText={(formik.errors.rollNumber === undefined || formik.errors.rollNumber === '') ? '' : formik.errors.rollNumber}
                            error={!(formik.errors.rollNumber === undefined)}
                        />
                        </dd>
                        <dd className='input__field'><TextField required id="outlined-basic" size='small' fullWidth label="Passing Year" type='number' variant="outlined" name='passingYear' value={formik.values.passingYear} onChange={formik.handleChange} helperText={(formik.errors.passingYear === undefined || formik.errors.passingYear === '') ? '' : formik.errors.passingYear} error={!(formik.errors.passingYear === undefined)} />
                        </dd>
                        <dd className='input__field'>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="gender"
                                value={formik.values.gender} onChange={formik.handleChange}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </dd>
                        <LoadingButton
                            fullWidth
                            // loading
                            disabled={!(formik.isValid && formik.dirty)}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained" color='primary' type='submit' >Submit</LoadingButton>
                        <p className='policy'>By signing up, you agree to IGIT's Terms and Privacy Policy</p>
                    </form>
                </FormControl>
            </div>
            <p className='already'>Already have an account?
                <Link to='/login'> Sign In</Link>
            </p>
        </div >
    )
}

export default Register;
