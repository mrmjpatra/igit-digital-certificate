import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../state/hooks';


const MarksheetDownload = () => {
    const [semester, setSemester] = useState('');
    const branch = useAppSelector(state => state.user.branch);
    const semesterList: { btech: string[], mca: string[], diploma: string[] } = {
        btech: ['First', 'Second', 'Third', 'Fourth', 'Fifith', 'Sixth', 'Seventh', "Eigth"],
        mca: ['First', 'Second', 'Third', 'Fourth'],
        diploma: ['First', 'Second', 'Third', 'Fourth', 'Fifith', 'Sixth']
    };
    return (
        <MarksheetDownloadContainer>
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
                            semesterList[branch as keyof typeof semesterList]?.map((b, index) => <MenuItem key={index} value={b}>{b}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Button variant='contained' color='success'>Download</Button>
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