import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import logo from "../../Assests/images/top-logo.webp";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    icon: {
      position: "fixed",
      top: "0px",
      zIndex: "999999",
      transition: "top 0.3s",
    },
    headTop: {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "32px",
      padding: "6px",
      //  zIndex: "999999",
    },
    headTopP: {
      fontFamily: "Nunito",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "15px",
      lineHeight: "20px",
      textAlign: "center",
      letterSpacing: "0.03em",
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("iph")]: {
        fontSize: "13px",
      },
    },
    headtoplink: {
      color: "white",
      marginLeft: "8px",
      textDecoration: "underline",
      "&:hover": {
        color: "#f8ddcfcc",
        textDecoration: "underline",
      },
    },
  };
});

const HeaderLogo = () => {
  const { classes } = useStyles();
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 110) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.scrollTo(0, 0);
  //   }, 0);
  // }, []);
  return (
    <>
      <Box
        className={classes.icon}
        style={
          isVisible ? { opacity: "100" } : { opacity: "0", display: "none" }
        }
        component={Link}
        to="/"
      >
        <Box
          component="img"
          disableGutters
          src={logo}
          alt="Website logo"
          sx={(theme) => ({
            width: "5rem",
            position: "relative",
            top: (location.pathname === "/" || location.pathname?.split("/")?.[1] === "product-detail") ? "26px" : 0,
            left: "10px",
            // zIndex: "999999",

            [theme.breakpoints.down("small")]: {
              width: "5rem",
            },
          })}
        />
      </Box>
    </>
  )
}

export default HeaderLogo