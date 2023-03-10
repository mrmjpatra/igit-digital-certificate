import React from 'react'
import Header from './Header'
import Carousel from '../../components/Carousel'
import CertificateCarousel from './CertificateCarousel'
import AboutProject from './AboutProject'
import ProcessComp from './ProcessComp'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
        <Header />
        <Carousel/>
        <CertificateCarousel/>
        <AboutProject/>
        <ProcessComp/>
        <Footer/>
    </div>
  )
}

export default Home