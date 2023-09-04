import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "./useWindowSize";

const SlidesContainer = styled.div`
  display: flex;
   width: 1000px;
  height: 400px;
  /* @media screen and (max-width: 450px) {
    width: 450px;
    height: 230px;
  } */

  overflow: hidden;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const CarouselControls = styled.div`
  display: flex;
  align-items: center;
  font-size: 2em;
  color: #afafaf;
  padding:20px 0px ;
`;

const CarouselButton = styled.button`
  height: 1.75rem;
  width: 1.75rem;
  border: 2px solid #4b4b4b;
  @media screen and (max-width: 768px) {
    height: 2.5rem;
    width: 2.5rem;
    border: 4px solid #4b4b4b;
  }
  border-radius: 50rem;

  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: ${(props) => props.margin};
`;

const Divider = styled.line`
  stroke: #b9b9b9;
  stroke-width: 2px;
`;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function CarouselContents({ children, centerVal, setCenterVal, totalImages }) {
  const [cursor, setCursor] = useState(0);
  const [jump, setJump] = useState(false); // When window needs to circle back
  const [animating, setAnimating] = useState(false); // When animation is going on
  const carouselRef = useRef(null);
  const count = React.Children.count(children);
  const size = useWindowSize();
  useEffect(() => {
    carouselRef.current.addEventListener("transitionend", onTransitionEnd);
    return () => {
      carouselRef.current.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [cursor]);

  function onTransitionEnd() {
    setAnimating(false);
    // Reached end on right side
    if (cursor >= count) {
      setJump(true);
      setCursor(0);
      return;
    }
    // Reached end on left side
    else if (cursor <= -1) {
      setJump(true);
      setCursor(count - 1);
      return;
    }
  }

  function changeCursor(amount) {
    if (animating) {
      return;
    }
    setCursor(cursor + amount);
    if (centerVal + amount >= count) {
      setCenterVal(0);
    } else if (centerVal + amount < 0) {
      setCenterVal(count - 1);
    } else {
      setCenterVal(centerVal + amount);
    }
  }

  const oldCursor = usePrevious(cursor);

  useEffect(() => {
    if (cursor !== oldCursor && oldCursor !== undefined) {
      setAnimating(true);
    }

    if (jump) {
      setTimeout(() => {
        setAnimating(false);
        setJump(false);
      }, 1);
    }
  }, [cursor, jump, oldCursor]);

  function convertIndexToZIndex(currentVal) {
    // Calculates the next and previous values.
    // Has to account for the fact that next value can go from 9 to 0
    // ex: [..., 7, 8, 9, 0, 1, ...]
    const nextVal =
      centerVal + 1 >= count ? centerVal + 1 - count : centerVal + 1;
    const prevVal = centerVal - 1 < 0 ? count - centerVal - 1 : centerVal - 1;
    const nextNextVal =
      centerVal + 2 >= count ? centerVal + 2 - count : centerVal + 2;
    const prevPrevVal =
      centerVal - 2 < 0 ? count - -centerVal - 2 : centerVal - 2;
    if (size.width <= 450) {
      if (currentVal === centerVal) {
        return { zIndex: 2, toTheLeft: false };
      } else {
        return { zIndex: -1, toTheLeft: null };
      }
    } else if (size.width <= 768) {
      if (currentVal === centerVal) {
        return { zIndex: 2, toTheLeft: false };
      } else if (currentVal === prevVal) {
        return { zIndex: 1, toTheLeft: true };
      } else if (currentVal === nextVal) {
        return { zIndex: 1, toTheLeft: false };
      } else {
        return { zIndex: -1, toTheLeft: null };
      }
    } else {
      if (currentVal === centerVal) {
        return { zIndex: 2, toTheLeft: false };
      } else if (currentVal === prevVal) {
        return { zIndex: 1, toTheLeft: true };
      } else if (currentVal === nextVal) {
        return { zIndex: 1, toTheLeft: false };
      } else if (currentVal === prevPrevVal) {
        return { zIndex: 0, toTheLeft: true };
      } else if (currentVal === nextNextVal) {
        return { zIndex: 0, toTheLeft: false };
      } else return { zIndex: -1, toTheLeft: null };
    }
  }

  function renderChildren() {
    const amendedChildren = [].concat(children, children, children);
    return amendedChildren.map((child, index) => {
      const currentVal = child.props.val - 1;
      return React.cloneElement(child, {
        key: index,
        zIndex: convertIndexToZIndex(currentVal).zIndex,
        toTheLeft: convertIndexToZIndex(currentVal).toTheLeft
      });
    });
  }

  const carouselSlideWidth = 200;

  const style = {
    display: "flex",
    transition: jump ? "none" : "all 300ms ease",
    transform: `translateX(${(count + cursor) * carouselSlideWidth * -1}px)`
  };

  return (
    <React.Fragment>
      <SlidesContainer>
        <div style={style} ref={carouselRef}>
          {renderChildren()}
        </div>
      </SlidesContainer>

      <CarouselControls>
        <CarouselButton margin="0 0.75em 0 0" onClick={() => changeCursor(-1)}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            style={{ height: "100%", width: "auto", color: "#4b4b4b" }}
          />
        </CarouselButton>
        <div className="carousel_pagination">
          {totalImages.map((_, index) => {
            return (
              <div
                key={index}
                className={
                  index == centerVal
                    ? "pagination_dot pagination_dot-active"
                    : "pagination_dot"
                }
              ></div>
            );
          })}
        </div>
        <CarouselButton margin="0 0 0 0.75rem" onClick={() => changeCursor(1)}>
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{ height: "100%", width: "auto", color: "#4b4b4b" }}
          />
        </CarouselButton>
      </CarouselControls>
    </React.Fragment>
  );
}
export default CarouselContents;
