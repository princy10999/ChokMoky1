import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    scrollTop: {
      position: "fixed",
      bottom: "75px",
      right: "46px",
      width: "42px",
      height: "42px",
      backgroundColor: "#BD3D3D",
      borderRadius: "41px 41px 0px 0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
      outline: "none",
      cursor: "pointer",
      zIndex: 11,
    },
    "&:hover": {
      backgroundColor: "#1B1B29",
    },
  };
});

function SrcollTop() {
  const { classes } = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 250) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  return (
    <Box
      component="div"
      className={classes.scrollTop}
      style={isVisible ? { opacity: "100" } : { opacity: "0" }}
    >
      <IoIosArrowUp size={25} color="#fff" onClick={scroll} />
    </Box>
  );
}

export default SrcollTop;
