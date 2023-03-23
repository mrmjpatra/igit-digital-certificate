import React from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';

const StepsToDownload = () => {
    const steps = ['Library Clearance', 'Hostel Clearance', 'Department Clearance'];
    return (
        <div>
            <Stepper alternativeLabel>
                {
                    steps.map(s => <Step>
                        <StepLabel>
                            {s}
                        </StepLabel>
                    </Step>)
                }
            </Stepper>
        </div>
    )
}

export default StepsToDownload