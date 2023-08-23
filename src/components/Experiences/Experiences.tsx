import Title from "../Title/Title";
import "./Experiences.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React from "react";
import { Box } from "@mui/material";
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
          <div className="tab-panel-content"
            style={{
              width: "40%",
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
const Experiences = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Title title={"Experiences"} />
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
          <div className="header">
            IT Internship
            <span style={{ color: "#62efff", marginLeft: "5px" }}>
              <a
                className="link"
                href="https://habafamilygroup.com/"
                target="_blank"
                rel="noreferrer"
              >
                @Haba
              </a>
            </span>
          </div>
          <div className="date">
            <div>Oct 2013</div>
          </div>
          <ul className="ul">
            <li className="li">
              <b>Type:</b> Internship
            </li>
            <li className="li">
              Learned basic programming principles and algorithms with Java
            </li>
            <li className="li">
              Gained first insights into the everyday professional life of a
              software developer
            </li>
          </ul>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </div>
    </>
  );
};

export default Experiences;
