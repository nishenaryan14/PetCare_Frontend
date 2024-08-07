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
    name: "Alice Brown",
    testimonial:
      "This app helped me find the perfect pet for my family. The process was smooth and the information provided was very helpful.",
  },
  {
    name: "Bob Johnson",
    testimonial:
      "I love how easy it is to find and favorite pets around my area. The personalized care tips are a great bonus!",
  },
];

const Testimonials = () => {
  return (
    <Container sx={{ py: 5, my: 10 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        What Our Users Say
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
                — Pet App User
              </Typography>
            </Box>
          </Card>
        ))}
      </Carousel>
    </Container>
  );
};

export default Testimonials;
