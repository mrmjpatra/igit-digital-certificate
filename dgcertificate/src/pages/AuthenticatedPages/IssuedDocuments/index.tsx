import { Download } from '@mui/icons-material';
import React from 'react'
import './issue.css';
import c1 from '../../../assets/c1.png'

const IssuedDocument = () => {
    return (
        <div className='issue__document__container'>
            <h5>You have Issued Documents</h5>
            <div className='issue__document__card'>
                <div className="issue__document__card__left">
                    <img src={c1} alt="" />
                    <span>Aadhar Card</span>
                </div>
                <div className="issue__document__card__middle">
                    <p>Aadhaar, Unique Identification Authority of India</p>
                    <span>Sat, 07 Nov 2020 19:29:45 GMT</span>
                </div>
                <div className="issue__document__card__right">
                    <Download/>
                </div>

            </div>
        </div>
    )
}

export default IssuedDocument;
