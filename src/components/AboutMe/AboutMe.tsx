import { TagSphere } from "react-tag-sphere";
import Title from "../Title/Title";
import "./AboutMe.css";
import bootstrap from "../../assets/tools/bootstrap.svg";
import django from "../../assets/tools/django.svg";
import docker from "../../assets/tools/docker.svg";
import flask from "../../assets/tools/flask.png";
import git from "../../assets/tools/git.svg";
import gradle from "../../assets/tools/gradle.svg";
import materialui from "../../assets/tools/materialUI.svg";
import mongodb from "../../assets/tools/mongodb.svg";
import node from "../../assets/tools/node.svg";
import postgresql from "../../assets/tools/postgresql.svg";
import react from "../../assets/tools/react.svg";
import vue from "../../assets/tools/vue.svg";
import language from "../../language/langauge";
const tags = [
  <img width={50} src={bootstrap} alt={"Random image"} />,
  <img width={50} src={django} alt={"Random image"} />,
  <img width={50} src={docker} alt={"Random image"} />,
  <img width={50} src={flask} alt={"Random image"} />,
  <img width={50} src={git} alt={"Random image"} />,
  <img width={50} src={gradle} alt={"Random image"} />,
  <img width={50} src={materialui} alt={"Random image"} />,
  <img width={50} src={mongodb} alt={"Random image"} />,
  <img width={50} src={node} alt={"Random image"} />,
  <img width={50} src={postgresql} alt={"Random image"} />,
  <img width={50} src={react} alt={"Random image"} />,
  <img width={50} src={vue} alt={"Random image"} />,
];
const AboutMe = (props) => {
  return (
    <>
      {props.language === "de" ?  language.de.aboutme.title : language.en.aboutme.title}
      <div className="aboutme-container">
        <p id="aboutme"
          style={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            padding: "20px",
            
            textAlign: "left",
          }}
        >
          {props.language === "de" ? language.de.aboutme.content : language.en.aboutme.content}
        </p>
        <p id="sphere" style={{ width: "30%" }}>
          <TagSphere
            fullWidth={true}
            fullHeight={true}
            initialSpeed={7}
            maxSpeed={7}
            radius={200}
            tags={tags}
            blur={true}
          />
        </p>
      </div>
    </>
  );
};

export default AboutMe;
