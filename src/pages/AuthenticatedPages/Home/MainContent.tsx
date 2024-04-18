import { Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import DocumentsCarousel from '../../../components/DocumentsCarousel'

const MainContent = () => {
    return (
        <ContentContainer>
            <Typography color='primary' variant='h5'>Welcome, Priyanka Mohanty</Typography>
            <DocumentsCarousel />
        </ContentContainer>
    )
}

export default MainContent

const ContentContainer = styled.div`
    margin-top: 0;
    height: 100vh;
    padding: 1rem 2rem;
    background-color: whitesmoke;
    @media screen and (max-width: 780px) {
        margin-top: 1rem;
    }
`