import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Container, Typography } from "@mui/material";
import Hero from "../components/Hero/Hero";
import CustomCarousel from "../components/Carousel";
import ResponsiveAppBar from "../components/Navbar/Navbar";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import ContactCard from "../components/ContactCard";
import FAQs from "../components/FAQs";

const Home = () => {
  const theme = useTheme();
  const isMobile = window.innerWidth <= theme.breakpoints.values.md;

  return (
    <>
      <Hero />
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: theme.palette.secondary.main, margin: "26px 0" }}
      >
        Popular Services
      </Typography>
      <CustomCarousel deviceType={isMobile ? "mobile" : "desktop"} />
      <Testimonials />
      <HowItWorks />
      <FAQs />
      <ContactCard />
    </>
  );
};

export default Home;
