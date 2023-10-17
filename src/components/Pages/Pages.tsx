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
 
  useEffect(() => {
   
    if (navigator.languages&&navigator.languages.length!==0) {
     setLanguage(navigator.languages[0].slice(0,2));

     
    }
  }, []);
  const [page, setPage] = React.useState(0);
  const [clickable, setClickable] = React.useState(true);
  const [language , setLanguage] = React.useState("en");
  

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
        mobileTouch={true}
        animation="cubeAnimation"
        onTransitionRequest={(e) => setPage(e.nextIndex)}
        onTransitionStart={(e) => setClickable(false)}
        onTransitionEnd={(e) => setClickable(true)}
       
      >
        <div>
          <Home language={language} setActive={(page) => setPage(page)} />
        </div>
        <div>
          <AboutMe language={language}/>
        </div>
        <div>
          <Experiences language={language}/>
        </div>
        <div>
          <Projects language={language}/>
        </div>
        <div>
          <Contact language={language}/>
        </div>
      </AwesomeSlider>
      <Nav  active={page} setActive={(page) => setPage(page)} clickable={clickable} />

      <InfoButton />
    </>
  );
};

export default Pages;
