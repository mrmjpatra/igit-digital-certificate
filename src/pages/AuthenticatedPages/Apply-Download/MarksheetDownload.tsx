import { Close } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FireStoreCollection } from '../../../firebase/firestore-collection';
import { useAppSelector } from '../../../state/hooks';


const MarksheetDownload = () => {
    const regdNumber = useAppSelector(state => state.user.regdNo);
    const [semester, setSemester] = useState('');
    const [open, setOpen] = useState(false);
    const [detailsNotFound, setDetailsNotFound] = useState<boolean>(false);
    const [notAvaible, setNotAvaible] = useState<boolean>(false);
    const branch = useAppSelector(state => state.user.branch);
    const semesterList: { btech: string[], mca: string[], diploma: string[] } = {
        btech: ['First', 'Second', 'Third', 'Fourth', 'Fifith', 'Sixth', 'Seventh', "Eigth"],
        mca: ['First', 'Second', 'Third', 'Fourth'],
        diploma: ['First', 'Second', 'Third', 'Fourth', 'Fifith', 'Sixth']
    };

    const handleMarkSheetDownload = async () => {
        const uploadCert = new FireStoreCollection('UploadedCertificates');
        const userDocuments = await uploadCert.readUploadedCertificateData(regdNumber);
        if (userDocuments) {
            const marksheet = userDocuments.marksheet?.filter(mark => mark.name === semester) ?? [];
            if (marksheet.length > 0) {
                const url = marksheet[0].markUrl;
                window.open(url, '_blank');
            } else {
                setOpen(true);
                setNotAvaible(true);
            }
        } else {
            setDetailsNotFound(true);
        }
    }

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
`