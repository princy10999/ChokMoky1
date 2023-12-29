import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Heading from "./Common/Heading";
import { makeStyles } from "tss-react/mui";
import "swiper/css";
import "swiper/css/navigation";
import Swiper4 from "./Common/Swiper4";
import { useDispatch } from "react-redux";
import { bestSellers } from "../Redux/Actions/AuthUser";
import noRecord from "../Assests/images/no-record.webp";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    cont: {
      padding: "66px 0 44px",
      height: "100%",
      maxWidth: "1200px",
      [theme.breakpoints.down("laptop")]: {
        maxWidth: "767px",
      },
      [theme.breakpoints.down("tab")]: {
        padding: "31px 0 14px",
      },
      [theme.breakpoints.down("mobile")]: {
        maxWidth: "575px",
      },
      [theme.breakpoints.down("iph")]: {
        padding: "33px 0 0",
      },
    },
    main: {
      background: " rgba(251, 238, 231, 0.3)",
      position: "relative",
    },
    colImgimg1: {
      position: "absolute",
      width: "250px",
      left: "8%",
      top: "-22%",
      [theme.breakpoints.down("laptop")]: {
        display: "none",
      },
    },
    colImgimg2: {
      width: "250px",
      position: "absolute",
      right: "8%",
      top: "-20.5%",
      [theme.breakpoints.down("laptop")]: {
        display: "none",
      },
    },
    noRec: {
      textAlign: "center",
      display: "flex",
      width: "22em",
      height: "15em",
      margin: "10px auto",
      [theme.breakpoints.down("iph")]: {
        width: "15em",
        height: "10em",
        margin: "0px auto",
      },
    },
  };
});

const BestSelling = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const [collItem, setCollItem] = useState([]);

  const bestSelling = async () => {
    const response = await dispatch(bestSellers());
    setCollItem(response?.payload?.best_sellers);
  };

  useEffect(() => {
    bestSelling();
  }, []);
  return (
    <Box className={classes.main}>
      <LazyLoad offset={200}>
        <Box
          component="img"
          className={classes.colImgimg1}
          src={
            "https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-3-2.png"
          }
          alt="bangle"
        />
      </LazyLoad>
      <LazyLoad offset={200}>
        <Box
          component="img"
          className={classes.colImgimg2}
          src={
            "https://bijoux.vamtam.com/wp-content/uploads/2020/11/j3371po033200-2-1.png"
          }
          alt="bracelet"
        />
      </LazyLoad>
      <Container className={classes.cont}>
        <Heading
          title="Best Selling"
          subTitle="Through original imagery and editorial perspectives, we bring you unique point."
          bgText="B"
          fontFamily="League Spartan, serif"
          h="130px"
          tabh="105px"
          iphh="90px"
          smart="67px"
          tabbott="50px"
        />
        {collItem?.length !== 0 && <Swiper4 data={collItem} />}
        {collItem?.length === 0 && (
          <Box component="img" src={noRecord} className={classes.noRec} />
        )}
      </Container>
    </Box>
  );
};

export default BestSelling;
