import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100",
        position: "fixed",
        right: "0",
        top: "0",
        left: "0",
        bottom: "0",
        bgcolor: " rgb(0, 0, 0,0.5)",
        zIndex: "9999",
        overflow: "hidden",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
