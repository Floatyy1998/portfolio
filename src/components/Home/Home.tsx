import "./Home.css";
import Typewriter from "typewriter-effect";
import Avatar from "@mui/material/Avatar";
import profilbilild from "../../assets/Profilbild1.jpg";
const Home = () => {
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
            marginTop: "2vh"
        }}
        className="avatar"
      />
      <h1>
        Hi, I'm <span className="name">Konrad</span>, a
      </h1>
      <Typewriter
        options={{
          strings: [
            "Fullstack Developer",
            "Web Developer",
            "Web Designer",
            "React Developer",
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
          delay: 50,
        }}
      />
    </div>
  );
};

export default Home;
