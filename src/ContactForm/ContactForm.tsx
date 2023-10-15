import React, { useState, useEffect } from "react";
import { Typography, Grid, Button, TextField } from "@mui/material";
import validator from "validator";
import emailjs from "emailjs-com";

import "./ContactForm.css";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [mailError, setMailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => emailjs.init(process.env.REACT_APP_EMAILJS_PUBLICKEY), []);
  // Add these
  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICEID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATEID;
    setMailError(false);
    setSubjectError(false);
    setMessageError(false);
    setErrorMessage("");

    const mail = e.target[0].value;
    const subject = e.target[2].value;
    const message = e.target[4].value;
    if (!validator.isEmail(mail)) {
      setErrorMessage("Please enter a valid email");
      setMailError(true);
      return;
    } else if (validator.isEmpty(subject)) {
      setErrorMessage("Please enter a subject");
      setSubjectError(true);
      return;
    } else if (validator.isEmpty(message)) {
      setErrorMessage("Please enter a message");
      setMessageError(true);
      return;
    }

    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        subject: subject,
        "from-mail": mail,
        message: message,
      });
      alert("email successfully sent.");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      e.target.reset();
    }
  };
  return (
    <div style={{ width: "95%", height: "92%", margin: "auto" }}>
      <form className="for" onSubmit={handleSubmit}>
        <div className="form_group">
          <TextField
            required
            label="email"
            error={mailError}
            helperText={mailError && errorMessage}
            type="text"
          />
        </div>
        <div className="form_group">
          <TextField
            type="text"
            label="subject"
            name="subject"
            id="subject"
            error={subjectError}
            helperText={subjectError && errorMessage}
          />
        </div>
        <div className="form_group">
          <TextField
            className="message"
            type="text"
            label="message"
            multiline
            id="message"
            error={messageError}
            helperText={messageError && errorMessage}
            itemID="message"
          />
        </div>
        <Button
          id="testen"
          variant="outlined"
          className="btn"
          disabled={loading}
          type="submit"
        >
          send
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
