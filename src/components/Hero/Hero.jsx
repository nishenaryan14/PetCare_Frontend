import { Box, Container, Typography, useTheme } from "@mui/material";
import heroImg from "../../assets/heroImg.png";
import Search from "../Search";

export default function Hero() {
  const theme = useTheme();
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "510px",
        borderRadius: "13px",
        background: "#4F7942",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={heroImg}
        className="heroimg"
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensure the image covers the container properly
          zIndex: 1,
        }}
      />
      <div
        className="overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the alpha value to control the darkness
          zIndex: 2,
        }}
      ></div>
      <Box
        className="heroContent"
        sx={{
          position: "absolute",
          zIndex: 3,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{ color: theme.palette.primary.main, marginBottom: "26px" }}
        >
          Find your <span style={{ color: "lightgreen" }}>fav</span> Pet
        </Typography>
        <Search />
      </Box>
    </Container>
  );
}
