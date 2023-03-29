import { Download } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react';



const IssueDocumentCard = ({ date, title, url }: { date: string, title: string, url: string }) => {
    const handleDownload = () => {
        window.open(url, '_blank');
    }
    return (
        <div className='issue__document__card'>
            <div className="issue__document__card__left">
                <img src='https://firebasestorage.googleapis.com/v0/b/igitcertificate.appspot.com/o/certificatesThumbnails%2Fmca%20cert.png?alt=media&token=90080372-ef23-4d47-b7d8-b86f6a744836' alt="" />
                <span>{title}</span>
            </div>
            <div className="issue__document__card__middle">
                <p>IGIT, Sarang</p>
                <span>{date}</span>
            </div>
            <div className="issue__document__card__right">
                <IconButton color='primary' size='large' onClick={handleDownload} >
                    <Download />
                </IconButton>
            </div>

        </div>
    )
}

export default IssueDocumentCard