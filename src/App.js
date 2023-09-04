import React from "react";
import Navigation from "./Navigation";
import "./App.css";
import Carousel from "./Carousel";
import styled from "styled-components";

export default function App() {
  const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:83px;
`;

  const navigationItems = [
    {
      title: "Home",
      link: "/home"
    },
    {
      title: "Electronics",
      link: "/electronics"
    },
    {
      title: "Books",
      link: "/books"
    },
    {
      title: "Music",
      link: "/music"
    },
    {
      title: "Movies",
      link: "/movies"
    },
    {
      title: "Clothing",
      link: "/clothing"
    },
    {
      title: "Games",
      link: "/games"
    },
    {
      title: "Furniture",
      link: "/furniture"
    }
  ];
  const contents = [
    {
      id: 1,
      img: "./images/brazil.jpg",
      alt: 'Brazil',
    },
    {
      id: 2,
      img: "./images/china.jpg",
      alt: 'China',
    },
    {
      id: 3,
      img: "./images/france.jpg",
      alt: 'France',
    },
    {
      id: 4,
      img: "./images/japan.jpg",
      alt: 'Japan',
    },
    {
      id: 5,
      img: "./images/norway.jpg",
      alt: "Norway",
    }
  ]

  return (<React.Fragment>
    <Navigation fullNavArray={navigationItems} />
    <Container>
      <Carousel contents={contents} />
    </Container>
  </React.Fragment>
  );
}
