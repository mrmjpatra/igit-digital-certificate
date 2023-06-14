import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Print = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [subjectMark, setSubjectMark] = useState<Array<JSX.Element>>([])
    useEffect(() => {
        for(let i=0;i<state.marks.length;i++){
            let subject=state.subjects[i];
            let marks=state.marks[i];
            setSubjectMark((prev)=>([...prev,(<tr key={i}>
                <td>{i + 1}</td>
                <td>{subject}</td>
                <td>{marks}</td>
            </tr>)]));
        }
        window.print();
        navigate(-1);
    }, []);

    return (
        <Container id="printContents" >
            <CertificateForm>
                <CertificateHeader>
                    <TitleContainer>
                        <img src="https://igitsarang.ac.in/assets/frontend//images/logo.png" alt="" />
                        <Typography variant='h3'>Indira Gandhi Institute Of Technology </Typography>
                    </TitleContainer>
                    <table>
                        <thead>
                            <tr>
                                <td><b> Registration Number</b></td>
                                <td>{state.regdNumber}</td>
                            </tr>
                            <tr>
                                <td><b> Student Name</b></td>
                                <td>{state.studentName}</td>
                            </tr>
                            <tr>
                                <td><b> Stream</b></td>
                                <td>MASTER IN COMPUTER APPLICATION</td>
                            </tr>
                            <tr>
                                <td><b> Branch</b></td>
                                <td>{state.branch}</td>
                            </tr>
                            <tr>
                                <td><b> Exam</b></td>
                                <td>{state.semester} Sem</td>
                            </tr>
                        </thead>
                    </table>
                </CertificateHeader>
                <CertificateMiddle >
                    <table>
                        <thead>
                            <tr>
                                <th>SI.No.</th>
                                <th>Subject Name</th>
                                <th>Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                subjectMark.map(ele => ele)
                            }
                        </tbody>
                    </table>
                </CertificateMiddle>
                <CertificateFooter>
                    <table>
                        <thead>
                            <tr>
                                <th>Total Credits</th>
                                <th>SGPA</th>
                                <th>CGPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>21</td>
                                <td>9.48</td>
                                <td>9.48</td>
                            </tr>
                        </tbody>
                    </table>
                </CertificateFooter>
            </CertificateForm>
        </Container>
    )
}

export default Print

const MarksheetDownloadContainer = styled.div`
    width: 50%;
    margin:2rem auto;
    h5{
      margin: 1rem 0;
    }
    .MuiButton-root{
        margin-top: 2rem;
    }
`;

const Container = styled.div`
    padding: 1rem 2rem;
    text-align: center;
    button{
        margin-top: 2rem;
    }
`;
const CertificateForm = styled.div`
    margin-top: 2rem;
`;
const CertificateHeader = styled.div`
    border: 2px solid black;
    table{
        border-collapse: collapse;
        width: 100%;
    }
    td{
        border: 1px solid ;
        padding: 1rem ;
        text-align: left;
    }
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 2rem;
    border-bottom: 2px solid black;
    padding: 1rem;
    h3{
        font-family: 'Open Sans', sans-serif ;
        font-size: 2rem;
        font-weight: 500;
    }

`;

const CertificateMiddle = styled.div`
    margin-top: 1rem;
    border: 1px solid black;
    table{
        border-collapse: collapse;
        width: 100%;
    }
    th{
        height: 3rem;
        border: 1px solid ;
    }
    td{
        border: 1px solid ;
        padding: .8rem ;
        text-align: center;
    }
`;
const CertificateFooter = styled.div`
 margin-top: 1rem;
    border: 1px solid black;
    table{
        border-collapse: collapse;
        width: 100%;
    }
    th{
        height: 3rem;
        border: 1px solid ;
    }
    td{
        border: 1px solid ;
        padding: .8rem ;
        text-align: center;
    }
`;
