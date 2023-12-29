import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import React from "react";
import Heading from "./Common/Heading";
import getInTouchFront from "../Assests/images/getInTouchFront.webp";
import colbg from "../Assests/images/getInTouchBack.webp";
import StyledButton2 from "./Common/StyledButton2";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    cont: {
      paddingLeft: "15px",
      paddingRight: "15px",
      height: "100%",
      maxWidth: "1200px",
      [theme.breakpoints.down("laptop")]: {
        maxWidth: "767px",
      },
      [theme.breakpoints.down("mobile")]: {
        maxWidth: "575px",
      },
    },
    main: {
      paddingTop: "50px",
      backgroundImage: `url(${colbg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      [theme.breakpoints.down("tab")]: {
        paddingTop: "18px",
      },
      [theme.breakpoints.down("mobile")]: {
        backgroundPosition: "bottom",
      },
    },
    mainGrid: {
      flexWrap: "nowrap",
      [theme.breakpoints.down("laptop")]: {
        justifyContent: "center",
        flexWrap: "wrap",
      },
    },
    textBox: {
      paddingLeft: "28px",
      [theme.breakpoints.down("laptop")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },

    peraText: {
      fontSize: "26px",
      color: "#656570",
      fontWeight: "400",
      lineHeight: "38px",
      fontFamily: "League Spartan",
      marginBottom: "2rem",
      marginTop: "1rem",
      maxWidth: "750px",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "24px",
      },
      [theme.breakpoints.down("laptop")]: {
        textAlign: "center",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "23px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "18px",
        lineHeight: "24px",
        margin: "0.2rem 0 14px 0px",
      },
    },
    colImgimg: {
      width: "350px",
      animation: "zoom-in-zoom-out 2s ease infinite",
      "@keyframes zoom-in-zoom-out": {
        "0%": {
          transform: "scale(1)",
        },
        "50%": {
          transform: "scale(1.1)",
        },
        "100%": {
          transform: "scale(1)",
        },
      },
      [theme.breakpoints.down("smartPhone")]: {
        width: "290px",
      },
    },
    buttonGet: {
      width: "250px",
      marginTop: "15px",
      [theme.breakpoints.down("laptop")]: {
        marginTop: "0px",
      },
    },
    headingBox: {
      [theme.breakpoints.down("laptop")]: {
        marginLeft: "0px",
      },
    },
  };
});

const GetInTouch = ({ data }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <Box className={classes.main}>
      <Container className={classes.cont}>
        <Heading
          title={data?.page_heading}
          bgText={data?.page_heading?.slice(0, 1)}
          type="side"
          fontFamily="League Spartan, serif"
          h="145px"
          tabh="105px"
          iphh="88px"
          tabbott="19px"
        />
        <Grid container spacing={2} className={classes.mainGrid}>
          <Grid item sm={2}>
            <LazyLoad offset={200}>
              <Box
                component="img"
                className={classes.colImgimg}
                src={getInTouchFront}
                alt="Get in touch"
              />
            </LazyLoad>
          </Grid>
          <Grid item sm={10}>
            <Box className={classes.textBox}>
              <Box className={classes.headingBox}></Box>
              <Typography className={classes.peraText}>
                {data?.section}
              </Typography>
              <Box
                className={classes.buttonGet}
                onClick={() => navigate("/contact-us")}
              >
                <StyledButton2 text="Get in touch" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GetInTouch;
