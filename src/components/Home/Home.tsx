import "./Home.css";
import Typewriter from "typewriter-effect";
import Avatar from "@mui/material/Avatar";
import profilbilild from "../../assets/Profilbild1.jpg";
import language from "../../language/langauge";
import { Button } from "@mui/material";
const Home = (props) => {
  return (
    <div className="home-container">
      <Avatar
        alt="Remy Sharp"
        src={profilbilild}
        sx={{
          width: "20vh",
          height: "20vh",
          border: "2px solid #00fed7",
          boxShadow:
            "rgba(0,212,255, 0.5) 12px 11px 20px 0px, rgba(0,212,255, 0.5) -5px -5px 20px 0px",
          marginTop: "2vh",
        }}
        className="avatar"
      />
      {props.language === "de"
        ? language.de.home.content.name
        : language.en.home.content.name}
      <Typewriter
        options={{
          strings:
            props.language === "de"
              ? language.de.home.content.titles
              : language.en.home.content.titles,
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
          delay: 50,
        }}
      />
      <Button
        id="contactBtn"
        variant="outlined"
        className="btn"
        onClick={() => {
          props.setActive(4);
        }}
      >
        {props.language === "de"
          ? language.de.home.content.button
          : language.en.home.content.button}
      </Button>
    </div>
  );
};

export default Home;
