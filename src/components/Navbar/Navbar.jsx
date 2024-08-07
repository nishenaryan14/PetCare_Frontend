import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Menu,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Pets as PetsIcon,
  Search as SearchIcon,
  LocationOn as LocationOnIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LocationDrawer } from "../LocationDrawer";

const pages = ["Breeds", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar({ showSearch }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationDrawerOpen, setLocationDrawerOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleOpenNavMenu = () => {
    setDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setDrawerOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Avoid empty searches

    try {
      const location = await fetchUserLocation();
      navigate(`/breedList/${searchQuery}`, { state: { location } });
    } catch (error) {
      console.error("Error fetching user location:", error);
      navigate(`/breedList/${searchQuery}`);
    }
  };

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

  useEffect(() => {
    if (isLargeScreen) {
      setDrawerOpen(false);
    }
  }, [isLargeScreen]);

  return (
    <AppBar position="fixed" sx={{ bgcolor: theme.palette.primary.light }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ padding: "0 10px" }}>
          <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PawFul
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PawFul
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(`/${page.toLowerCase()}`)}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {showSearch && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "12px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "150px",
                  maxWidth: "300px",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
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
            </Box>
          )}

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            {isLoggedIn && (
              <>
                <IconButton
                  onClick={() => navigate("/favourites")}
                  color="inherit"
                  sx={{ mr: 2 }}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  onClick={() => setLocationDrawerOpen(true)}
                  color="inherit"
                  sx={{ mr: 2 }}
                >
                  <LocationOnIcon />
                </IconButton>
              </>
            )}
            {isLoggedIn ? (
              <>
                <Tooltip title={user?.name || "User"} arrow>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ backgroundColor: "#001427" }}
                      alt={user?.name || "User Avatar"}
                      src={user?.avatar || "/default-avatar.png"}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        if (setting === "Logout") logout();
                        else navigate(`/${setting.toLowerCase()}`);
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.common.black,
                  borderRadius: "8px",
                  padding: "8px 16px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  fontWeight: 600,
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={drawerOpen} onClose={handleCloseNavMenu}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleCloseNavMenu}
          onKeyDown={handleCloseNavMenu}
        >
          <List>
            {pages.map((page) => (
              <ListItem
                button
                key={page}
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
                onClick={() => navigate(`/${page.toLowerCase()}`)}
              >
                <ListItemText primary={page} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {settings.map((setting) => (
              <ListItem
                button
                key={setting}
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
                onClick={() => {
                  if (setting === "Logout") logout();
                  else navigate(`/${setting.toLowerCase()}`);
                  handleCloseNavMenu();
                }}
              >
                <ListItemText primary={setting} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <LocationDrawer
        locationDrawerOpen={locationDrawerOpen}
        setLocationDrawerOpen={setLocationDrawerOpen}
      />
    </AppBar>
  );
}

export default ResponsiveAppBar;
