import React from "react";
import Grid from "@mui/material/Grid";

const LazyImage = ({ src, alt, sx }) => (
  <Grid
    item
    xs={false}
    sm={4}
    md={7}
    sx={{
      backgroundImage: `url(${src})`,
      backgroundColor: (t) =>
        t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
      ...sx,
    }}
    aria-label={alt}
  />
);

export default LazyImage;
