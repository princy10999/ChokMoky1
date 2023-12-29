import React from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Typography } from "@mui/material";
import bannerImg from "../Assests/images/collection-banner.webp";
import bannerRing from "../Assests/images/hd-ring.webp";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    HeadImg: {
      backgroundImage: `url(${bannerImg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top right",
      padding: "0px 0px 0px 139px",
      width: "100%",
      height: "300px",
      position: "relative",
      [theme.breakpoints.down("desktop")]: {
        padding: "0px 0px 0px 100px",
      },
      [theme.breakpoints.down("laptop")]: {
        padding: "0px 0px 0px 56px",
      },
      [theme.breakpoints.down("tab")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px",
        height: "230px",
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "0px",
        height: "180px",
        backgroundPosition: "unset",
      },
    },
    boxText: {
      position: "absolute",
      padding: "5rem 0rem 6rem 0rem",
      [theme.breakpoints.down("tab")]: {
        padding: "4em 2em",
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "2rem 0.6rem 2rem 0.6rem",
      },
    },
    headText: {
      fontSize: "20px",
      color: "#343444",
      fontWeight: "400",
      lineHeight: "27.1px",
      [theme.breakpoints.down("tab")]: {
        fontSize: "18px",
        textAlign: "center",
      },
    },
    prText: {
      color: "#BD3D3D",
    },
    headText2: {
      fontSize: "56px",
      color: "#343444",
      fontWeight: "400",
      lineHeight: "84px",
      letterSpacing: "2%",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "47px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "46px",
        textAlign: "center",
        lineHeight: "60px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "33px",
        lineHeight: "45px",
      },
      [theme.breakpoints.down("small")]: {
        fontSize: "29px",
        lineHeight: "35px",
      },
    },
    bnrRing: {
      position: "absolute",
      height: "280px",
      right: "120px",
      bottom: "20px",
      display: "block",
      animation: "bnrring 8s infinite ease-in-out",
      "@keyframes bnrring": {
        "0%": {
          transform: "translateY(0px) scale(0.9)",
        },
        "25%": {
          transform: "translateY(5px) scale(0.95)",
        },
        "50%": {
          transform: "translateY(0px) scale(1)",
        },
        "75%": {
          transform: "translateY(-5px) scale(0.95)",
        },
        "100%": {
          transform: "translateY(0px) scale(0.9)",
        },
      },
      [theme.breakpoints.down("desktop")]: {
        height: "233px",
        right: "62px",
        bottom: "33px",
      },
      [theme.breakpoints.down("laptop")]: {
        height: "200px",
        right: "35px",
        bottom: "46px",
      },

      [theme.breakpoints.down("tab")]: {
        display: "none",
      },
    },
  };
});

const CollectionHeader = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.headBox}>
      <Box component="div" className={classes.HeadImg}>
        <Box className={classes.boxText}>
          <Typography component="p" className={classes.headText}>
            Now up to{" "}
            <Typography component="span" className={classes.prText}>
              70%{" "}
            </Typography>
            off*
          </Typography>
          <Typography component="h1" className={classes.headText2}>
            New Jewelry collection
          </Typography>
        </Box>
        <Box component="div" className={classes.WishListC}>
          <LazyLoad offset={200}>
            <Box
              component="img"
              src={bannerRing}
              alt="ring"
              className={classes.bnrRing}
            />
          </LazyLoad>
        </Box>
      </Box>
    </Box>
  );
};

export default CollectionHeader;
