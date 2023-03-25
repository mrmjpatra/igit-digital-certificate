import { Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import { Stack } from '@mui/system';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FireStoreCollection, ReceivedDocuments } from '../../../firebase/firestore-collection';
import { useAppSelector } from '../../../state/hooks';
import StepsToDownload from './StepsToDownload';
export interface applyCertFormType {
    isHosteller: boolean,
    hostelName?: string,
    dept: string
}
interface IClearance {
    library: {
        clearance: boolean;
        remarkStatus: boolean;
        remark: string;
    };
    hostel: {
        formData: applyCertFormType;
        clearance: boolean;
        remarkStatus: boolean;
        remark: string;
    };
    branchdept: {
        clearance: boolean;
        remarkStatus: boolean;
        remark: string;
    };
}
interface fieldType {
    clearance: IClearance,
    apply: boolean;
    pending: boolean;
}
const Apply = () => {
    const userEmail = useAppSelector(state => state.user.emailId);
    const branch = useAppSelector(state => state.user.branch);
    const navigate=useNavigate();
    const [isHosteller, setIsHosteller] = useState(false);
    const [hostelName, setHostelName] = useState('');
    const hostelList = ['Akash Bhawan', 'Aryabhat Bhawan', 'Bhaskar Bhawan', "Brahmos Bhawan", 'Suriya Bhawan', 'Rohini Bhawan', 'Prithivi Bhawan'];
    const deptList: { mca: string[], btech: string[], diploma: string[] } = {
        mca: ['MCA'],
        btech: ['CSE', 'ETC', 'ELECTRICAL', 'MECH', 'CIVIL', 'PRODUCTION', 'CHEMICAL'],
        diploma: ['ELECTRICAL', 'MECH', 'CIVIL']
    };
    const [dept, setDept] = useState('');
    const [isApplied, setIsApplied] = useState(false);
    const usersCollection = new FireStoreCollection("Users");
    const handleSubmit = () => {
        const formData: applyCertFormType = {
            isHosteller,
            dept
        };
        if (dept === '') {
            return;
        }
        if (isHosteller) {
            formData.hostelName = hostelName;
            if (hostelName === '') {
                return;
            }
        }
        const clearance: IClearance = {
            library: {
                clearance: false,
                remarkStatus: true,
                remark: ''
            },
            hostel: {
                formData,
                clearance: false,
                remarkStatus: true,
                remark: ''
            },
            branchdept: {
                clearance: false,
                remarkStatus: true,
                remark: ''
            },
        }
        const fields: fieldType = {
            clearance,
            apply: true,
            pending: true,
        }
        usersCollection.updateUserFields(userEmail, fields);
    }
    useEffect(() => {
        const fetchUsers = async () => {
            const allDetails = await usersCollection.readSpecifUserDetails(userEmail);
            // console.log(allDetails);
            if (allDetails.apply) {
                navigate('/home/pending');
            }
            setIsApplied(allDetails.apply);
        }
        fetchUsers();
    }, []);


    return (
        <ApplyCertificateContainer>
            <form>
                <Stack spacing={2}>
                    <FormGroup>
                        <FormControlLabel control={<Switch onChange={(e: ChangeEvent<HTMLInputElement>) => setIsHosteller(e.target.checked)} />} label="Are you a Hosteller ?" />
                    </FormGroup>
                    {
                        isHosteller && <FormControl fullWidth>

                            <InputLabel id="demo-simple-select-label">Hostel</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={hostelName}
                                label="Hostel   "
                                onChange={(e) => setHostelName(e.target.value)}
                            >
                                {
                                    hostelList?.map(hostel => <MenuItem key={hostel} value={hostel}>{hostel}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    }
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Department</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dept}
                            label="Age"
                            onChange={(e) => setDept(e.target.value)}
                        >
                            {
                                deptList[branch as keyof typeof deptList].map(dept => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <Button color='primary' variant='contained' onClick={handleSubmit} >Apply</Button>
                </Stack>
            </form>
        </ApplyCertificateContainer>
    )
}

export default Apply;

const ApplyCertificateContainer = styled.div`
    width: 50%;
    margin: auto;
    margin-top: 2rem;
`