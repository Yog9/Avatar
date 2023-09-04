import React from "react";
import styled, { css } from "styled-components";

const Slide = styled.div`
  width: 200px;
  height: 200px;
  background-color: #cfcfcf;
  color: white;
  padding: 5px;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 300ms ease-in-out;
  box-sizing: border-box;
  border-radius: 40%;
  box-shadow: 10px 10px 41px 0px rgba(0, 0, 0, 0.1);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  ${(props) =>
    props.zIndex === 2 &&
    css`
      z-index: 2;
      transform: scale(1);
      transition: 300ms ease-in-out;
    `}
  ${(props) =>
    props.zIndex === 1 &&
    css`
      z-index: 1;
      transform: translateX(${(props) => (props.toTheLeft ? "25%" : "-25%")})
        scale(0.7);
      transition: 300ms ease-in-out;
    `};
  ${(props) =>
    props.zIndex === 0 &&
    css`
      z-index: 0;
      transform: translateX(${(props) => (props.toTheLeft ? "55%" : "-50%")})
        scale(0.5);
      transition: 300ms ease-in-out;
    `};
  ${(props) =>
    props.zIndex === -1 &&
    css`
      opacity: 0;
      z-index: -1;
      transform: translateX(${(props) => (props.toTheLeft ? "55%" : "-50%")})
        scale(0.4);
      transition: 300ms ease-in-out;
    `};
`;

function CarouselSlide({ toTheLeft, zIndex, children }) {
  // toTheLeft is used to determine translateX direction.
  return (
    <Slide toTheLeft={toTheLeft} zIndex={zIndex}>
      {children}
    </Slide>
  );
}

export default CarouselSlide;
