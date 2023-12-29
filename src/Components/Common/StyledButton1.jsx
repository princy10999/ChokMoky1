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
      backgroundColor: "#BD3D3D",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "0",
      height: "58px",
      color: "#FFFF",
      position: "relative",
      zIndex: "2",
      overflow: "hidden",
      "&:hover": {
        backgroundColor: "#1A1B2F !important",
      },
      "&::before": {
        content: '""',
        opacity: 0,
        position: "absolute",
        transition: "all 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        width: "0%",
        height: "100%",
        background: "#141524",
        zIndex: "-1",
        top: "-50px",
        "-webkit-transform": "rotate(35deg)",
        transform: "rotate(35deg)",
      },
      "&::after": {
        background: "#fff",
        content: '""',
        opacity: 0,
        position: "absolute",
        top: "-50px",
        "-webkit-transform": "rotate(35deg)",
        transform: "rotate(35deg)",
        transition: "all 3s cubic-bezier(0.19, 1, 0.22, 1)",
        height: "20rem",
        width: "8rem",
        left: "-100%",
      },
      "&:hover::before": {
        left: "120%",
        opacity: "0.5",
      },
      "&:hover::after": {
        left: "200%",
        opacity: "0.6",
      },
      "&:hover .css-kzg10w-buttStrong": {
        color: "#FFFF",
      },
      "&:hover .css-1avwszq-banbutspan": {
        backgroundColor: "#141524!important",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "auto",
        minWidth: "150px",
        height: "40px",
      },
    },
    buttStrong: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "18px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#FFFF",
      transition: "all 0.9s",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "14px",
      },
    },
    banbutspan: {
      display: "block !important",
      marginRight: "10px !important",
      width: "30px !important",
      height: "2px !important",
      transition: "all 0.9s",
      backgroundColor: "#fff !important",
      position: "relative !important",
      zIndex: 4,
      "&::before": {
        display: "none !important",
      },
    },
  };
});

function StyledButton1(props) {
  const { classes } = useStyles();
  return (
    <Button
      component={Link}
      to={props?.link}
      className={classes.bannButto}
      contained
      disabled={props?.disabled}
    >
      <Box component="span" className={classes.banbutspan}></Box>
      <Box component="strong" className={classes.buttStrong}>
        {props?.text}
      </Box>
    </Button>
  );
}

export default StyledButton1;
