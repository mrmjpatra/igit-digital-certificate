import React, { useEffect, useState } from 'react';
import { Button, LinearProgress, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FireStoreCollection } from '../../../firebase/firestore-collection';
import { useAppSelector } from '../../../state/hooks';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/system';

export interface IClearanceValues {
    clearance: boolean,
    remark: string,
    remarkStatus: boolean
}
export interface IDepartments {
    deptName: IClearanceValues;
}

export interface IUploadedCertificate {
    regdNumber: string;
    branch: string;
    certUrl?: string,
    marksheet?: {
        name: string,
        markUrl: string
    }[]
}

const user = new FireStoreCollection('Users');
const StepsToDownload = () => {
    const regdNumber=useAppSelector(state=>state.user.regdNo);
    const userEmail = useAppSelector(state => state.user.emailId);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [deptClearance, setDeptClearance] = useState<IDepartments>();
    const [deptList, setDeptList] = useState<string[]>([]);
    const [allClearance, setAllClearance] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchDept = async () => {
        const clearance = await user.getAllClearanceList(userEmail);
        setDeptClearance(clearance);
        setDeptList((Object.keys(clearance)).sort().reverse());
        checkAllClearance();
    }

    const checkLibraryClearance = (list: IClearanceValues): boolean => {
        if (list?.clearance) {
            return true;
        }
        return false;
    }
    const checkHostelClearance = (list: IClearanceValues): boolean => {
        if (list?.clearance) {
            return true;
        }
        return false;
    }
    const checkDeptClearance = (list: IClearanceValues): boolean => {
        if (list?.clearance) {
            return true;
        }
        return false;
    }
    const checkAllClearance = () => {
        if (deptClearance) {
            const library = deptClearance['library' as keyof typeof deptClearance] as unknown as IClearanceValues;
            const hostel = deptClearance['hostel' as keyof typeof deptClearance] as unknown as IClearanceValues;
            const branchdept = deptClearance['branchdept' as keyof typeof deptClearance] as unknown as IClearanceValues;
            if (activeStep === 0 && checkLibraryClearance(library)) {
                setActiveStep(1);
            }
            if (checkHostelClearance(hostel)) {
                setActiveStep(2)
            }
            if (checkDeptClearance(branchdept)) {
                setActiveStep(3);
                setAllClearance(true);
            }
            if ((library.remarkStatus === false || hostel.remarkStatus === false || branchdept.remarkStatus === false)) {
                setAllClearance(false);
            }
        }
    }

    const handleDownload =async () => {
        const download=new FireStoreCollection('UploadedCertificates');
        const certificate=await download.readUploadedCertificateData(regdNumber);
        if(certificate && certificate.certUrl){
            window.location.href = certificate.certUrl;
        }else{
            alert('Not Available');
        }
    }


    useEffect(() => {
        fetchDept();
    }, []);



    if (deptClearance === undefined) {
        return (
            <StepsToDownloadContainer>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            </StepsToDownloadContainer>
        )
    } else {
        return (
            <StepsToDownloadContainer>
                <Typography variant='h4' color='chocolate'>You have Already Applied for Certificate</Typography>
                <Stepper alternativeLabel activeStep={activeStep}>
                    {
                        deptList.map((deptName: string) => {
                            const labelProps: {
                                optional?: React.ReactNode;
                                error?: boolean;
                            } = {};
                            if (deptClearance) {
                                const clearance = deptClearance[deptName as keyof typeof deptClearance] as unknown as IClearanceValues;
                                if (!clearance.remarkStatus) {
                                    labelProps.optional = (
                                        <Typography variant="caption" color="error">
                                            {clearance.remark}
                                        </Typography>
                                    );
                                    labelProps.error = true;
                                }
                            }
                            return (
                                <Step key={deptName}>
                                    <StepLabel {...labelProps} >
                                        {deptName.toUpperCase()}
                                    </StepLabel>
                                </Step>
                            )
                        })
                    }
                </Stepper>
                <Box display="flex" justifyContent="center" marginTop={3}>
                    {
                        allClearance ?
                            (
                                <Button
                                    color='success'
                                    variant='contained'
                                    onClick={handleDownload} >Download
                                </Button>
                            ) :
                            (
                                <Button
                                    variant='outlined'
                                    onClick={checkAllClearance}>Check Status
                                </Button>
                            )
                    }
                </Box>
            </StepsToDownloadContainer>
        )
    }

}

export default StepsToDownload;
const StepsToDownloadContainer = styled.div`
    padding: 1rem;
    h4{
       margin-bottom: 2rem;
    }
`;