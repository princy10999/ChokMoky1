import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { getHomeContent } from "../Redux/Actions/AuthUser";
import { isLoader } from "../Redux/Actions/loaderSlice";

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
      [theme.breakpoints.down("iph")]: {
        padding: "18px 5px",
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "18px 5px",
      },
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

function HeaderIcon() {
  const { classes } = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const dispatch = useDispatch();
  const [data, setData] = useState({});
  // const [svg, setSvg] = useState(true);
  const apiCall = async () => {
    dispatch(isLoader(true));
    const getData = await dispatch(getHomeContent());
    setData(getData?.payload?.result);
    dispatch(isLoader(false));
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    apiCall();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <>
      <Box
        className={classes.icon}
        style={
          isVisible
            ? { opacity: "100", overflow: "hidden", width: "100%" }
            : { opacity: "0", display: "none" }
        }
      >
        <Box component="div" className={classes.headTop} disableGutters>
          <Typography variant="p" disableGutters className={classes.headTopP}>
            {data?.heading?.heading}
            <Box
              component={Link}
              to={data?.h_button?.b_link?.split("dev")?.slice(-1)?.[0]}
              className={classes.headtoplink}
              disableGutters
            >
              {data?.h_button?.heading_1}
            </Box>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default HeaderIcon;
