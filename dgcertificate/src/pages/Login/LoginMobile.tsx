import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const LoginMobile = () => {
    const [mobile, setMobile] = useState('');
    const handleMobileLogin=()=>{
            console.log(mobile)
    }
    return (
        <div className='login__mobile'>
            <TextField required label="Mobile Number" name='mobileNumber' onChange={(e)=>setMobile(e.target.value)} fullWidth size='small' />
            <Typography color='primary' variant='subtitle2' marginTop='10px'>Enter your registered Mobile number</Typography>
            <div className="login__btn">
                <Button type='submit' onClick={handleMobileLogin} variant='contained' size='large' color='success' fullWidth>Login</Button>
            </div>
        </div>
    )
}

export default LoginMobile