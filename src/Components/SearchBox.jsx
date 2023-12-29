import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "tss-react/mui";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { gsap } from "gsap";
import CloseIcon from "@mui/icons-material/Close";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles()((theme) => {
  return {
    searchOverlay: {
      opacity: "0.7",
      width: "100%",
      height: "200vh",
      marginTop: "0px",
      background: "white",
      position: "fixed",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      transition: "all .2s",
      zIndex: "0",
    },
    form: {
      position: "fixed",
      margin: "auto",
      width: "40%",
      display: "flex",
      right: "0",
      left: "0",
      bottom: "50%",
      [theme.breakpoints.down("laptop")]: {
        width: "50%",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "65%",
      },
      [theme.breakpoints.down("small")]: {
        width: "75%",
      },
    },
    input: {
      width: "100%",
      padding: "15px 20px",
      background: "#fff",
      border: "1px solid gray !important",
      borderRadius: "0px !important",
      boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
      [`& input`]: {
        padding: "0px !important",
      },
      "&:hover": {
        border: "none !important",
      },
      "&::before": {
        border: "none !important",
      },
      "&::after": {
        border: "none !important",
      },
    },
    buttSpan: {
      position: "relative",
      zIndex: "2",
    },
    buttton: {
      fontSize: "16px",
      fontWeight: "bold",
      textTransform: "none",
      padding: "10px 20px",
      color: "#FFFFFF",
      cursor: "pointer",
      border: "none",
      height: "100%",
      borderRadius: "0px",
      boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
      "&:hover": {
        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
      },
    },
    cross: {
      position: "absolute",
      // bottom: "2em",
      left: "2.5em",
      fontSize: "2em",
      "&:hover": {
        animation: "D 0.3s ease-in-out",
      },
      [theme.breakpoints.down("mobile")]: {
        left: "2.3em",
      },
      [theme.breakpoints.down("small")]: {
        left: "1.7em",
      },
      "@keyframes D": {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(180deg)",
        },
      },
    },
  };
});
function SearchBox({ openSearch, isopen, keyFuction }) {
  const { classes } = useStyles();
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  useEffect(() => {
    gsap.from(searchRef.current, {
      duration: 2.5,
      ease: "slow(0.7, 0.7, false)",
      y: -100,
    });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return (
    <>
      <Box
        component="div"
        disableGutters
        className={classes.searchOverlay}
        ref={searchRef}
        onClick={openSearch}
      ></Box>
      <Zoom in={isopen} onClick={keyFuction}>
        <Box
          component="form"
          disableGutters
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/search", {
              state: {
                search,
              },
            });
            openSearch(true);
          }}
        >
          <Input
            type="Search"
            placeholder="Search..."
            className={classes.input}
            onChange={(e) => setSearch(e?.target?.value)}
          />
          <Box
            component="div"
            disableGutters
            sx={{
              position: "relative",
              height: "54px",
              border: "0.90px solid #BD3D3D",
            }}
          >
            <Button
              disableElevation
              disableRipple
              variant="contained"
              type="submit"
              className={classes.buttton}
            >
              <SearchOutlined />
            </Button>
            <IconButton
              disableRipple
              disableGutters
              className={classes.cross}
              onClick={openSearch}
            >
              <CloseIcon sx={{ fontSize: "1em" }} />
            </IconButton>
          </Box>
        </Box>
      </Zoom>
    </>
  );
}
export default SearchBox;
