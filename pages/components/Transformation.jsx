import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import image from "../../src/assets/IMG_0766.jpeg";
import image2 from "../../src/assets/IMG_1091.jpeg";
import image3 from "../../src/assets/IMG_3509.jpeg";
import image4 from "../../src/assets/IMG_8409.jpeg";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Transformation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesDany = [
    { month: 1, title: "Starting Point" },
    { month: 4, title: "Early Progress" },
    // { month: 8, title: "Major Changes" },
    // { month: 12, title: "Current" },
  ];

  const imagesDany = [image2, image4];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesDany.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slidesDany.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <h2 className="slider-title">
        My <span className="highlight">Clients</span>
      </h2>

      <div className="slider-wrapper">
        <div className="slider-image-container">
          <Image
            src={imagesDany[currentSlide]}
            alt={slidesDany[currentSlide].title}
            className="slider-image"
            // layout="responsive"
            // width={800}
            // height={400}
          />
          <div className="slider-caption">
            <h3 className="caption-title">{slidesDany[currentSlide].title}</h3>
            <p className="caption-text">Month {slidesDany[currentSlide].month}</p>
          </div>
        </div>

        {/* Dots for navigation */}
        <div className="slider-dots">
          {slidesDany.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`slider-dot ${currentSlide === index ? "active-dot" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
