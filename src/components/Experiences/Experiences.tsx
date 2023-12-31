import Title from "../Title/Title";
import "./Experiences.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React from "react";
import { Box } from "@mui/material";
import language from "../../language/langauge";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="tab-panel"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="tab-panel-content"
            style={{
              width: "80%",
              height: "100%",
              border: "1px solid #00fed7",
              borderRadius: "20px",
            }}
          >
            {children}
          </div>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Experiences = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div style={{width:"100%"}}>
     {props.language === "de" ? language.de.experiences.title : language.en.experiences.title}
      <div className="experiences-container">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab label="HABA" {...a11yProps(0)} />
          <Tab label="KAPP" {...a11yProps(1)} />
          <Tab label="HUK-Coburg" {...a11yProps(2)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          {props.language === "de" ? language.de.experiences.content.haba : language.en.experiences.content.haba}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {props.language === "de" ? language.de.experiences.content.kapp : language.en.experiences.content.kapp}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
         {props.language === "de" ? language.de.experiences.content.huk : language.en.experiences.content.huk}
        </CustomTabPanel>
      </div>
    </div>
  );
};

export default Experiences;
