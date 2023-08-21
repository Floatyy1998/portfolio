import React, { useEffect, useRef } from "react";
import "../Styles/Pages.css";
import { InView } from "react-intersection-observer";

import Nav from "./Nav";
import InfoButton from "./InfoButton";

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
      <div className="container">
        <InView
          id="1"
          as="div"
          threshold={1}
          onChange={(inView, entry) => handleInView(inView, entry)}
        >
          <div>{`1`}</div>
        </InView>
        <InView
          id="2"
          as="div"
          threshold={1}
          onChange={(inView, entry) => handleInView(inView, entry)}
        >
          <div>{`2`}</div>
        </InView>
        <InView
          id="3"
          as="div"
          threshold={1}
          onChange={(inView, entry) => handleInView(inView, entry)}
        >
          <div>{`3`}</div>
        </InView>
        <InView
          id="4"
          as="div"
          threshold={1}
          onChange={(inView, entry) => handleInView(inView, entry)}
        >
          <div>{`4`}</div>
        </InView>
      </div>
    </>
  );
};

export default Pages;
