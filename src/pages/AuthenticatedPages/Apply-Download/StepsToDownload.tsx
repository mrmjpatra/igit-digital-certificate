import React, { useEffect, useState } from 'react';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FireStoreCollection } from '../../../firebase/firestore-collection';
import { useAppSelector } from '../../../state/hooks';
import styled from 'styled-components';

export interface IClearanceValues {
    clearance: boolean,
    remark: string,
    remarkStatus: boolean
}
export interface IDepartments {
    deptName: IClearanceValues;
}

const user = new FireStoreCollection('Users');
const StepsToDownload = () => {
    const userEmail = useAppSelector(state => state.user.emailId);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [deptClearance, setDeptClearance] = useState<IDepartments[]>([]);
    const [deptList, setDeptList] = useState<string[]>([]);
    const [allClearance, setAllClearance] = useState<boolean>(false);

    const fetchDept = async () => {
        console.log("first")
        const clearance = await user.getAllClearanceList(userEmail);
        setDeptClearance(clearance);
        setDeptList((Object.keys(clearance)).sort().reverse());
        checkAllClearance();
    }

    const checkAllClearance = () => {
        let libraryCleared = false; // a flag variable to check if library clearance is gained
        console.log(deptClearance);
        for (const deptName in deptClearance) {
            const clearance: IClearanceValues = deptClearance[deptName] as unknown as IClearanceValues;
            if (deptName === 'library' && clearance.clearance === true) {
                console.log("Library clearance is gained and update the set to 1")
                setActiveStep(1);
                libraryCleared = true; // set flag to true when library clearance is gained
            }
            if (libraryCleared) {
                if (deptName === 'hostel' && clearance.clearance === true) {
                    console.log("Hostel clearance is gained and update the set to 2")
                    setActiveStep(2);
                }
                if (deptName === 'branchdept' && clearance.clearance === true) {
                    console.log("Branch clearance is gained and update the set to 3")
                    setActiveStep(3);
                }
            }

        }
    }
    useEffect(() => {
        fetchDept();
    }, []);

    useEffect(() => {
        if (deptClearance.length > 0) {
            checkAllClearance();
        }
    }, [deptClearance]);

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
                        const clearance = deptClearance[deptName as keyof typeof deptClearance] as unknown as IClearanceValues;
                        if (!clearance.remarkStatus) {
                            labelProps.optional = (
                                <Typography variant="caption" color="error">
                                    {clearance.remark}
                                </Typography>
                            );
                            labelProps.error = true;
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
            <Button onClick={checkAllClearance}>Check Status</Button>
        </StepsToDownloadContainer>
    )
}

export default StepsToDownload;
const StepsToDownloadContainer = styled.div`
    padding: 1rem;
    h4{
       margin-bottom: 2rem;
    }
`;