import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  { title: "Step 1", description: "Sign up and create your profile." },
  {
    title: "Step 2",
    description: "Browse available nurses and book an appointment.",
  },
  { title: "Step 3", description: "Receive top-notch care at your home." },
];

const HowItWorks = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        How It Works
      </Typography>
      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid item key={index} xs={12} sm={4}>
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
