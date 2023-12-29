import React from "react";
import { makeStyles } from "tss-react/mui";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles()((theme) => {
  return {
    loginButton: {
      padding: "18px 20px 15px 17px",
      margin: "0 auto",
      backgroundColor: "#141524",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "0",
      height: "58px",
      position: "relative",
      zIndex: "2",
      overflow: "hidden",
      "&:hover": {
        backgroundColor: "#BD3D3D !important",
      },
      "&::before": {
        content: '""',
        opacity: 0,
        position: "absolute",
        transition: "all 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        width: "0%",
        height: "100%",
        background: "#BD3D3D",
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
      "&:hover .css-1nd3ojk-MuiTypography-root-buttonText": {
        color: "#fff",
      },
      "&:hover .css-1sg9l6o-banbutspan": {
        backgroundColor: "#fff",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "100%",
        minWidth: "150px",
        height: "40px",
      },
    },
    buttonText: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "18px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#FFF",
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

function StyledButton2(props) {
  const { classes } = useStyles();
  return (
    <Button
      className={classes.loginButton}
      variant="contained"
      fullWidth
      type="submit"
      disableRipple
      // component={Link}
      // to={props?.link}
      onClick={props.onClick}
      disabled={props?.disabled}
    >
      <Box component="span" className={classes.banbutspan}></Box>
      <Typography className={classes.buttonText}>{props?.text}</Typography>
    </Button>
  );
}

export default StyledButton2;
