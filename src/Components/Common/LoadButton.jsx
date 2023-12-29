import React from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Button } from "@mui/material";
import loadmore from "../../Assests/images/loadmore.webp";

const useStyles = makeStyles()((theme) => {
  return {
    loadbutt: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "22px",
      lineHeight: "20px",
      letterSpacing: "0.03em",
      color: "#3D3D47",
      textTransform: "none",
      width: "fit-content",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#BD3D3D",
      },
      "&:hover .css-wtwruq-loadimg": {
        filter:
          "invert(40%) sepia(15%) saturate(5006%) hue-rotate(326deg) brightness(78%) contrast(92%)",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "18px",
      },
    },
    loadimg: {
      width: "28px",
      height: "28px",
      [theme.breakpoints.down("mobile")]: {
        width: "20px",
        height: "20px",
      },
    },
  };
});

function LoadButton({ load }) {
  const { classes } = useStyles();
  return (
    <Button
      startIcon={
        <Box
          component="img"
          src={loadmore}
          alt="loadmore"
          className={classes.loadimg}
        />
      }
      disableRipple
      disableFocusRipple
      disableTouchRipple
      className={classes.loadbutt}
    >
      Load {!load ? "More" : "Less"}
    </Button>
  );
}

export default LoadButton;
