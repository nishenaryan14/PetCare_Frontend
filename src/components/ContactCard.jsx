import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const ContactCard = () => {
  return (
    <Container sx={{ py: 5, my: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        Contact Us
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box component="form">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "green", color: "white" }}
              fullWidth
            >
              Send Message
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactCard;
