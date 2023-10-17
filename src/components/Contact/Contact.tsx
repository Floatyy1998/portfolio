import ContactForm from "../../ContactForm/ContactForm";
import Title from "../Title/Title";
import "./Contact.css";
import language from "../../language/langauge";
const Experiences = (props) => {
   
  return (
    <>
    {props.language === "de" ? language.de.contact.title : language.en.contact.title}
    <div className="contact-container">
     <ContactForm language={props.language}/>
    </div>
    </>
  );
};

export default Experiences;
