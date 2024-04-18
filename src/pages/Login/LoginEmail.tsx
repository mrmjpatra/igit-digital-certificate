import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase-config';
import { userLoggedIn } from '../../state/Auth/sliceAuth';
import { setAtLogin } from '../../state/GoogleData/sliceGoogle';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import LoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress } from '@mui/material';
import { HourglassBottom } from '@mui/icons-material';

const LoginEmail = () => {
    const [isLoading, setIsLoading] = useState(false);
    //state variabel
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const isVerifyed = useAppSelector((state) => state.auth.isVerifyed);
    const dispatch = useAppDispatch()
    //google sign in provider
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const signWithGoogle = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;
            const { displayName, emailVerified, isAnonymous, photoURL, email, uid } = result.user;
            dispatch(userLoggedIn())
            dispatch(setAtLogin({
                accessToken,
                displayName,
                emailVerified,
                isAnonymous,
                photoURL,
                email,
                uid,
            }));
            setIsLoading(false);
            navigate('/register');
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (isLoggedIn && isVerifyed) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, []);

    if (isLoading) {
        return <div className='login__email'>
            <LoadingButton loading variant="outlined" loadingPosition='center' loadingIndicator={<HourglassBottom/>} color='secondary'>
                Submit
            </LoadingButton>
        </div>
    } else {
        return (
            <div className='login__email'>
                <div className="google-btn" onClick={signWithGoogle}>
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt='googleSignIn' />
                    </div>
                    <p className="btn-text"><b>Sign in with google</b></p>
                </div>
            </div>
        )
    }


}

export default LoginEmail