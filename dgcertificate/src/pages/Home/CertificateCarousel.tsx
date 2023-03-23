import { Typography } from '@mui/material'
import { SplideSlide, Options, Splide } from '@splidejs/react-splide'
import styled from 'styled-components';
import { certificate } from './certificate'
import Chip from '@mui/material/Chip';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import "@splidejs/splide/dist/css/splide.min.css"
import { useEffect, useState } from 'react';
import { FireStoreCollection } from '../../firebase/firestore-collection';

export type thumbnailType = {
    title: string,
    type:string,
    branch: string,
    imageUrl: string
}
export interface providedDocumentsList {
    fields: thumbnailType,
    id: string
}

const CertificateCarousel = () => {
    const [certificateList, setCertificateList] = useState<providedDocumentsList[]>([]);

    useEffect(() => {
        const fetchProvidedCertificates = async () => {
            const providedCertificate = new FireStoreCollection('providedCertificates');
            const list = await providedCertificate.readProvidedDocuments();
            setCertificateList(list);
        }
        fetchProvidedCertificates();
    }, []);

    const options: Options = {
        perPage: 3,
        breakpoints: {
            640: {
                perPage: 1,

            },
            768: {
                perPage: 2,

            },
            1024: {
                perPage: 3,

            },
            1440: {
                perPage: 5,

            },
        },
        type: 'loop',
        gap: '1rem',
        autoplay: true,
        pauseOnHover: true,
        resetProgress: false,
        rewind: true,
        interval: 2000,
        drag: "free",
        height: '12.5rem',
        width: '100%'

    };
    return (
        <CertificateCarouselContainer>
            <Typography>Download Your Certificates</Typography>
            <Carosel>
                <Splide
                    options={options}
                    aria-label="My Favorite Images"
                >
                    {
                        certificateList.map(item => {
                            return (
                                <SplideSlide key={item.id}>
                                    <Card>
                                        <p>{item.fields.title}</p>
                                        <img src={item.fields.imageUrl} alt={item.fields.title} />
                                    </Card>
                                </SplideSlide>
                            )
                        })
                    }
                </Splide>
            </Carosel>
            <ChipIconContainer >
                {
                    certificate.map(item => <Chip key={item.id} icon={<TrendingUpIcon color='primary' />} label={item.title} variant="outlined" />)
                }
            </ChipIconContainer>
        </CertificateCarouselContainer>
    )
}

export default CertificateCarousel

const CertificateCarouselContainer = styled.div`
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 20% 80%;
        padding: 1rem 2rem;
        gap: 2rem;
    p{
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        font-weight: 800;
        width: 70%;
        margin: auto;

    }
    @media screen and (max-width: 780px) {
        width: 100vw;
        grid-template-columns: 1fr;
        padding: 10px;
        padding-right: 0;
        p{
            width: 90%;
        }
    }
`
const Carosel = styled.div`
    width: 100%;
    padding: 1rem 2rem 0 0;
    margin-right: 1rem;
    @media screen and (max-width: 780px) {
        padding-right: 0;
    }
`;

const Card = styled.div`
    width: 100%;
    height: 100px;
    border-radius: 1rem;
    overflow: hidden;
    img{
        border-radius: 1rem;
    position: absolute;
    left: 0px;
    width: 100%;
    height: 60%;
    transform: translate(14px, 36px);
    }
    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        color: #ffffff;
        width: 100%;
        transform: translate(-45%, -20%);
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
   
`;
const ChipIconContainer = styled.div`
    margin-left: 2rem;
    display:flex;
    gap: 1rem;
    @media screen and (max-width: 780px) {
         display: grid;
         grid-template-columns: repeat(2,1fr);
         margin-left: 10px;
    }

`