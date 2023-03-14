import { Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase/firebase-config';
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import './login.css'
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { loginType, userLoggedIn } from '../../state/Auth/sliceAuth';
import { setAtLogin } from '../../state/MobileAuth/sliceMobile';


const LoginMobile = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [final, setFinal] = useState<ConfirmationResult>();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isVerifyed = useAppSelector((state) => state.auth.isVerifyed);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if (isLoggedIn && isVerifyed) {
      navigate('/');
  } else {
      navigate('/login');
  }
  },[]);

  const sendOTP = () => {
    if(phoneNumber.startsWith('+91')){
      console.log("first")
      setPhoneNumber((phoneNumber.slice(3)));
    }
    let verify = new RecaptchaVerifier('recaptcha-container', {}, auth);
    signInWithPhoneNumber(auth, phoneNumber, verify)
      .then((result) => {
        setFinal(result);
        console.log("otp sent")
        setShow(true);
      }).catch((error) => {
        alert(error);
        window.location.reload()
      })
  }
  const verifyOTP = () => {
    if (otp === null || final === null || final === undefined) {
      return
    }
    final.confirm(otp).then((result) => {
      const { emailVerified, isAnonymous, phoneNumber, uid } = result.user;
      dispatch(userLoggedIn());
      dispatch(loginType());
      dispatch(setAtLogin({
        emailVerified,
        isAnonymous,
        phoneNumber,
        uid
      }));
      navigate('/register');
    }).catch((err) => {
      console.log(err);
      setError("Wrong OTP");
    })
  }


  return (
    <div className='login__mobile'>
      {/* Mobile Number */}
      <div className="phoneNumber" style={{ display: !show ? 'block' : 'none' }}>
        <TextField fullWidth size='small' placeholder='Mobile Number' name='phone' onChange={(e) => setPhoneNumber("+91" + e.target.value)} />
        <div id='recaptcha-container'></div>
        <div className="login__mobile__btn">
          <Button variant='contained' color='success' onClick={sendOTP}>Send OTP</Button>
        </div>
      </div>
      <div className="otpVerify" style={{ display: show ? "block" : "none" }}>
        <Typography color='GrayText' variant='subtitle1'>Enter the code we just send on your mobile {phoneNumber} </Typography>
        <TextField placeholder='Enter OTP' fullWidth size='small' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)} />
        {
          (error === '' || error === undefined) ? '' : (
            <Typography color='error' textAlign='center'>{error}</Typography>
          )
        }
        <div className="login__mobile__btn">
          <Button variant='outlined' color='success' onClick={verifyOTP} >Verify</Button>
        </div>
      </div>

    </div>
  )
}

export default LoginMobile