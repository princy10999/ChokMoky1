import React from "react";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/material";
import SideBar from "../../Components/Common/SideBar";
import OrderHistoryMain from "../../Components/OrderHistoryMain";
import { useEffect } from "react";

const useStyles = makeStyles()((theme) => {
  return {
    topColor: {
      backgroundColor: "#FCF8ED",
      height: "3.5rem",
    },
    mainBox: {
      display: "flex",
      margin: "-57px auto 0 auto",
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
      // padding: "0px 160px 0px 160px",
      // [theme.breakpoints.down("mLaptop")]: {
      //   padding: "0px 80px 0px 80px",
      // },
      // [theme.breakpoints.down("xDesktop")]: {
      //   padding: "0px 60px 0px 60px",
      // },
      // [theme.breakpoints.down("laptop")]: {
      //   padding: "0px 39px 0px 39px",
      // },
      // [theme.breakpoints.down("tab")]: {
      //   padding: "0px 30px 0px 30px",
      // },
      // [theme.breakpoints.down("stab")]: {
      //   padding: "0px 30px 0px 30px",
      // },
      // [theme.breakpoints.down("iph")]: {
      //   padding: "0px 10px 0px 10px",
      // },
    },
  };
});
const OrderHistory = () => {
  const { classes } = useStyles();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Order History - Chokmoki";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  return (
    <Box>
      <Box className={classes.ProductPage}>
        <Box className={classes.topColor}></Box>
        <Box className={classes.mainBox}>
          <SideBar />
          <OrderHistoryMain />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderHistory;
