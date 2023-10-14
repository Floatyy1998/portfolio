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
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";

const Pages = () => {
  const [page, setPage] = React.useState(0);

  const handleInView = (inView: boolean, entry: any) => {
    if (inView) {
      setPage(parseInt(entry.target.id));
      console.log(entry.target.id);
    }
  };

  return (
    <>
      <AwesomeSlider
        bullets={false}
        fillParent={true}
        selected={page}
        mobileTouch={false}
        animation="cubeAnimation"
        onTransitionRequest={(e) => setPage(e.nextIndex)}
       
      >
        <div>
          <Home />
        </div>
        <div>
          <AboutMe />
        </div>
        <div>
          <Experiences />
        </div>
        <div>
          <Projects />
        </div>
        <div>
          <Contact />
        </div>
      </AwesomeSlider>
      <Nav active={page} setActive={(page) => setPage(page)} />

      <InfoButton />
    </>
  );
};

export default Pages;
