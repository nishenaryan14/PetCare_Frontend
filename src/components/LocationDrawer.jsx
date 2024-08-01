import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_KEY = "0baf619fe59b8580a66ba803f19cc246";
const API_URL = "http://api.openweathermap.org/data/2.5/find";

export const LocationDrawer = ({
  setLocationDrawerOpen,
  locationDrawerOpen,
}) => {
  const { userLocation, updateUserLocation } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const displayLocation =
    typeof userLocation === "string" ? userLocation : "Location not available";

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: query,
            type: "like",
            sort: "population",
            cnt: 2,
            appid: API_KEY,
          },
        });
        setSearchResults(response.data.list.map((city) => city.name));
        event.target.value("");
        // console.log(response.data.list.map((city) => city.name));
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
      setLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  const handleLocationSelect = (location) => {
    updateUserLocation(location);
    setLocationDrawerOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={locationDrawerOpen}
      onClose={() => setLocationDrawerOpen(false)}
    >
      <Box
        sx={{ width: 300, p: 2 }}
        role="presentation"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          User Location
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <MyLocationIcon sx={{ mr: 1 }} />
          <Typography variant="body1">{displayLocation}</Typography>
        </Box>

        <TextField
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for cities..."
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <List>
            {searchResults.map((result, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleLocationSelect(result)}
              >
                <ListItemText primary={result} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
};
