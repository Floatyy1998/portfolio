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
const Experiences = () => {
  var items = [
    {
      name: "Serien Ranking",
      description: "Probably the most random thing you have ever seen!",
      image: serienRanking,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <>
      <Title title={"Projects"} />
      <div className="projects-container">
        <Carousel
          swipe={true}
          className="test2"
          interval={10000}
          navButtonsAlwaysVisible={true}
          indicators={true}
          height={"100%"}
          animation="fade"
          duration={500}
          autoPlay={false}
        
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
        marginTop:"auto",
        borderRadius: "30px",
        backgroundColor: "rgba(0,0,0,0.9)",
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height={"30%"} image={props.item.image} />
        <CardContent sx={{ height: "70%" }}>
          <Typography gutterBottom variant="h5" component="div" style={{paddingTop:"5%",paddingBottom:"5%",height:"20%",border:"1px solid #222", borderRadius:"10px"}}>
            {props.item.name}
          </Typography>
          <Typography variant="body2" style={{paddingTop:"15%",paddingBottom:"15%",height:"80%",border:"1px solid #222", borderRadius:"10px"}} >
            {props.item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="primary">
          Github
        </Button>
        <Button size="large">Demo</Button>
      </CardActions>
    </Card>
  );
}

export default Experiences;
