import { GitHub } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import styled from 'styled-components'

const About = () => {
    return (
        <AboutContainer>
            <Stack spacing={2}>
                <Typography variant='h3' textAlign='center' color='blue'>Digital Certificate</Typography>
                <main>
                    <p>
                        The digital solution proposed for downloading certificates for a college with clearance option involved the development of a secure and user-friendly online platform. The platform allowed students to access and download their certificates from the college's database with ease. To ensure security and prevent unauthorized access, the platform required students to log in using their unique student identification numbers and passwords. Students who had not completed their clearance were notified and prompted to complete the necessary steps before downloading their certificates. Additionally, the platform provided a feature for students to request clearance from relevant departments within the college. Once the clearance process was completed, students received a notification allowing them to proceed with certificate download. It also incorporated features such as document tracking, notifications, and reminders to
                        ensure a seamless and efficient certificate download process.
                    </p>
                </main>
                <section>
                    <Typography variant='h6'>Tools Used in the Program</Typography>
                    <p>The digital certificate and mark sheet website is built using React as the frontend framework. React is a popular and efficient framework for building complex web applications with a fast and responsive user interface. In addition to React, several other libraries have been used to create a seamless user experience. These include Material-UI, React Router, Redux, Splide, Formik, and Styled Components.</p>

                    <p>Material-UI is a popular library of pre-built React components that can be used to create a modern and visually appealing user interface. React Router is a routing library that allows for easy navigation between different pages of the website. Redux is a state management library that helps manage the application's data, while Splide is a lightweight slider library used to display images and other content. Formik is a form library that helps with form validation, while Styled Components allows for easy styling of React components.</p>

                    <p>The website is hosted on Firebase, a cloud-based platform that offers several features for web application development. Firebase Firestore is used to securely store and manage user data such as student information, documents, and clearance status. Firebase Storage is used to store the documents, which can be retrieved by students upon successful clearance.</p>

                    <p>The website offers a user-friendly interface for students to register, view a list of their available documents, and download them as needed. If a document is not available for download, students can apply for clearance with the respective department, with the website sending a notification to the department for further processing. This helps streamline the clearance process, reducing the time taken to retrieve documents.</p>

                    <p>The website's source code is available on GitHub at
                        <IconButton color='info' target='__blank' href='https://github.com/mrmjpatra/igit-digital-certificate'>
                            <GitHub />
                        </IconButton>
                        This allows for easy access to the codebase, and collaboration among developers. The use of React and other libraries, combined with Firebase's powerful features, creates a reliable and scalable platform for document management. With its user-friendly interface and efficient clearance process, the digital certificate and mark sheet website offers a valuable tool for students and academic institutions alike.</p>
                </section>
            </Stack>
        </AboutContainer>
    )
}

export default About;
const AboutContainer = styled.div`
    margin: 0.5rem;
    background-color: whitesmoke;
    p{
        padding: 0 1rem;
        text-align: justify;
        font-size: 1.4rem;
        line-height: 2.3rem;
    }
    section{
        padding: 0.4rem;
    }
    section p{
        margin-bottom: 1rem;
    }
    @media screen and (max-width: 780px) {
        margin: 0;
        margin-top: 1rem;
       p{
        font-size: 1rem;
        line-height: 1.5rem;
       }
    }
`;