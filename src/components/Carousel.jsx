import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { homeCarouselItems } from "../dummyData";
import { Box, Typography, Card, CardMedia, useTheme } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
    slidesToSlide: 2,
  },
  miniTablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const carouselItemStyle = {
  height: "270px",
  borderRadius: "9px",
  fontSize: "21px",
  margin: "0 10px",
  display: "flex",
  alignItems: "center",
  padding: "30px 7px 7px",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  cursor: "pointer",
};

const CustomCarousel = (props) => {
  const theme = useTheme();
  return (
    <Carousel
      responsive={responsive}
      itemClass="carousel-item-padding-40-px"
      autoPlay={props.deviceType !== "mobile" ? true : false}
      autoPlaySpeed={5000}
      transitionDuration={500}
    >
      {homeCarouselItems.map((item) => (
        <Box
          key={item.id}
          sx={{
            ...carouselItemStyle,
            backgroundColor: item.bgColor,
          }}
        >
          <Typography
            sx={{
              color: theme.palette.primary.main,
              width: "100%",
              fontSize: "19px",
              fontWeight: "700",
            }}
          >
            {item.itemName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              height: "170px",
            }}
          >
            <Card sx={{ height: "100%", width: "100%", borderRadius: "7px" }}>
              <LazyLoadImage
                alt={item.itemName}
                effect="blur"
                src={item.imgUrl}
                height="170"
                width="100%"
                style={{ borderRadius: "7px" }}
              />
            </Card>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
