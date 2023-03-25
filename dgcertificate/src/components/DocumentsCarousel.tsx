import { Typography } from "@mui/material"
import { Splide, SplideSlide, Options } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import styled from "styled-components";
import "@splidejs/splide/dist/css/splide.min.css";
import { useEffect, useState } from "react";
import { FireStoreCollection } from "../firebase/firestore-collection";
import { providedDocumentsList } from "../pages/Home/CertificateCarousel";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../state/hooks";


const DocumentsCarousel = () => {
    const [providedDocument, setProvidedDocument] = useState<providedDocumentsList[]>([]);
    const navigate = useNavigate();
    const drawerOpenState = useAppSelector(state => state.theme.open);
    const options: Options = {
        breakpoints: {
            640: {
                perPage: 1,

            },
            768: {
                perPage: 1,

            },
            1024: {
                perPage: 2,

            },
            1440: {
                perPage: drawerOpenState ? 3 : 4, // if drawerOpenState is true, set perPage to 3, otherwise set it to 4
            },
        },
        perMove: 1,
        height: '12rem',
        width: '100%',
        // autoplay: true,
        interval: 1000,
        rewind: true,
        gap: '1rem',
        padding: { left: '1rem', right: '1rem' },
    };
    const fetchProvidedDocuments = async () => {
        const providedCertificate = new FireStoreCollection('providedCertificates');
        const list = await providedCertificate.readProvidedDocuments();
        setProvidedDocument(list);
    }

    const handleCardClick = (document: providedDocumentsList) => {
        const documentType = document.fields.type.toLowerCase();
        navigate(`/home/${documentType}`);
    }
    useEffect(() => {
        fetchProvidedDocuments();
    }, []);

    return (
        <DocumentCarousel>
            <Typography marginBottom='2rem' color='primary' variant="h5">Your Issued Documents</Typography>
            <Splide options={options} >
                {
                    providedDocument.map(document => {
                        const st = document.fields.branch.toUpperCase();
                        return (
                            <SplideSlide key={document.id}>
                                <Card drawerOpenState={drawerOpenState} onClick={() => handleCardClick(document)}>
                                    <img src={document.fields.imageUrl} alt={document.fields.title + "img"} />
                                    <CardTitle>
                                        <h4>{st}</h4>
                                        <h4>{document.fields.title}</h4>
                                    </CardTitle>
                                </Card>
                            </SplideSlide>
                        )
                    })
                }
            </Splide>
        </DocumentCarousel>
    )
}

export default DocumentsCarousel;

const DocumentCarousel = styled.div`
    overflow: hidden;
    img{
        width: 40%;
        height: 55%;
        border-radius: 1rem;
        border: 2px solid red;
    }
    .splide__track{
        overflow: visible !important;
    }
    @media screen and (max-width: 780px) {
        img{
            width: 30%;
            height: 40%;
        }
    }
`;

const Card = styled.div<{ drawerOpenState?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: ${props => props.drawerOpenState ? '100%' : '80%'};
    height: 85%;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 10px 5px 5px #b4b4b4;
    position: relative;
    z-index: 1000;
    transition: all 300ms ease-out;
    &:hover{
        transform: translate(0, -10px);
    }
    @media screen and (max-width: 820px) {
        width: 100%;
    }
    @media screen and (max-width: 780px) {
        width: 100%;
    }
`;
const CardTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.4rem;
`