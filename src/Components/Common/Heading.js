import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles()((theme) => {
  return {
    animationShrinkNew: {
      fontSize: "14px",
      fill: "#051f34",
      color: "#051f34",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "transparent",
      lineHeight: "1",
      fontWeight: "600",
      transitionDuration: ".3s",
      transitionProperty: "transform",
      textAlign: "center",
      textDecoration: "none",
      transition: "all .3s",
      "&:hover": {
        color: "#000000",
        backgroundColor: "transparent",
      },
      "&:focus": {
        color: "#000000",
        backgroundColor: "transparent",
      },
    },
    animatedTextLetters: {
      margin: "auto",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      fill: "#051f34",
      color: "#051f34",
      "&:hover": {
        ".animatedFirstLetter >.bigAnimatedLetter .outer": {
          transform: "none",
        },
        ".animatedFirstLetter> .bigAnimatedLetter .inner": {
          transform: "none",
        },
      },
    },
    animatedFirstLetter: {
      textTransform: "uppercase",
      fontSize: "140px",
      fontWeight: "400",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      fill: " #051f34",
      color: " #051f34",
      [theme.breakpoints.down("tab")]: {
        fontSize: "130px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "7em",
      },
    },
    bigAnimatedLetter: {
      fontFamily: "Sorts Mill Goudy, serif",
      position: "relative",
      display: "inline-block",
      overflow: "hidden",
      fill: "#FCE5DF",
      color: "#FCE5DF",
    },
    bigAnimatedLetter2: {
      fontFamily: "Sorts Mill Goudy, serif",
      position: "relative",
      display: "inline-block",
      overflow: "hidden",
      fill: "#BD3D3D",
      color: "#BD3D3D",
    },
    outer: {
      fontFamily: "Sorts Mill Goudy, serif",
      position: "absolute",
      overflow: "hidden",
      top: "0",
      left: "0",
      transition: "transform 2s ease",
      transform: "translateY(100%)",
    },
    inner: {
      fontFamily: "Sorts Mill Goudy, serif",
      display: "inline-block",
      transition: "transform 2s ease",
      transform: " translateY(-100%)",
      fill: "#BD3D3D",
      color: "#BD3D3D",
    },
    elementorButtonContentWrapper: {
      fontSize: "60px !important",
      position: "absolute",
      [theme.breakpoints.down("tab")]: {
        fontSize: "40px !important",
      },
    },
    headP: {
      color: "#70717C",
    },
    sideMainClass: {
      alignItems: "baseline",
    },
    leftLeft300: {
      left: "-10px",
    },
    leftLeft2: {
      left: "5px",
      [theme.breakpoints.down("laptop")]: {
        bottom: "15px !important",
        left: "auto",
      },
    },
    client: {
      [theme.breakpoints.down("laptop")]: {
        left: "auto",
      },
    },
    animatedTextLettersTwo: {
      margin: "auto",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      fill: "#051F34",
      color: "#051F34",
      ".animatedFirstLetter >.bigAnimatedLetter .outer": {
        transform: "none",
      },
      ".animatedFirstLetter> .bigAnimatedLetter .inner": {
        transform: "none",
      },
    },
  };
});

const Heading = ({
  title,
  subTitle,
  bgText,
  type,
  fontFamily,
  size,
  deskSize,
  lapSize,
  tabsize,
  iphsize,
  h,
  tabh,
  iphh,
  deskbott,
  lapbott,
  iphbott,
  smallbott,
  tabbott,
  stabbott,
  mobileh,
  mobilebott,
  smallsize,
  smart,
  bott,
  alignT,
  alignTM,
  alignI,
  aWidth,
  marginLeft,
  marginRight,
  letWidth,
  wrap,
  dis,
  tWidth,
  deskmarginLeft,
  deskmarginRight,
  tabmarginLeft,
  tabmarginRight,
  fontP,
  fsizeP,
  fsizePxdesk,
  lineP,
  fWightP,
  fsizelap,
  linePlap,
  laph,
  linetab,
  xTabbott,
  alignIMob,
}) => {
  const [abcd, setAbcd] = useState(false);
  const location = useLocation();
  useEffect(() => {
    Aos.init({ duration: 2000 });
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1300 && window.scrollY < 1320) {
        setAbcd(true);
        setTimeout(() => {
          setAbcd(false);
        }, 2000);
      } else if (window.scrollY > 4400 && window.scrollY < 4420) {
        setAbcd(true);
        setTimeout(() => {
          setAbcd(false);
        }, 2000);
      } else if (window.scrollY > 5200 && window.scrollY < 5220) {
        setAbcd(true);

        setTimeout(() => {
          setAbcd(false);
        }, 2000);
      } else if (window.scrollY > 5700 && window.scrollY < 5720) {
        setAbcd(true);
        setTimeout(() => {
          setAbcd(false);
        }, 2000);
      }
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const { classes } = useStyles();
  return (
    <div data-aos="fade-up">
      <Box
        component="Link"
        to="#"
        sx={(theme) => ({
          width: aWidth ? aWidth : "90%",
          margin: "auto 0 auto 0",
          marginLeft: marginLeft ? marginLeft : "auto",
          marginRight: marginRight ? marginRight : "auto",
          [theme.breakpoints.down("desktop")]: {
            marginLeft: deskmarginLeft ? deskmarginLeft : "auto",
            marginRight: deskmarginRight ? deskmarginRight : "auto",
          },
          [theme.breakpoints.down("laptop")]: {
            marginLeft: tabmarginLeft
              ? tabmarginLeft
              : deskmarginLeft
              ? deskmarginLeft
              : "auto",
            marginRight: tabmarginRight
              ? tabmarginRight
              : deskmarginRight
              ? deskmarginRight
              : "auto",
          },
          [theme.breakpoints.down("mobile")]: {
            marginLeft: "auto",
            marginRight: "auto",
            width: aWidth ? "98%" : "90%",
          },
        })}
        className={`${classes.animationShrinkNew} ${
          type === "side" && classes.sideMainClass
        }`}
      >
        <Box
          component="div"
          sx={(theme) => ({
            alignItems: alignI ? alignI : "center",
            justifyContent: alignI ? alignI : "center",
            width: letWidth ? letWidth : "80%",
            [theme.breakpoints.down("mobile")]: {
              alignItems: alignIMob ? alignIMob : alignI ? alignI : "center",
              justifyContent: alignIMob
                ? alignIMob
                : alignI
                ? alignI
                : "center",
            },
          })}
          className={`${
            abcd ? classes.animatedTextLettersTwo : classes.animatedTextLetters
          } ${type === "side" && classes.leftLeft300}`}
        >
          <Box
            component="span"
            sx={(theme) => ({
              height: h,
              [theme.breakpoints.down("laptop")]: {
                height: laph ? laph : h,
              },
              [theme.breakpoints.down("tab")]: {
                height: tabh,
              },
              [theme.breakpoints.down("mobile")]: {
                height: mobileh,
              },
              [theme.breakpoints.down("iph")]: {
                height: iphh,
              },
            })}
            className={`${classes.animatedFirstLetter} animatedFirstLetter`}
          >
            <span className={`${classes.bigAnimatedLetter} bigAnimatedLetter`}>
              <span className={`${classes.outer} outer`}>
                <span className={`${classes.inner} inner`}>{bgText}</span>
              </span>
              {bgText}
            </span>
          </Box>
          <Box
            component="span"
            sx={(theme) => ({
              bottom: bott ? bott : "auto",
              whiteSpace: wrap ? wrap : "nowrap",
              [theme.breakpoints.down("desktop")]: {
                bottom: deskbott ? deskbott : bott ? bott : "auto",
              },
              [theme.breakpoints.down("laptop")]: {
                bottom: lapbott,
              },
              [theme.breakpoints.down("tab")]: {
                bottom: tabbott ? tabbott : lapbott ? lapbott : "56px",
              },
              [theme.breakpoints.down("stab")]: {
                bottom: stabbott
                  ? stabbott
                  : tabbott
                  ? tabbott
                  : lapbott
                  ? lapbott
                  : "56px",
              },
              [theme.breakpoints.down("xTab")]: {
                bottom: xTabbott
                  ? xTabbott
                  : stabbott
                  ? stabbott
                  : tabbott
                  ? tabbott
                  : lapbott
                  ? lapbott
                  : "56px",
              },
              [theme.breakpoints.down("mobile")]: {
                bottom: mobilebott,
              },
              [theme.breakpoints.down("iph")]: {
                bottom: iphbott,
              },
              [theme.breakpoints.down("smartPhone")]: {
                bottom: smart ? smart : iphbott,
              },
              [theme.breakpoints.down("small")]: {
                bottom: smallbott,
              },
            })}
            className={`${classes.elementorButtonContentWrapper} ${
              type === "side" && classes.leftLeft
            } ${type === "client" && classes.client}`}
          >
            {location?.pathname === "/" ||
            location?.pathname.split("/")?.[1] === "product-detail" ? (
              <Box
                component="span"
                sx={(theme) => ({
                  fontFamily: fontFamily,
                  fontSize: size,
                  fontWeight: 500,
                  color: "#35364F",
                  textAlign: alignT ? alignT : "center",
                  display: dis ? dis : "inline",
                  width: tWidth ? tWidth : "auto",
                  [theme.breakpoints.down("desktop")]: {
                    fontSize: deskSize ? deskSize : size,
                  },
                  [theme.breakpoints.down("laptop")]: {
                    fontSize: lapSize ? lapSize : size,
                  },
                  [theme.breakpoints.down("tab")]: {
                    fontSize: tabsize,
                  },
                  [theme.breakpoints.down("iph")]: {
                    fontSize: iphsize,
                  },
                  [theme.breakpoints.down("small")]: {
                    fontSize: smallsize,
                  },
                })}
              >
                {title}
              </Box>
            ) : (
              <Typography
                variant="h1"
                sx={(theme) => ({
                  fontFamily: fontFamily,
                  fontSize: size,
                  fontWeight: 500,
                  color: "#35364F",
                  textAlign: alignT ? alignT : "center",
                  display: dis ? dis : "inline",
                  width: tWidth ? tWidth : "auto",
                  [theme.breakpoints.down("desktop")]: {
                    fontSize: deskSize ? deskSize : size,
                  },
                  [theme.breakpoints.down("laptop")]: {
                    fontSize: lapSize ? lapSize : size,
                  },
                  [theme.breakpoints.down("tab")]: {
                    fontSize: tabsize,
                  },
                  [theme.breakpoints.down("iph")]: {
                    fontSize: iphsize,
                  },
                  [theme.breakpoints.down("small")]: {
                    fontSize: smallsize,
                  },
                })}
              >
                {title}
              </Typography>
            )}
          </Box>
          <Box
            component="div"
            className={classes.headP}
            sx={(theme) => ({
              textAlign: alignT ? alignT : "center",
              fontFamily: fontP ? fontP : "Nunito, sans-serif",
              fontSize: fsizeP ? fsizeP : "1.2rem",
              fontWeight: fWightP ? fWightP : "400",
              lineHeight: lineP ? lineP : "25px",
              [theme.breakpoints.down("xDesktop")]: {
                fontSize: fsizePxdesk
                  ? fsizePxdesk
                  : fsizeP
                  ? fsizeP
                  : "1.2rem",
                [theme.breakpoints.down("laptop")]: {
                  fontSize: fsizelap
                    ? fsizelap
                    : fsizePxdesk
                    ? fsizePxdesk
                    : fsizeP
                    ? fsizeP
                    : "1.2rem",
                  lineHeight: linePlap ? linePlap : lineP ? lineP : "25px",
                },
                [theme.breakpoints.down("mobile")]: {
                  textAlign: alignTM ? alignTM : alignT,
                },
                [theme.breakpoints.down("tab")]: {
                  fontSize: "1.1rem",
                  lineHeight: linetab ? linetab : "22px",
                },
                [theme.breakpoints.down("stab")]: {
                  fontSize: "1rem",
                },
                [theme.breakpoints.down("iph")]: {
                  marginTop: "0",
                  fontSize: "15px",
                  lineHeight: "18px",
                },
              },
            })}
          >
            {subTitle}
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default Heading;
