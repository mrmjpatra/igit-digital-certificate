import styled from 'styled-components'
import { Splide, SplideSlide, Options } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { HomeImage } from './HomeImage';


const carousel = () => {
  const options: Options = {
    type: 'loop',
    gap: '1rem',
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
    rewind: true,
    interval: 3000
  };
  return (
    <CarouselContainer>
      <Splide
        options={options}
        aria-label="My Favorite Images"
      >
        {
          HomeImage.map(image => {
            return (
              <SplideSlide key={image.id}>
                <img src={image.image} alt='image' />
              </SplideSlide>
            )
          })
        }

      </Splide>
    </CarouselContainer>
  )
}

export default carousel

const CarouselContainer = styled.div`
  margin-top: 5rem;
  &:SplideSlide{

  }
  img{
    width: 100%;
    height: 50vh;
    object-fit: contain;
  }
`

