import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TeamWork from '../../assets/teamwork.png'
import Certifcate from '../../assets/certificate.png';


const AboutProject = () => {
    return (
        <Container>
            <LeftContainer>
                <Content>
                    <h1> A Secure Certificate Download Platform for Colleges</h1>
                    <p>The digital solution proposed for downloading certificates for a college with clearance option involves the development of a secure and user-friendly online platform. The platform will allow students to access and download their certificates from the college's database with ease. To ensure security and prevent unauthorised access, the platform will require students to log in using their unique student identification numbers and passwords. Students who have not completed their clearance will be notified and prompted to complete the necessary steps before downloading their certificates..</p>
                </Content>

            </LeftContainer>
            <RightContainer>
                <CardContainer>
                    <LeftCard>
                        <img src={TeamWork} alt="" />
                        <h2>1000+ </h2>
                        <h4>Registered Students</h4>
                    </LeftCard>
                    <RightCard>
                        <img src={Certifcate} alt="" />
                        <h2>1000+ </h2>
                        <h4>Issued Certificates</h4>
                    </RightCard>
                    <Button variant='contained' size='small' color='secondary' endIcon={<ArrowForwardIcon />}>View Statistic</Button>
                </CardContainer>
            </RightContainer>
        </Container>
    )
}

export default AboutProject
const Container = styled.div`
    padding: 4rem 0;
    background-color: whitesmoke;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 80% 10%;
    column-gap: 2rem;
    @media screen and (max-width: 820px) {
       margin: 2rem;
        grid-template-columns: 1fr;
        padding: 0;
        margin: 0;
    }
    @media screen and (max-width: 780px) {
       margin: 2rem;
        grid-template-columns: 1fr;
        padding: 0;
        margin: 0;
    }
   
`;

const LeftContainer = styled.div`
    margin-left: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 820px) {
        margin-left: 1rem;
    }
    @media screen and (max-width: 780px) {
        margin-left: 1rem;
    }
   
`;

const Content = styled.div`
    width: 100%;
    h1{
        width: 70%;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    p{
        font-family: Arial, Helvetica, sans-serif;
        text-align: justify;
        margin-top: 1rem;
    }
    @media screen and (max-width: 820px) {
        width: 100vw;
        h1{
            font-size: 1.3rem;
            font-weight: 800;
        }
        p{
            width: 90%;
        }
    }
    @media screen and (max-width: 780px) {
        width: 100vw;
        h1{
            font-size: 1.4rem;
            font-weight: 500;
        }
        p{
            width: 90%;
        }
    }
    
`;

const RightContainer = styled.div`
    
`;

const CardContainer = styled.div`
    background: linear-gradient(90.56deg, rgb(167, 180, 255) 0.99%, rgb(255, 195, 195) 100%); 
    box-shadow: rgba(171, 171, 171, 0.25) 0px 4px 39px;
    border-radius: 20px;
    width: 35rem;
    height: 16rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    h2{
        margin-top: 1.2rem;
        color: #180D73;
        font-weight: 700;
        font-size: 2rem;
    }
    img{
        width: 20%;
        height: 30%;
    }
    button{
        grid-column: 1 / span 2;
        width: 30%;
        height: 40%;
        margin: auto;
    }
    @media screen and (max-width: 820px) {
        grid-column-gap: 1rem;
        position: relative;
        bottom: 2.8rem;
        border-radius: 10px;
        width: 50%;
        height: 10rem;
        margin: auto;
        h2{
        font-weight: 500;
        font-size: 1.2rem;
        }
        button{
        grid-column: 1 / span 2;
        width: 50%;
        height: 60%;
        margin: auto;
        }
    }
    @media screen and (max-width: 780px) {
        grid-column-gap: 1rem;
        border-radius: 6px;
        width: 74%;
        height: 10rem;
        margin: auto;
        bottom: 0;
        h2{
        font-weight: 500;
        font-size: 1.2rem;
        }
        button{
        grid-column: 1 / span 2;
        width: 50%;
        height: 60%;
        margin: auto;
        }
    }
    
`;

const LeftCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`;
const RightCard = styled.div`
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
`;