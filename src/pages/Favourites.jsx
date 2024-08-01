import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, Paper, Skeleton, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { fetchFavoritePets } from "../apiCalls";

const Favourites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFavoritePets(user?.id);
      setFavorites(data);
    } catch (err) {
      setError("Failed to fetch favorite pets.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Favorite Pets
      </Typography>
      {loading ? (
        <Grid container spacing={2}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  height: "100%",
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
                <Skeleton variant="text" width="60%" />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {favorites.length === 0 ? (
            <Typography variant="h6" sx={{ padding: 2 }}>
              No favorite pets found.
            </Typography>
          ) : (
            favorites.map((pet, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    height: "100%",
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Typography variant="h6" component="div">
                    {pet.breed}
                  </Typography>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Favourites;
