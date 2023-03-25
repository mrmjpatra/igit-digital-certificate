import styled from 'styled-components';
import MemberShip from '../../assets/membership.png';
import { DownloadForOffline, Fingerprint,ArrowForward } from '@mui/icons-material';

const ProcessComp = () => {
    return (
        <Container>
            <LeftContainer>
                <h1>Getting started is quick and easy</h1>
            </LeftContainer>
            <RightContainer>
                <Process1>
                    <Item>
                    <img src={MemberShip} alt="" />
                    <h3>Register Yourself</h3>
                    </Item>
                    <ArrowForward fontSize='large' color='action'/>
                </Process1>
                <Process1>
                    <Item>
                    <Fingerprint fontSize='large' color='primary' />
                    <h4>Verify Yourself</h4>
                    </Item>
                    <ArrowForward fontSize='large' color='action'/>
                </Process1>
                <Process1>
                    <Item>
                    <DownloadForOffline fontSize='large' color='success' />
                    <h4>Fetch your Documents</h4>
                    </Item>
                </Process1>


            </RightContainer>
        </Container>
    )
}

export default ProcessComp;

const Container = styled.div`
    height: 15rem;
    padding: 0 6rem;
    background-color: white;
    display: grid;
    grid-template-columns: 30% 70%;
    @media screen and (max-width: 780px) {
        margin-top: 4rem;
        padding: 0;
        grid-template-columns: 1fr;
    }
    @media screen and (max-width: 820px) {
        margin-top: 4rem;
        padding: 0;
        grid-template-columns: 1fr;
    }
`;
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    width: 70%;
    margin: auto;
    @media screen and (max-width: 780px) {
        width:90vw;
    }
`;

const RightContainer = styled.div`
    place-items: center;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media screen and (max-width: 780px) {
        padding: 10px;
        width: 78%;
        margin: auto;
    }
    @media screen and (max-width: 820px) {
        padding: 10px;
        width: 90%;
        margin: auto;
    }
    
`
const Process1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width: 50px;
        height: 50px;
    }
    @media screen and (max-width: 780px) {
        /* width: 30px;
        height:30px; */
    }
`;
const Item=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 4rem;
    h3{
        margin-top: 1.5rem;
    }
    h4{
        margin-top: 2rem;
    }
    @media screen and (max-width: 780px) {
        margin-right: 1rem;
        h3{
            margin-top: .2rem;
        }
        h4{
            margin-top: 1rem;
        }
    }
    @media screen and (max-width: 820px) {
        margin-right: 1rem;
        h3{
            margin-top: .2rem;
        }
        h4{
            margin-top: 1rem;
        }
    }

`
