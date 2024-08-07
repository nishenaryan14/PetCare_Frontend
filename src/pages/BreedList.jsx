import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Favorite, FavoriteBorder, ExpandMore } from "@mui/icons-material";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { getCity } from "../apiCalls";
import { useAuth } from "../context/AuthContext";
import { fetchFavoritePets } from "../apiCalls";

const BreedList = () => {
  const { query } = useParams();
  const location = useLocation();
  const { state } = location;
  const routerLocation = state?.location;
  const { user, userLocation: contextLocation } = useAuth();

  const [favorites, setFavorites] = useState({});
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const addFavoritePet = async (animal, breed, climate) => {
    try {
      const formData = new FormData();
      formData.append("animal", animal);
      formData.append("breed", breed);
      formData.append("climate", climate);

      const response = await axios.post(
        // `http://192.168.38.17:8000/add-favorite-pet/${user?.id}/`,
        `https://petcare-backend-kp9t.onrender.com/add-favorite-pet/${user?.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding favorite pet:", error);
      throw error;
    }
  };

  const handleFavoriteToggle = async (index, breed) => {
    try {
      const isFavorite = favorites[index];
      if (!isFavorite) {
        await addFavoritePet(
          breed.animal || "dog",
          breed.breed,
          "randomClimate"
        );
      }
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [index]: !prevFavorites[index],
      }));
    } catch (error) {
      console.error("Error updating favorite pet:", error);
    }
  };

  const handleAccordionToggle = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : null);
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        // let url = `http://192.168.38.17:8000/suggest-breed/`;
        let url = `https://petcare-backend-kp9t.onrender.com/suggest-breed/`;
        let location = routerLocation || contextLocation;

        if (location) {
          const { latitude, longitude } = location;
          const city = await getCity(latitude, longitude);
          url += `?location=${encodeURIComponent(city)}`;
        }

        const response = await axios.get(url);
        setBreeds(response.data.suitable_breeds);

        if (!localStorage.getItem("userLocation")) {
          localStorage.setItem("userLocation", JSON.stringify(location));
        }
      } catch (error) {
        console.error("Error fetching breeds:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadFavorites = async () => {
      try {
        if (user?.id) {
          const favoritePets = await fetchFavoritePets(user.id);
          const favoritesMap = favoritePets.reduce((acc, pet) => {
            acc[pet.breed] = true;
            return acc;
          }, {});
          setFavorites(favoritesMap);
        }
      } catch (error) {
        console.error("Error loading favorite pets:", error);
      }
    };

    fetchBreeds();
    loadFavorites();
  }, [query, routerLocation, contextLocation, user?.id]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Breed List
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2, // space between cards
        }}
      >
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 16px)", // half-width on small screens, with a gap of 16px
                    md: "calc(33.33% - 16px)", // third-width on medium screens, with a gap of 16px
                    lg: "calc(25% - 16px)", // quarter-width on large screens, with a gap of 16px
                  },
                  mb: 2,
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    height: "maxContent",
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={160}
                    sx={{ mb: 2 }}
                  />
                  <Skeleton variant="text" sx={{ mb: 1 }} />
                </Paper>
              </Box>
            ))
          : breeds.map((breed, index) => (
              <Box
                key={index}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 16px)",
                    md: "calc(33.33% - 16px)",
                    lg: "calc(25% - 16px)",
                  },
                  mb: 2,
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    height: "maxContent",
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 160,
                      mb: 2,
                      overflow: "hidden",
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      src={breed.image_url || "/default-image.png"}
                      alt={breed.breed}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      onClick={() => handleFavoriteToggle(index, breed)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        borderRadius: "50%",
                        padding: 1,
                        transition: "color 0.3s, transform 0.3s",
                        color: favorites[breed.breed] ? "red" : "grey",
                        "&:hover": {
                          color: favorites[breed.breed]
                            ? "darkred"
                            : "darkgrey",
                          transform: "scale(1.2)",
                        },
                      }}
                    >
                      {favorites[breed.breed] ? (
                        <Favorite />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </Box>
                  <Typography variant="h6" component="div">
                    {breed.breed}
                  </Typography>
                  <Box sx={{ flex: 1, overflow: "hidden" }}>
                    <Accordion
                      expanded={expanded === index}
                      onChange={handleAccordionToggle(index)}
                      sx={{ mt: 2 }}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle1">Description</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">
                          {breed.description || "No description available."}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Paper>
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default BreedList;
