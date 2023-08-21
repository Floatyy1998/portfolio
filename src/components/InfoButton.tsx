import SpeedDial from "@mui/material/SpeedDial";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import "../Styles/InfoButton.css"

const InfoButton = () => {
  const actions = [
    { icon: <LinkedInIcon />, name: "LinkedIn" },
    { icon: <GitHubIcon />, name: "Github" },
    { icon: <ArticleOutlinedIcon />, name: "CV" },
  ];
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      direction="down"
      
      sx={{ position: "absolute", top: 16, right: 16 }}
      icon={<InfoOutlinedIcon style={{ width: "40px", height: "40px",  }} />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};
export default InfoButton;
