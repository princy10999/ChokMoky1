import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import colRing from "../../Assests/images/ri1.webp";
import colRing2 from "../../Assests/images/ring2.webp";
import Aos from "aos";
import "aos/dist/aos.css";
// import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    colctHeading: {
      position: "relative",
      marginBottom: "187px",
      [theme.breakpoints.down("mobile")]: {
        marginBottom: "85px",
      },
    },
    collH4: {
      fontFamily: "Playfair Display",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "156px",
      lineHeight: "151px",
      textAlign: "center",
      letterSpacing: "0.05em",
      textTransform: "capitalize",
      background:
        "linear-gradient(179.11deg, rgba(189, 122, 61, 0) 0.76%, rgba(189, 61, 61, 0.15) 19.27%, rgba(176, 37, 37, 0.41) 36.54%, rgba(173, 31, 31, 0.48) 59.98%)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
      backgroundClip: "text",
      color: "transparent",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "140px",
      },
      [theme.breakpoints.down("laptop")]: {
        fontSize: "110px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "80px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "45px",
        lineHeight: "50px",
      },
    },
    collH2: {
      fontFamily: "Playfair Display",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "220px",
      lineHeight: "159px",
      textAlign: "center",
      letterSpacing: "0.02em",
      textTransform: "capitalize",
      color: " rgba(248, 221, 207, 0.8)",
      marginTop: "-22px",
      marginLeft: "19px",
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "180px",
        lineHeight: "139px",
      },
      [theme.breakpoints.down("laptop")]: {
        fontSize: "140px",
        lineHeight: "80px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "100px",
        lineHeight: "50px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "51px",
        lineHeight: "98px",
      },
    },
    collRing: {
      position: "absolute",
      top: "185px",
      margin: "0 auto",
      width: "295px",
      height: "298px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      animation: "spin 5s",
      transitionTimingFunction: "ease-in-out",
      "@keyframes spin": {
        "0%": { top: "300px" },
        "100%": { bottom: "0px" },
      },
      left: "calc(50% - 185px)",
      [theme.breakpoints.down("laptop")]: {
        top: "90px",
      },
      [theme.breakpoints.down("mobile")]: {
        top: "130px",
        width: "230px",
        height: "100px",
        left: "calc(50% - 145px)",
      },
    },
    collRing2: {
      position: "absolute",
      top: "90px",
      margin: "0 auto",
      width: "295px",
      height: "298px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      animation: "spiner 5s",
      "@keyframes spiner": {
        "0%": { top: "-100px" },
        "100%": { top: "100px" },
      },
      left: "calc(50% - 30px)",
      [theme.breakpoints.down("laptop")]: {
        top: "90px",
      },
      [theme.breakpoints.down("mobile")]: {
        top: "85px",
        width: "135px",
        height: "100px",
        left: "calc(50% - 23px)",
      },
    },

    collRingimg: {
      width: "auto",
      height: "auto",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  };
});

function CollectionHeadPart() {
  const { classes } = useStyles();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  return (
    <Box component="div" className={classes.colctHeading}>
      <Typography variant="h1" className={classes.collH4} data-aos="fade-up">
        Chokmoki
      </Typography>
      <Typography
        variant="h2"
        className={classes.collH2}
        data-aos="fade-up"
        data-aos-delay="500"
      >
        Collections
      </Typography>
      <Box component="div" className={classes.collRing} data-aos="fade-up">
        {/* <LazyLoad offset={200}> */}
          <Box
            component="img"
            src={colRing}
            alt="ring"
            className={classes.collRingimg}
          />
        {/* </LazyLoad> */}
      </Box>
      <Box component="div" className={classes.collRing2} data-aos="fade-down">
        {/* <LazyLoad offset={200}> */}
          <Box
            component="img"
            src={colRing2}
            alt="ring"
            className={classes.collRingimg}
          />
        {/* </LazyLoad> */}
      </Box>
    </Box>
  );
}

export default CollectionHeadPart;
