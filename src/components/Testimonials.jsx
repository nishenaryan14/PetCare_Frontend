import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

const testimonials = [
  {
    name: "John Doe",
    testimonial:
      "CareBuddy provided excellent care for my father. The service was professional and attentive, making a difficult time much easier.",
  },
  {
    name: "Jane Smith",
    testimonial:
      "Highly professional and compassionate service. The nurses were always on time and provided top-notch care with a personal touch.",
  },
];

const Testimonials = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        What Our Clients Say
      </Typography>
      <Carousel
        autoPlay
        interval={5000}
        indicators={false}
        navButtonsAlwaysVisible
        sx={{ position: "relative" }}
      >
        {testimonials.map((item, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 600,
              margin: "auto",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                {item.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                {item.testimonial}
              </Typography>
            </CardContent>
            <Divider />
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body2" color="textSecondary">
                — CareBuddy Client
              </Typography>
            </Box>
          </Card>
        ))}
      </Carousel>
    </Container>
  );
};

export default Testimonials;
