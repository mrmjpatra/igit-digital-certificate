import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
    const navigate=useNavigate();
    return (
        <FooterContainer>
            <Container>
                <Item1>
                    <HeadContainer>
                        <Head>
                            <img src="https://firebasestorage.googleapis.com/v0/b/igitcertificate.appspot.com/o/assets%2FWhatsApp%20Image%202024-04-18%20at%202.00.05%20PM.jpeg?alt=media&token=70f9f97f-fbca-43b2-b84f-c48d8a0c8575" alt="" />
                            <hr />
                            <Stack justifyContent={'center'}>
                                <h1>Digital Certificate</h1>
                                <h6>Secure Certificate Download Platform</h6>
                            </Stack>
                        </Head>
                        <p>
                            The platform will allow students to access and download their certificates from the college's database with ease. To ensure security and prevent unauthorised access, the platform will require students to log in using their unique student identification numbers and passwords.
                        </p>
                        <Social>
                            <h2>Follow Us</h2>
                            <Stack direction={'row'} gap={2} marginTop={1}>
                                <Facebook color='info' />
                                <Twitter color='primary' />
                                <LinkedIn color='primary' />
                                <Instagram color='error' />
                            </Stack>
                        </Social>
                    </HeadContainer>
                </Item1>
                <Item2>
                    <Stack>
                        <a href='/'>Home</a>
                        <a href='/about'>About</a>
                        <a href='/contact'>Contact</a>
                    </Stack>
                    <Stack gap={2} marginLeft={4}>
                        <Button variant='outlined' color='warning' onClick={()=>navigate('/login')} >Sign In</Button>
                        <Button variant='outlined' color='success' onClick={()=>navigate('/register')} >Sign Up</Button>
                    </Stack>
                </Item2>
            </Container>
            <FooterBottom>
                <hr />
                <p>Website designed & developed by Priyanka Mohanty</p>

            </FooterBottom>
        </FooterContainer>
    )
}

export default Footer;

const FooterContainer = styled.div`
    background-color: #071A2B;
    color: white;
    padding: 1rem 0;
`;
const Container = styled.div`
    margin: 0 5rem;
    padding: 1rem 1rem 0 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media screen and (max-width: 820px) {
        grid-template-columns: 1fr 1fr;
        margin: 0;
    }
    @media screen and (max-width: 780px) {
        grid-template-columns: 1fr;
        margin: 0;
    }
    
`;


const Item1 = styled.div`
    
`;
const HeadContainer = styled.div`
    p{
        line-height: 1.28rem;
        margin-top: 1rem;
        text-align: justify;
        font-size: .9rem;
        color: #c3c1c1;
    }
    
    `
const Head = styled.div`
    img{
        background-color: #ffffff;
    }
    display: flex;
    hr{
        border: 1px solid white;
        margin: 0 6px;
    }
    `
const Social = styled.div`
    margin: 2rem 0 2rem 0;
`;
const Item2 = styled.div`
    display: flex;
    justify-content: center;
    width: 52%;
    margin: 0 auto 0 auto;
    padding: 2rem 1rem 0 1rem;
    line-height: 2rem;
    a{
        display: block;
        text-decoration: none;
        color: white;
        &:hover{
            color: #a2a2a2;
        }
    } 
    @media screen and (max-width: 820px) {
        width: 100%;
        padding: 0;
        justify-content: space-evenly;
    }   
    @media screen and (max-width: 780px) {
        width: 100%;
        padding: 0;
        justify-content: space-evenly;
    }
    
`;
const FooterBottom=styled.div`
        width: 88%;
        margin:auto;
        p{
            margin-top:.7rem;
            color: #cdc9c9;
            
        }
`;