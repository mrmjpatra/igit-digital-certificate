import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import LoginEmail from './LoginEmail';
import LoginMobile from './LoginMobile';

const Login = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className='loginContainer'>
      <div className='logo'>
        <img src="https://igitsarang.ac.in/assets/frontend//images/logo.png" alt="" />
        <hr />
        <p>Digital Certificate</p>
      </div>
      <div className='loginForm'>
        <Typography>Sign In to your account!</Typography>
        <div className="login__switch__btn">
          <Button variant={isClicked === true ? 'contained' : 'outlined'}
            onClick={() =>{
              setIsClicked(true);
            }}
          >Google</Button>
          <Button variant={isClicked === false ? 'contained' : 'outlined'}
            onClick={() =>{
              setIsClicked(prev => !prev)
            } }>Mobile</Button>
        </div>
        <div className='login__content__render'>
            {
              isClicked? (
                <>
                  <LoginEmail/>
                </>
              ):(
                <>
                <LoginMobile/>
                  
                </>
              )
            }
        </div>
      </div>
      <p className='already'>Do not have an account? 
        <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  )
}

export default Login;


