import { Typography } from "@mui/material"
import { Splide, SplideSlide, Options } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import styled from "styled-components";
import "@splidejs/splide/dist/css/splide.min.css";
import { useEffect, useState } from "react";
import { FireStoreCollection, providedDocumentsType } from "../firebase/firestore-collection";

const DocumentsCarousel = () => {
    const [providedDocument, setProvidedDocument] = useState<providedDocumentsType>([]);
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
                perPage: 3,

            },
        },
        perMove: 1,
        height: '12rem',
        width: '100%',
        autoplay: true,
        interval: 1000,
        rewind: true,
        gap: '2rem',
        padding: { left: '1rem', right: '1rem' },
    };
    const fetchProvidedDocuments = async () => {
        const providedDocuments = new FireStoreCollection('providedCertificates');
        try {
            const documents: providedDocumentsType = await providedDocuments.readProvidedDocuments();
            setProvidedDocument(documents);
        } catch (error) {
            console.error(error);
        }
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
                        return (
                            <SplideSlide key={document.id}>
                                <Card>
                                    <img src={document.image} alt={document.title + "img"} />
                                    <h4>{document.title}</h4>
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
`;

const Card = styled.div`  
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
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
`;