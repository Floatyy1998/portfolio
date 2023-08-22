import "./Home.css";
import Typewriter from "typewriter-effect";
const Home = () => {
  return (
    <div className="home-container">
        <h1>Hi,<br/> I'm <span className="name">Konrad</span>, a</h1>
     <Typewriter
              options={{
              strings: ['Fullstack Developer','Web Developer', 'Web Designer', 'React Developer'],
              autoStart: true,
              loop: true,
              deleteSpeed:50,
              delay:50
              
              }}
            />
    </div>
  );
};

export default Home;
