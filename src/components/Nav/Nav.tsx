import { Box, IconButton, Stack } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CodeIcon from "@mui/icons-material/Code";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

interface NavProps {
  active: number;
}

const Nav = ({ active }: NavProps) => {
  const iconButtons = [
    {
      icon: (
        <HomeOutlinedIcon style={{ width: "45px", height: "45px" }} />
      ),
      style: {
        height: "65px",
        width: "65px",
        border: active === 1 ? "2px solid #00fed7" : "none",
        color: active === 1 ? "#00fed7" : "white",
      },
      onClick: () =>
        document.getElementById("1")?.scrollIntoView({ behavior: "smooth" }),
    },{
      icon: (
        <PersonOutlineOutlinedIcon style={{ width: "45px", height: "45px" }} />
      ),
      style: {
        height: "65px",
        width: "65px",
        border: active === 2 ? "2px solid #00fed7" : "none",
        color: active === 2 ? "#00fed7" : "white",
      },
      onClick: () =>
        document.getElementById("2")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <WorkOutlineIcon  style={{ width: "45px", height: "45px" }} />,
      style: {
        height: "65px",
        width: "65px",
        border: active === 3 ? "2px solid #00fed7" : "none",
        color: active === 3 ? "#00fed7" : "white",
      },
      onClick: () =>
        document.getElementById("3")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <CodeIcon style={{ width: "45px", height: "45px" }} />,
      style: {
        height: "65px",
        width: "65px",
        border: active === 4 ? "2px solid #00fed7" : "none",
        color: active === 4 ? "#00fed7" : "white",
      },
      onClick: () =>
        document.getElementById("4")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <MessageOutlinedIcon style={{ width: "35px", height: "35px" }} />,
      style: {
        height: "65px",
        width: "65px",
        border: active === 5 ? "2px solid #00fed7" : "none",
        color: active === 5 ? "#00fed7" : "white",
      },
      onClick: () =>
        document.getElementById("5")?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        position: "absolute",
        bottom: "16px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Box
        sx={{
          width: "400px",
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
