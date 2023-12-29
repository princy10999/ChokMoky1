import React from "react";
import colbg from "../Assests/images/leaf.webp";
import { makeStyles } from "tss-react/mui";
import collectionService from "../Assests/images/styleBg.webp";
import faceLogo from "../Assests/images/faceLogo.webp";
import { Box, Container, Typography } from "@mui/material";
import StyledButton2 from "./Common/StyledButton2";
import video from "../Assests/images/Pexels Videos 2023708.mp4";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles()((theme) => {
  return {
    cont: {
      paddingLeft: "15px",
      paddingRight: "15px",
      height: "100%",
      maxWidth: "1200px",
      [theme.breakpoints.down("laptop")]: {
        maxWidth: "900px",
      },
      [theme.breakpoints.down("mobile")]: {
        maxWidth: "575px",
      },
    },
    StyleContainer: {
      width: "92%",
      backgroundImage: `url(${collectionService})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "top right",
      overFlow: "hidden",
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("tab")]: {
        width: "100%",
      },
    },
    faceLogo: {
      position: "absolute",
      left: "9%",
      top: "-15%",
      animation: "swing ease-in-out 1s infinite alternate",
      transformOrigin: "center -20px",
      float: "left",
      img: {
        display: "block",
      },
      "@keyframes swing": {
        "0%": {
          transform: "rotate(3deg);",
        },
        "100%": {
          transform: "rotate(-3deg);",
        },
      },
      [theme.breakpoints.down("tab")]: {
        height: "11em",
      },
      [theme.breakpoints.down("mobile")]: {
        left: "0%",
        top: "-7%",
      },
    },
    Style: {
      paddingTop: "151px",
      display: "flex",
      alignItems: "center",
    },
    gridMain: {
      padding: "25px",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("laptop")]: {
        padding: "2px 20px",
      },
      [theme.breakpoints.down("tab")]: {
        padding: "0px 0px",
      },
    },
    reviewText: {
      fontFamily: "playfair display",
      color: "#55555A",
      fontSize: "23px",
      fontWeight: "500",
      lineHeight: "31px",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "21px",
        lineHeight: "24px",
      },
    },
    boxText: {
      margin: "60px 0px 75px 12px",
      [theme.breakpoints.down("laptop")]: {
        margin: "35px 0px 50px 12px",
      },

      [theme.breakpoints.down("mobile")]: {
        textAlign: "center",
      },
    },
    prText: {
      fontFamily: "playfair display",
      fontSize: "23px",
      fontWeight: "500",
      lineHeight: "31px",
      color: "#BB8F84",
    },
    reviewText2: {
      marginTop: "19px",
      marginBottom: "15px",
      fontFamily: "League Spartan",
      color: "#35364F",
      fontSize: "83px",
      fontWeight: "400",
      lineHeight: "76px",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "55px",
        lineHeight: "54px",
      },
      [theme.breakpoints.down("laptop")]: {
        fontSize: "50px",
        lineHeight: "40px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "32px",
        lineHeight: "30px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "40px",
        lineHeight: "40px",
      },
    },
    reviewText3: {
      fontFamily: "Nunito",
      color: "#676767",
      fontSize: "21px",
      fontWeight: "400",
      lineHeight: "30px",
      marginBottom: "15px",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "17px",
        lineHeight: "20px",
      },
    },
    mainImage: {
      position: "absolute",
      top: "125px",
      width: "100%",
      background: "black",
      height: "35.0625rem",
      maxWidth: "25%",
      maxHeight: "100%",
      cursor: "pointer",
      zIndex: "1",
      [theme.breakpoints.down("laptop")]: {
        maxWidth: "35%",
      },
      [theme.breakpoints.down("laptop")]: {
        height: "25rem",
        top: "134px",
      },
      [theme.breakpoints.down("tab")]: {
        maxWidth: "96%",
        height: "40%",
      },
      [theme.breakpoints.down("mobile")]: {
        maxWidth: "92%",
      },
    },
    mainImage2: {
      iframe: {
        position: "absolute",
        top: "125px",
        width: "100%",
        background: "black",
        height: "35.0625rem",
        maxWidth: "25%",
        maxHeight: "100%",
        cursor: "pointer",
        zIndex: "1",
        [theme.breakpoints.down("laptop")]: {
          maxWidth: "35%",
        },
        [theme.breakpoints.down("laptop")]: {
          height: "25rem",
          top: "134px",
        },
        [theme.breakpoints.down("tab")]: {
          maxWidth: "96%",
          height: "40%",
        },
        [theme.breakpoints.down("mobile")]: {
          maxWidth: "92%",
        },
      },
    },
    discoverBtn: {
      width: "225px",
      marginTop: 30,
      [theme.breakpoints.down("laptop")]: {
        marginTop: 10,
      },
      [theme.breakpoints.down("tab")]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px auto 0px",
      },
    },
    videoIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: " translate(-50%, -50%)",
      [theme.breakpoints.down("mobile")]: {
        top: "40%",
      },
    },
    leaf: {
      position: "absolute",
      top: "-20px",
      right: "0px",
      width: "fit-content",
      height: "335px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: -1,
      animation: "blow 10s infinite ease-in-out",
      "@keyframes blow": {
        "0%": {
          transform: "rotate(0deg)",
          transformOrigin: "bottom left",
        },
        "25%": {
          transform: "rotate(-3deg)",
          transformOrigin: "bottom left",
        },
        "50%": {
          transform: "rotate(-6deg)",
          transformOrigin: "bottom left",
        },
        "75%": {
          transform: "rotate(-3deg)",
          transformOrigin: "bottom left",
        },
        "100%": {
          transform: "rotate(0deg)",
          transformOrigin: "bottom left",
        },
      },
    },
    styleCont: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("tab")]: {
        flexDirection: "column",
      },
    },
    stylevid: {
      width: "40%",
      [theme.breakpoints.down("tab")]: {
        width: "100%",
      },
    },
    styletxt: {
      width: "58%",
      [theme.breakpoints.down("tab")]: {
        width: "100%",
        marginTop: "17em",
        textAlign: "center",
      },
    },
  };
});
const StyleSection = ({ data }) => {
  const { classes } = useStyles();
  var sentence = data?.page_heading;
  const newData = sentence?.split(" ");
  const navigate = useNavigate();
  return (
    <Box className={classes.Style} position="relative">
      <Box className={classes.leaf}>
        <Box component="img" src={colbg} alt="leaf" />
      </Box>
      <Box className={classes.StyleContainer}>
        <Box
          component="img"
          className={classes.faceLogo}
          src={faceLogo}
          alt="earing"
        />
        <Container className={classes.cont}>
          <Box component="div" className={classes.styleCont}>
            <Box component="div" className={classes.stylevid}>
              {data?.url ? (
                <Box
                  className={classes?.mainImage2}
                  dangerouslySetInnerHTML={{ __html: data?.url }}
                />
              ) : (
                <video
                  className={classes?.mainImage}
                  width="100%"
                  height="100%"
                  controls
                >
                  <source src={video} type="video/mp4" />
                </video>
              )}
            </Box>
            <Box component="div" className={classes.styletxt}>
              <Box className={classes.boxText}>
                <Typography component="p" className={classes.reviewText}>
                  Now up to{" "}
                  <Typography component="span" className={classes.prText}>
                    70%{" "}
                  </Typography>
                  off*
                </Typography>
                <Typography component="p" className={classes.reviewText2}>
                  {newData?.[0]} <br /> {newData?.[1]} {newData?.[2]}{" "}
                  {newData?.[3]}
                  {/* Stand
                  <br /> Out In Style */}
                </Typography>
                <Typography component="p" className={classes.reviewText3}>
                  {data?.section}
                </Typography>
                <Box className={classes.discoverBtn}>
                  <StyledButton2
                    text="Discover Now"
                    onClick={() =>
                      navigate(data?.b_link?.split("dev")?.slice(-1)?.[0])
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default StyleSection;
