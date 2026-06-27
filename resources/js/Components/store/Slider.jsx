import { useState } from "react";
import slidesData from "./slidesData";
import "./Slider.css";

export default function Slider() {
  const [slides, setSlides] = useState(slidesData);

  const nextSlide = () => {
    const newSlides = [...slides];
    const first = newSlides.shift();
    newSlides.push(first);
    setSlides(newSlides);
  };

  const prevSlide = () => {
    const newSlides = [...slides];
    const last = newSlides.pop();
    newSlides.unshift(last);
    setSlides(newSlides);
  };

  return (
    <div className="containerX">
      <div className="slide">
        {slides.map((item) => (
          <div
            key={item.id}
            className="item "
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="content">
              <div className="name text-5xl" >{item.name}</div>
              <div className="des text-1xl">{item.description}</div>
              <a target="_blank" rel="noreferrer" href={item.link}>
                <button>See More</button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="buttonXX">
        <button className="prev" onClick={prevSlide}>
          ◁
        </button>
        <button className="next" onClick={nextSlide}>
          ▷
        </button>
      </div>
    </div>
  );
}
