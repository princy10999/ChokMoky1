import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    stickySocial: {
      position: "fixed",
      top: "360px",
      right: "0px",
      padding: "0px",
      margin: "0px",
      zIndex: "999",
    },
    social: {
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    socialli: {
      marginBottom: "6px",
      position: "relative",
      width: "150px",
      transition: "all 1.8s ease",
      marginRight: "-114px",
      "&:hover": {
        marginRight: "0px",
      },
      "&:hover .css-u0d2gl-sociallink": {
        background: "#BD3D3D",
        transition: " 0.5s ease",
      },
    },
    sociallink: {
      borderRadius: "11px 0px 0px 11px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "10px 0px 8px 11px",
      background: "#35364F",
      transition: "all 0.10s ease",
    },
    ico: {
      color: "#fff",
      width: "18px",
      height: "18px",
      marginRight: "7px",
    },
    socialspan: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "19px",
      lineHeight: "23px",
      letterSpacing: "0.02em",
      color: "#FFFFFF",
      padding: "0px 10px 0px 13px",
      borderLeft: "1px solid #E39696",
    },
  };
});
function StickySocial() {
  const { classes } = useStyles();

  return (
    <Box component="div" disableGutters className={classes.stickySocial}>
      <Box component="ul" className={classes.social}>
        <Box component="li" className={classes.socialli}>
          <Box component={Link} to="#" className={classes.sociallink}>
            <FaFacebookF className={classes.ico} />
            <Box component="span" className={classes.socialspan}>
              Facebook
            </Box>
          </Box>
        </Box>
        <Box component="li" className={classes.socialli}>
          <Box component={Link} to="#" className={classes.sociallink}>
            <AiOutlineGoogle className={classes.ico} />
            <Box component="span" className={classes.socialspan}>
              Google
            </Box>
          </Box>
        </Box>
        <Box component="li" className={classes.socialli}>
          <Box component={Link} to="#" className={classes.sociallink}>
            <FaLinkedinIn className={classes.ico} />
            <Box component="span" className={classes.socialspan}>
              LinkedIn
            </Box>
          </Box>
        </Box>
        <Box component="li" className={classes.socialli}>
          <Box component={Link} to="#" className={classes.sociallink}>
            <FaInstagram className={classes.ico} />
            <Box component="span" className={classes.socialspan}>
              Instagram
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default StickySocial;
