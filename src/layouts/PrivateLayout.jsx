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
    <div className="custom-scrollbar">
      <ResponsiveAppBar showSearch={showSearch} />
      <Container
        disableGutters
        sx={{
          minHeight: "calc(100vh - 64px)",
          width: "100vw",
          padding: "77px 0",
        }}
      >
        {children}
        <Outlet />
      </Container>
    </div>
  );
};

export default PrivateLayout;
