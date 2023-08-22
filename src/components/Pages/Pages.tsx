import React, { useEffect, useRef } from "react";
import "./Pages.css";
import { InView } from "react-intersection-observer";

import Nav from "../Nav/Nav";
import InfoButton from "../InfoButton/InfoButton";
import Home from "../Home/Home";
import AboutMe from "../AboutMe/AboutMe";
import Experiences from "../Experiences/Experiences";
import Projects from "../Projects/Projects";
import Contact from "../Contact/Contact";

const Pages = () => {
  const [page, setPage] = React.useState(1);

  const handleInView = (inView: boolean, entry: any) => {
    if (inView) {
      setPage(parseInt(entry.target.id));
      console.log(entry.target.id);
    }
  };

  return (
    <>
      <Nav active={page} />

      <InfoButton />
      <div className="container ">
        <InView
          className="stop home"
          id="1"
          as="div"
          threshold={0.7}
          onChange={(inView, entry) => handleInView(inView, entry)}
        >
          <Home />
        </InView>
        <InView
          className="stop"
          id="2"
          as="div"
          threshold={0.7}
          onChange={(inView, entry) => handleInView(inView, entry)}
        >
          <AboutMe/>
        </InView>
        <InView
          className="stop"
          id="3"
          as="div"
          threshold={0.7}
          onChange={(inView, entry) => handleInView(inView, entry)}
        >
          <Experiences/>
        </InView>
        <InView
          className="stop"
          id="4"
          as="div"
          threshold={0.7}
          onChange={(inView, entry) => handleInView(inView, entry)}
        >
          <Projects/>
        </InView>
        <InView
          className="stop"
          id="5"
          as="div"
          threshold={0.7}
          onChange={(inView, entry) => handleInView(inView, entry)}
        >
          <Contact/>
        </InView>
      </div>
    </>
  );
};

export default Pages;
