import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components';
import { studentMarkshet } from '../../../firebase/firestore-collection';

const MarksheetTemplate = ({studentDetails,subjectList}:{studentDetails:studentMarkshet | undefined,subjectList:string[] | undefined}) => {

  
    const handlePrint = () => {
        const printContents = document.getElementById('printContents')?.innerHTML;
        const originalContents = document.body.innerHTML;
        if (!printContents) {
            return;
        }
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            return;
        }
        printWindow.document.open();
        printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.onload = () => {
            printWindow.print();
            printWindow.onafterprint = () => {
                printWindow.close();
            };
        };

        document.body.innerHTML = originalContents;
    };
    return (
        <Container id="printContents">
            <CertificateForm>
                <CertificateHeader>
                    <TitleContainer>
                        <img src="https://firebasestorage.googleapis.com/v0/b/igitcertificate.appspot.com/o/assets%2FWhatsApp%20Image%202024-04-18%20at%202.00.05%20PM.jpeg?alt=media&token=70f9f97f-fbca-43b2-b84f-c48d8a0c8575" alt="" />
                        <Typography variant='h3'>Indira Gandhi Institute Of Technology </Typography>
                    </TitleContainer>
                    <table>
                        <tbody>
                            <td><b> Registration Number</b></td>
                            <td>2105105026</td>
                        </tbody>
                        <tbody>
                            <td><b> Student Name</b></td>
                            {/* <td>{studentName.toUpperCase()}</td> */}
                        </tbody>
                        <tbody>
                            <td><b> Stream</b></td>
                            <td>MASTER IN COMPUTER APPLICATION</td>
                        </tbody>
                        <tbody>
                            <td><b> Branch</b></td>
                            <td>COMPUTER APPLICATION</td>
                        </tbody>
                        <tbody>
                            <td><b> Exam</b></td>
                            <td>1st Sem</td>
                        </tbody>
                    </table>
                </CertificateHeader>
                <CertificateMiddle >
                    <table>
                        <tbody>
                            <th>SI.No.</th>
                            <th>Subject Code</th>
                            <th>Subject Name</th>
                            <th>Credit</th>
                            <th>Grade</th>
                        </tbody>
                        <tbody>
                            <td>1</td>
                            <td>20CAL101</td>
                            <td>PROBLEM SOLVING USING C LAB</td>
                            <td>2</td>
                            <td>0</td>
                        </tbody>
                        <tbody>
                            <td>1</td>
                            <td>20CAL101</td>
                            <td>PROBLEM SOLVING USING C LAB</td>
                            <td>2</td>
                            <td>0</td>
                        </tbody>
                        <tbody>
                            <td>1</td>
                            <td>20CAL101</td>
                            <td>PROBLEM SOLVING USING C LAB</td>
                            <td>2</td>
                            <td>0</td>
                        </tbody>
                        <tbody>
                            <td>1</td>
                            <td>20CAL101</td>
                            <td>PROBLEM SOLVING USING C LAB</td>
                            <td>2</td>
                            <td>0</td>
                        </tbody>
                        <tbody>
                            <td>1</td>
                            <td>20CAL101</td>
                            <td>PROBLEM SOLVING USING C LAB</td>
                            <td>2</td>
                            <td>0</td>
                        </tbody>
                    </table>
                </CertificateMiddle>
                <CertificateFooter>
                    <table>
                        <tbody>
                            <th>Total Credits</th>
                            <th>SGPA</th>
                            <th>CGPA</th>
                        </tbody>
                        <tbody>
                            <td>21</td>
                            <td>9.48</td>
                            <td>9.48</td>
                        </tbody>
                    </table>
                </CertificateFooter>
            </CertificateForm>
            <Button variant='contained' onClick={handlePrint}>Download</Button>
        </Container>
    )
}

export default MarksheetTemplate;
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
