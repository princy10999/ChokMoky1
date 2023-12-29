import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    bannButto: {
      padding: "18px 20px 15px 17px",
      margin: "0 auto",
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "0",
      border: "1px solid #CACACA",
      textTransform: "none",
      width: "100%",
      height: "60px",
      position: "relative",
      zIndex: "2",
      marginBottom: "25px",
      "&::before": {
        content: '""',
        position: "absolute",
        transition: "all 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        width: "0%",
        height: "100%",
        background: "#BD3D3D",
        top: "0",
        left: "0",
        zIndex: "-1",
      },
      "&:hover::before": {
        width: "100%",
      },
      "&:hover .css-dc4xm9-buttStrong": {
        color: "#FFFF",
      },
    },
    buttStrong: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "25px",
      lineHeight: "23px",
      letterSpacing: "0.01em",
      color: "#5C5C63",
      transition: "all 0.9s",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "20px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "16px",
        textAlign: "center",
      },
    },
  };
});

function SignupButton(props) {
  const { classes } = useStyles();
  return (
    <Button
      component={Link}
      to={props?.link}
      className={classes.bannButto}
      contained
    >
      <Box component="strong" className={classes.buttStrong}>
        {props?.text}
      </Box>
    </Button>
  );
}

export default SignupButton;
