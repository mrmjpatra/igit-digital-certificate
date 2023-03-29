import { Download } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import './issue.css';
import c1 from '../../../assets/c1.png'
import { IconButton } from '@mui/material';
import { FireStoreCollection } from '../../../firebase/firestore-collection';
import { useAppSelector } from '../../../state/hooks';
import IssueDocumentCard from './IssueDocumentCard';


interface IIssueDocuments {
    certUrl?: string,
    marksheet?: {
        markUrl: string,
        name: string
    }[],
    date: string
}

const IssuedDocument = () => {
    const regdNumber = useAppSelector(state => state.user.regdNo);
    const [issueDocuments, setIssueDocuments] = useState<IIssueDocuments>();
    const fetchIssueDocuments = async () => {
        const uploadCert = new FireStoreCollection('UploadedCertificates');
        const userDocuments = await uploadCert.readUploadedCertificateData(regdNumber);
        const date = new Date();
        if (userDocuments) {
            const documents: IIssueDocuments = {
                date: `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
            };
            if (userDocuments.certUrl) {
                documents.certUrl = userDocuments.certUrl;
            }
            if (userDocuments.marksheet) {
                documents.marksheet = userDocuments.marksheet.map(m => ({ markUrl: m.markUrl, name: m.name }))
            }
            setIssueDocuments(documents);

        } else {
            alert("Record not found");
        }
    }
    useEffect(() => {
        fetchIssueDocuments();
    }, []);

    return (
        <div className='issue__document__container'>
            <h5>You have Issued Documents</h5>
            {
                issueDocuments?.certUrl &&
                <IssueDocumentCard date={issueDocuments.date} title="Certificate" url={issueDocuments.certUrl} />
            }
            {
                issueDocuments?.marksheet?.map(m=>
                    <IssueDocumentCard date={issueDocuments.date} title={`${(m.name).toUpperCase()} SEMESTER MARKSHEET`} url={m.markUrl} />
                    )
            }

        </div>
    )
}

export default IssuedDocument;
