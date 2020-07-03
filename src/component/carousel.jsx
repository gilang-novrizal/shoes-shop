import React from "react";
import Slider from "react-slick";
import { Typography, Button, IconButton } from "@material-ui/core";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

export default (props) => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease",
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div style={styles.dots}>
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <div>
      <Slider {...settings} style={styles.slider}>
        {props.dataSlider !== null
          ? props.dataSlider.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    style={{
                      backgroundImage: `url(${item.images})`,
                      ...styles.card,
                    }}
                  >
                    <Typography variant="h4" style={styles.title}>
                      {item.title}
                    </Typography>
                    <Button variant="contained">
                      <StorefrontIcon />
                      Shop Now
                    </Button>
                  </div>
                </div>
              );
            })
          : null}
      </Slider>
    </div>
  );
};
const styles = {
  slider: {
    width: "100%",
    height: "100vh",
    position: "relative",
    display: "flex",
  },
  card: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    textShadow: "2px 3px 3px #333",
    marginBottom: "1rem",
  },
  next: {
    position: "absolute",
    right: "7%",
    top: "40%",
    zIndex: 3,
    color: "white",
  },
  prev: {
    position: "absolute",
    left: "7%",
    top: "40%",
    zIndex: 3,
    color: "white",
  },
  dots: {
    position: "absolute",
    bottom: "0",
    zIndex: 3,
  },
};
function NextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} style={styles.next}>
      <ArrowRightIcon />
    </IconButton>
  );
}
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton style={styles.prev} onClick={onClick}>
      <ArrowLeftIcon />
    </IconButton>
  );
}
