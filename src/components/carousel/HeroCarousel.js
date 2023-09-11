import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { heroCarouselImage } from '../../assests/heroCarouseImage';

function HeroCarousel() {
  return (
    <div className='carousel'>
        <Carousel autoPlay='true' infiniteLoop='true' showThumbs={false} showStatus={false}>
               {
                heroCarouselImage.map((image) => (
                    <div>
                        <img src={image.image} alt="" />
                    </div>
                ))
               }
            </Carousel>
    </div>
    
  )
}

export default HeroCarousel;
