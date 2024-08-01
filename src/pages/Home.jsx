import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Container, Typography } from "@mui/material";
import Hero from "../components/Hero/Hero";
import CustomCarousel from "../components/Carousel";
import ResponsiveAppBar from "../components/Navbar/Navbar";

const Home = () => {
  const theme = useTheme();
  const isMobile = window.innerWidth <= theme.breakpoints.values.md;

  return (
    <>
      <Hero />
      <Typography
        variant="h4"
        sx={{ color: theme.palette.secondary.main, margin: "26px 0" }}
      >
        Popular Services
      </Typography>
      <CustomCarousel deviceType={isMobile ? "mobile" : "desktop"} />
    </>
  );
};

export default Home;
