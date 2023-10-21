import Title from "../Title/Title";
import "./Projects.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "./styles.css";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import serienRanking from "../../assets/serienranking.png";
import portfolio from "../../assets/portfolio.png";
import language from "../../language/langauge";
import dogr from "../../assets/dogr.png";
import shoppinglist from "../../assets/shoppinglist.png";

const Experiences = (props) => {
  useEffect(() => {
    for (
      let index = 0;
      index < document.getElementsByClassName("Card").length;
      index++
    ) {
      let x = document.getElementsByClassName("Card")[index].parentNode
        .parentNode as HTMLElement;
      if (x.style.display === "block") {
        console.log(index);
      }
    }
  }, []);
  var items = [
    {
      name:
        props.language === "de"
          ? language.de.projects.content.serienRanking.name
          : language.en.projects.content.serienRanking.name,
      description:
        props.language === "de"
          ? language.de.projects.content.serienRanking.description
          : language.en.projects.content.serienRanking.description,
      image: serienRanking,
      github: "https://github.com/Floatyy1998/Serien-Ranking",
      demo: "https://serien.konrad-dinges.de",
    },
    {
      name:
        props.language === "de"
          ? language.de.projects.content.portfolio.name
          : language.en.projects.content.portfolio.name,
      description:
        props.language === "de"
          ? language.de.projects.content.portfolio.description
          : language.en.projects.content.portfolio.description,
      image: portfolio,
      github: "https://github.com/Floatyy1998/portfolio",
      demo: "https://konrad-dinges.de",
    },
    {
      name:
        props.language === "de"
          ? language.de.projects.content.dogr.name
          : language.en.projects.content.dogr.name,
      description:
        props.language === "de"
          ? language.de.projects.content.dogr.description
          : language.en.projects.content.dogr.description,
      image: dogr,
      github: "https://github.com/dogr-org",
      demo: "null",
    },
    {
      name:
        props.language === "de"
          ? language.de.projects.content.shoppinglist.name
          : language.en.projects.content.shoppinglist.name,
      description:
        props.language === "de"
          ? language.de.projects.content.shoppinglist.description
          : language.en.projects.content.shoppinglist.description,
      image: shoppinglist,
      github: "https://github.com/Floatyy1998/ShoppingList",
      demo: "https://einkaufen.konrad-dinges.de",
    },
  ];

  return (
    <>
      {props.language === "de"
        ? language.de.projects.title
        : language.en.projects.title}
      <div className="projects-container">
        <Carousel
          swipe={true}
          className="carousel"
          interval={10000}
          navButtonsAlwaysVisible={true}
          indicators={true}
          height={"100%"}
          animation="fade"
          duration={500}
          autoPlay={true}
          navButtonsWrapperProps={{
            // Move the buttons to the bottom. Unsetting top here to override default style.
            className: "carousel-buttons-wrapper",
         
          }}
          navButtonsProps={{
            className: "carousel-buttons",
           
          }}
          indicatorIconButtonProps={{
            style: {
              margin: "5px", // 1
            },
          }}
          activeIndicatorIconButtonProps={{
            className: "active", // 2
          }}
        >
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </div>
    </>
  );
};
function Item(props) {
  return (
    <Card
      className="Card"
      sx={{
        height: "100%",
        background: "none",
        width: "100vw",

        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxShadow:
          "rgba(0,212,255, 0.5) 12px 11px 20px 0px, rgba(0,212,255, 0.5) -5px -5px 20px 0px",
        border: "1px solid black",
        marginTop: "auto",
        borderRadius: "30px",
        backgroundColor: "rgba(0,0,0,0.9)",
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height={"30%"} image={props.item.image} />
        <CardContent sx={{ height: "70%" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              paddingTop: "1%",
              paddingBottom: "5%",
              height: "20%",
              border: "1px solid #222",
              borderRadius: "10px",
            }}
          >
            {props.item.name}
          </Typography>
          <Typography
            variant="body2"
            style={{
              paddingTop: "1%",
              paddingBottom: "1%",
              height: "80%",
              border: "1px solid #222",
              borderRadius: "10px",
            }}
          >
            {props.item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="large"
          color="primary"
          onClick={() => {
            window.open(props.item.github, "_blank");
          }}
        >
          Github
        </Button>
        <Button
          onClick={() => {
            window.open(props.item.demo, "_blank");
          }}
          size="large"
        >
          Demo
        </Button>
      </CardActions>
    </Card>
  );
}

export default Experiences;
