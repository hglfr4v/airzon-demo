import React, { useEffect, useState } from 'react';
import '../airzon.css';

import image1 from '../assets/figures/image1.jpg';
import image2 from '../assets/figures/image2.jpg';
import image3 from '../assets/figures/clapping.jpg';
import image4 from '../assets/figures/journals+2.jpg';
import image5 from '../assets/figures/data+analysis+2.jpg';

const carouselData = [
  { image: image1, caption: 'The Exclusive Aviation Spare Parts Ecosystem' },
  { image: image2, caption: 'Secure Aircraft Parts Trading – Powered by Blockchain' },
  { image: image3, caption: 'Network with your clients & suppliers – drive business' },
  { image: image4, caption: 'Access the latest news in the market – Powered by News Partner' },
  { image: image5, caption: 'Analytics connected to your ERP – enhance inventory management' }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
  

    useEffect(() => {
      const interval = setInterval(() => {
        setFade(false);
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
        setFade(true);
      }, 10000);
      return () => clearInterval(interval);
    }, []);

  


  return (
    <div className="carousel">
      <div className="carousel-card">
    <img
      src={carouselData[currentSlide].image}
      alt="Slide"
      className="carousel-image"
    />

    <div className="carousel-overlay">
       <h2 className="carousel-cta"></h2> 
      <p className="carousel-caption">{carouselData[currentSlide].caption}</p>
      <div className="carousel-dots">
        {carouselData.map((_, i) => (
          <div
            key={i}
            className={`carousel-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
    </div>
  </div>
    </div>
    
  );
};

export default Carousel;

