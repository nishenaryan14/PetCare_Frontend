import React, { useState } from "react";
import {
  Box,
  useTheme,
  TextField,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Media queries for responsive design
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLg = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("lg"));

  const fetchUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const handleSearch = async () => {
    try {
      const location = await fetchUserLocation();
      console.log(location);
      navigate(`/breedList/${searchQuery}`, { state: { location } });
    } catch (error) {
      console.error("Error fetching user location:", error);
      navigate(`/breedList/${searchQuery}`);
    }
  };

  // Define width based on viewport size
  let width;
  if (isXs) {
    width = "90%";
  } else if (isSm) {
    width = "75%";
  } else if (isMd) {
    width = "60%";
  } else if (isLg) {
    width = "50%";
  } else if (isXl) {
    width = "40%";
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        minWidth: "300px",
        maxWidth: "600px", // Set a max-width to prevent it from becoming too large
        margin: "0 auto",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search Here..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            backgroundColor: "#fff",
            borderRadius: "8px",
          },
        }}
        fullWidth
      />
    </Box>
  );
};

export default Search;
