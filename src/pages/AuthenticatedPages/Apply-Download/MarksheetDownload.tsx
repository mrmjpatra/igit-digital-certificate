import { Close } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FireStoreCollection, studentMarkshet } from '../../../firebase/firestore-collection';
import { useAppSelector } from '../../../state/hooks';
import MarksheetTemplate from './MarksheetTemplate';
import { useNavigate } from 'react-router-dom';


const MarksheetDownload = () => {
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState('')
    const regdNumber = useAppSelector(state => state.user.regdNo);
    const [semester, setSemester] = useState('');
    const [open, setOpen] = useState(false);
    const [detailsNotFound, setDetailsNotFound] = useState<boolean>(false);
    const [notAvaible, setNotAvaible] = useState<boolean>(false);
    const [showCert, setShowCert] = useState(false);
    const branch = useAppSelector(state => state.user.branch);

    const semesterList: { btech: string[], mca: string[], diploma: string[] } = {
        btech: ['First', 'Second', 'Third', 'Fourth', 'Fifith', 'Sixth', 'Seventh', "Eigth"],
        mca: ['First', 'Second', 'Third', 'Fourth'],
        diploma: ['First', 'Second', 'Third', 'Fourth', 'Fifith', 'Sixth']
    };

    const [marks, setMarks] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [semisterMarksRender, setSemisterMarksRender] = useState<Array<JSX.Element>>([])
    const handleMarkSheetDownload = async () => {
        const uploadCert = new FireStoreCollection('marksheets');
        const allDetails = await uploadCert.readMarkSheetData(branch);
        //set student details
        const studentDetails = allDetails.data.markList.find(studentMark => ((studentMark.regdNumber) == regdNumber));

        //set all the subject list
        if (studentDetails !== undefined) {

            // set marks and subjects to send for the download page
            setMarks(studentDetails.marks);
            setSubjects(allDetails.data.subjects);

            setStudentName(studentDetails.name);
            if (allDetails.data.subjects && studentDetails.marks) {
                let sL = allDetails.data.subjects;
                let sM = studentDetails.marks;
                for (let i = 0; i < sL.length; i++) {
                    setSemisterMarksRender(prev => ([...prev, (<tr key={i}>
                        <td>{i + 1}</td>
                        <td>{sL[i]}</td>
                        <td>{sM[i]}</td>
                    </tr>)]
                    ));
                }

            }
            setShowCert(true);
        } else {
            setDetailsNotFound(true)
            setOpen(true);
            setNotAvaible(true);
        }

    }


    if (!showCert) {
        return (
            <MarksheetDownloadContainer>
                {
                    detailsNotFound && <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Sorry Marksheet is not available<strong> Check after some time!</strong>
                    </Alert>
                }{
                    notAvaible &&
                    <Collapse in={open}>
                        <Alert severity="info" action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }>
                            <AlertTitle>Info</AlertTitle>
                            Sorry Marksheet is not available
                        </Alert>
                    </Collapse>

                }
                <Stack>
                    <Typography color='primary' variant='h5' >Choose The Semester to Download Certificate</Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={semester}
                            label="Semester"
                            onChange={(e) => setSemester(e.target.value)}
                        >
                            {
                                semesterList[branch as keyof typeof semesterList]?.map((b, index) => <MenuItem key={index} value={b.toLowerCase()}>{b}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <Button variant='contained' color='success' onClick={handleMarkSheetDownload} >Download</Button>
                </Stack>
            </MarksheetDownloadContainer>
        )
    } else {
        const handlePrint = () => {
            navigate("/printfile", {state: {regdNumber, studentName, branch, semester, marks, subjects, }})
        }
        const getMarksheetvalue = () => {
            return <Container id="printContents" >
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
                                <td>{regdNumber}</td>
                            </tr>
                            <tr>
                                <td><b> Student Name</b></td>
                                <td>{studentName.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td><b> Stream</b></td>
                                <td>MASTER IN COMPUTER APPLICATION</td>
                            </tr>
                            <tr>
                                <td><b> Branch</b></td>
                                <td>{branch.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td><b> Exam</b></td>
                                <td>{semester.toUpperCase()} Sem</td>
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
                                semisterMarksRender.map(ele => ele)
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
            <Button variant='contained' onClick={handlePrint}>Download</Button>
        </Container>
        }
        return (
            <>
                {
                    getMarksheetvalue()
                }
            </>
        )
    }

}

export default MarksheetDownload;
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
