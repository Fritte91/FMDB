import React from 'react';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from './SliderArrows'; // Ensure this import is correct
import './MovieRow.css'; // Import the CSS for styling

const MovieRow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Slider {...settings}>
      <div><img src="/assets/Becky.jpg" alt="Slide 1" /></div>
      <div><img src="/assets/Apocalypto.jpg" alt="Slide 2" /></div>
      <div><img src="/assets/Archive.jpg" alt="Slide 3" /></div>
      <div><img src="/assets/Bisping.jpg" alt="Slide 4" /></div>
      <div><img src="/assets/Bliss.jpg" alt="Slide 5" /></div>
    </Slider>
  );
};

export default MovieRow;
