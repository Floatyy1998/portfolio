import { Box, IconButton, Stack } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CodeIcon from "@mui/icons-material/Code";
import MessageIcon from "@mui/icons-material/Message";
import { Avatar } from "@mui/material";
import killua from "../assets/killua.jpg";

interface NavProps {
  active: number;
}

const Nav = ({ active }: NavProps) => {
  const iconButtons = [
    {
      icon: (
        <Avatar
          alt="Konrad"
          src={killua}
          style={{ width: "45px", height: "45px" }}
        />
      ),
      style: {
        height: "65px",
        width: "65px",
        border: active === 1 ? "2px solid cyan" : "none",
        color: active === 1 ? "cyan" : "white",
      },
      onClick: () =>
        document.getElementById("1")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <PsychologyIcon style={{ width: "45px", height: "45px" }} />,
      style: {
        height: "65px",
        width: "65px",
        border: active === 2 ? "2px solid cyan" : "none",
        color: active === 2 ? "cyan" : "white",
      },
      onClick: () =>
        document.getElementById("2")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <CodeIcon style={{ width: "45px", height: "45px" }} />,
      style: {
        height: "65px",
        width: "65px",
        border: active === 3 ? "2px solid cyan" : "none",
        color: active === 3 ? "cyan" : "white",
      },
      onClick: () =>
        document.getElementById("3")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <MessageIcon style={{ width: "35px", height: "35px" }} />,
      style: {
        height: "65px",
        width: "65px",
        border: active === 4 ? "2px solid cyan" : "none",
        color: active === 4 ? "cyan" : "white",
      },
      onClick: () =>
        document.getElementById("4")?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        position: "absolute",
        bottom: "16px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "400px",
          margin: "auto",
          background: "rgba(0,0,0,0.9)",
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
