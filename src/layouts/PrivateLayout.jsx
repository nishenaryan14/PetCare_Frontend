import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/Navbar/Navbar";
import { Container } from "@mui/material";

const PrivateLayout = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ResponsiveAppBar showSearch={showSearch} />
      <Container
        disableGutters
        sx={{
          minHeight: "calc(100vh - 64px)",
          width: "100vw", // Ensure full viewport width
          // margin: 0,
          overflowX: "hidden", // Prevent horizontal overflow
          padding: "77px 0",
          boxSizing: "border-box", // Include padding and border in element's total width and height
        }}
      >
        {children}
        <Outlet />
      </Container>
    </>
  );
};

export default PrivateLayout;
