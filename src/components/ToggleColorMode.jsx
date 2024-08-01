import React from "react";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PropTypes from "prop-types";

const ToggleColorMode = ({ mode, toggleColorMode }) => {
  const theme = useTheme();

  return (
    <IconButton
      sx={{
        borderRadius: "8px",
        bgcolor:
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.04)"
            : "rgba(255, 255, 255, 0.1)",
        "&:hover": {
          bgcolor:
            theme.palette.mode === "light"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.2)",
        },
      }}
      onClick={toggleColorMode}
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

ToggleColorMode.propTypes = {
  mode: PropTypes.string.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;
