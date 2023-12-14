import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousels.css'






const CategoryCarousel = ({ images =[],categories ,quizIds}) => {
  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      showStatus={false}
      showThumbs={false}
      centerMode={true}
      centerSlidePercentage={33.3}
    >
      {images.map((image, index) => (
        <div key={index} className="carousel-image-container">
        <a href={`/quiz/${quizIds[index]}`}> <img src={`../../${image}`} alt={`slide ${index}`} className="carousel-image" /> </a>
        <div className="carousel-text"> <p>{categories[index]}</p> </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CategoryCarousel;