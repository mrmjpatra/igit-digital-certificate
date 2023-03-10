import { Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate();
  return (
    <Paper elevation={3} style={{position:'fixed',width:'100%',top:'0',zIndex:'100'}} square>
      <HeaderContainer >
        <Logo>
          <img src="https://igitsarang.ac.in/assets/frontend//images/logo.png" alt="" />
          <Typography >Digital Certificate</Typography>
        </Logo>

        <LoginSign>
          <Button variant='text' onClick={()=>navigate('/login')} >SIGN IN</Button>
          <hr style={{ border: '1.3px solid rgb(98, 97, 97)' }} />
          <Button variant='contained' style={{ borderRadius: '1.5rem' }} onClick={()=>navigate('/register')} >SIGN UP</Button>
        </LoginSign>
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

