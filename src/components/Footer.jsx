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
              CareBuddy
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Your trusted partner in home nursing care, offering compassionate
              and professional services at your doorstep.
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
            &copy; {new Date().getFullYear()} CareBuddy. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
