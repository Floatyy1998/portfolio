import SpeedDial from "@mui/material/SpeedDial";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import "./InfoButton.css";

const InfoButton = () => {
  const actions = [
    {
      icon: <LinkedInIcon />,
      name: "LinkedIn",
      onclick: () => {
        window
          .open(
            "https://www.linkedin.com/in/konrad-dinges-803098296/",
            "_blank"
          )
          ?.focus();
      },
    },
    {
      icon: <GitHubIcon />,
      name: "Github",
      onclick: () => {
        window.open("https://www.github.com/Floatyy1998", "_blank")?.focus();
      },
    },
    { icon: <ArticleOutlinedIcon />, name: "CV", onclick: () => {} },
  ];
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      direction="left"
      icon={
        <InfoOutlinedIcon
          className="info"
          style={{ width: "40px", height: "40px" }}
        />
      }
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onclick}
        />
      ))}
    </SpeedDial>
  );
};
export default InfoButton;
