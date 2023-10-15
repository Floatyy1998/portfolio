import { Box, IconButton, Stack } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CodeIcon from "@mui/icons-material/Code";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "./Nav.css";

interface NavProps {
  active: number;
}

const Nav = (props) => {
  const iconButtons = [
    {
      icon: <HomeOutlinedIcon style={{ width: "45px", height: "45px" }} />,
      style: {
        height: "65px",
        width: "65px",
        border: props.active === 0 ? "2px solid #00fed7" : "none",
        color: props.active === 0 ? "#00fed7" : "white",
        
      },
      onClick: (e) => {
        props.setActive(0);
        
      },
      
    },
    {
      icon: (
        <PersonOutlineOutlinedIcon style={{ width: "45px", height: "45px" }} />
      ),
      style: {
        height: "65px",
        width: "65px",
        border: props.active === 1 ? "2px solid #00fed7" : "none",
        color: props.active === 1 ? "#00fed7" : "white",
      },
      onClick: () => props.setActive(1),
    },
    {
      icon: <WorkOutlineIcon style={{ width: "45px", height: "45px" }} />,
      style: {
        height: "65px",
        width: "65px",
        border: props.active === 2 ? "2px solid #00fed7" : "none",
        color: props.active === 2 ? "#00fed7" : "white",
      },
      onClick: () => props.setActive(2),
    },
    {
      icon: <CodeIcon style={{ width: "45px", height: "45px" }} />,
      style: {
        height: "65px",
        width: "65px",
        border: props.active === 3 ? "2px solid #00fed7" : "none",
        color: props.active === 3 ? "#00fed7" : "white",
      },
      onClick: () => props.setActive(3),
    },
    {
      icon: <MessageOutlinedIcon style={{ width: "35px", height: "35px" }} />,
      style: {
        height: "65px",
        width: "65px",
        border: props.active === 4 ? "2px solid #00fed7" : "none",
        color: props.active === 4 ? "#00fed7" : "white",
      },
      onClick: () => props.setActive(4),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",

        position: "absolute",
        bottom: "16px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "end",
      }}
      id="nav-container"
    >
      <Box
        id="nav"
        sx={{
          width: "400px",
          maxWidth: "95%",
          margin: "0 auto",
          background: "rgba(0,0,0,0.5)",
          height: "100%",
          borderRadius: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.55)",
        }}
      >
        <Stack
          direction="row"
          style={{
            width: "400px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {iconButtons.map(({ icon, style, onClick }, index) => (
            <IconButton
              key={index}
              style={style}
              onClick={onClick}
              aria-label="delete"
              disabled={!props.clickable}
            >
              {icon}
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Nav;
