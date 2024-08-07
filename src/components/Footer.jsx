import React from "react";
import {
  Container,
  Typography,
  Grid,
  Link,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#282c34", color: "#ffffff", py: 6 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Pet Match
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Helping you find the perfect pet in your area and offering
              comprehensive care advice to ensure your pet's happiness and
              health.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Box>
              <Link
                href="#"
                variant="body2"
                color="inherit"
                display="block"
                sx={{ mb: 1, "&:hover": { textDecoration: "underline" } }}
              >
                About Us
              </Link>
              <Link
                href="#"
                variant="body2"
                color="inherit"
                display="block"
                sx={{ mb: 1, "&:hover": { textDecoration: "underline" } }}
              >
                Services
              </Link>
              <Link
                href="#"
                variant="body2"
                color="inherit"
                display="block"
                sx={{ mb: 1, "&:hover": { textDecoration: "underline" } }}
              >
                Contact Us
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton href="#" color="inherit">
                <Facebook sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: "#444" }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} Pet Match. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
