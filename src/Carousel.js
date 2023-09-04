import React, { useState } from "react";
import CarouselContents from "./CarouselContents";
import CarouselSlide from "./CarouselSlide";

function Carousel({ contents }) {
  // The value of the item that is supposed to be the center
  const [centerVal, setCenterVal] = useState(2);
  return (
    <React.Fragment>
      <CarouselContents centerVal={centerVal} setCenterVal={setCenterVal} totalImages={contents}>
        {contents.map((q, index) => {
          return (
            <CarouselSlide key={index + 1} val={index + 1}>
              <img src={q.img} alt={q.alt}/>
            </CarouselSlide>
          );
        })}
      </CarouselContents>
    </React.Fragment>
  );
}

export default Carousel;
