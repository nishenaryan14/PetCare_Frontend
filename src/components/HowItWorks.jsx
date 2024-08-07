import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  { title: "Step 1", description: "Sign up and create your profile." },
  {
    title: "Step 2",
    description: "Browse available pets around your location.",
  },
  { title: "Step 3", description: "Add your favorite pets to your list." },
  {
    title: "Step 4",
    description: "Get personalized pet care tips and advice.",
  },
];

const HowItWorks = () => {
  return (
    <Container sx={{ py: 5, my: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        How It Works
      </Typography>
      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Box textAlign="center">
              <CheckCircleIcon sx={{ color: "green" }} fontSize="large" />
              <Typography variant="h6" gutterBottom>
                {step.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {step.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorks;
