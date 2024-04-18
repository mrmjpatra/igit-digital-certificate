import { Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { userLoggedOut } from '../../state/Auth/sliceAuth';
import { emptyValue } from '../../state/User/user-slice';
import { resetAtLogoutMobile } from '../../state/MobileAuth/sliceMobile';
import { resetAtLogout } from '../../state/GoogleData/sliceGoogle';
import { auth } from '../../firebase/firebase-config';
import { signOut } from 'firebase/auth';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const typeLogin = useAppSelector(state => state.auth.mobileLogin);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const handleLogOut = () => {
    if (!typeLogin) {
      dispatch(resetAtLogout());
      signOut(auth).then(() => {
      }).catch((error) => {
        console.log("Error while logout")
        console.log(error);
      })
    } else {
      dispatch(resetAtLogoutMobile());
    }
    dispatch(emptyValue());
    dispatch(userLoggedOut());
    navigate('/');
  }
  return (
    <Paper elevation={3} style={{ position: 'fixed', width: '100%', top: '0', zIndex: '100' }} square>
      <HeaderContainer >
        <Link to='/'>
          <Logo>
            <img src="https://firebasestorage.googleapis.com/v0/b/igitcertificate.appspot.com/o/assets%2FWhatsApp%20Image%202024-04-18%20at%202.00.05%20PM.jpeg?alt=media&token=70f9f97f-fbca-43b2-b84f-c48d8a0c8575" alt="" />
            <Typography >Digital Certificate</Typography>
          </Logo>
        </Link>

        {
          isLoggedIn ?
            <>
              <LoginSign>
                <Button variant='text' onClick={handleLogOut} >Logout</Button>
              </LoginSign>
            </> :
            <>
              <LoginSign>
                <Button variant='contained' style={{borderRadius:'3rem'}} onClick={() => navigate('/login')} >SIGN IN</Button>
              </LoginSign>
            </>
        }

      </HeaderContainer>
    </Paper>
  )
}

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem 1rem;
  p{
    color: black;
  }

  @media screen and (max-width: 780px)  {
      justify-content: space-evenly;
      padding: 10px 0;
  }
`;
const Logo = styled.div`
    margin-left: 3rem;
    display: flex;
    align-items: center;
    p{
      margin-left: 1rem;
      font-size: 2rem;
      font-weight: 800;
    }
      img{
        width: 3rem;
        height: 3rem;
      }
      @media screen and (max-width: 780px)  {
        margin-left: 0;
          p{
            margin: 0;
            margin-left: 10px;
            font-size: 1rem;
            font: 100;
          }
          img{
            width: 2rem;
            height: 2rem;
          }
        
      }

`;
const LoginSign = styled.div`
  display: flex;
  button{
    margin-left: .3rem;
  }
`;

