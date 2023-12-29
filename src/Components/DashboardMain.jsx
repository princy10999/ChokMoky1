import React from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Grid, Paper, Typography, Stack } from "@mui/material";
import heart from "../Assests/images/heart.svg";
import logIn from "../Assests/images/log-in.svg";
import shoppingBag from "../Assests/images/shopping-bag.svg";
import ShoppingCartTable from "./ShoppingCartTable";
import { useAppSelector } from "../Redux/app/hooks";

const useStyles = makeStyles()((theme) => {
  return {
    profileBox: {
      width: "100%",
      marginLeft: "16px",
      padding: "92px 0px 67px 36px!important",
      margin: "0px !important",
      [theme.breakpoints.down("smallLaptop")]: {
        padding: "92px 0px 67px 26px !important",
      },
      [theme.breakpoints.down("laptop")]: {
        padding: "92px 0px 67px 0px !important",
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "74px 0px 32px 0px !important",
      },
      [theme.breakpoints.down("iph")]: {
        padding: "74px 12px 32px 12px !important",
      },
    },
    profileHead: {
      fontFamily: "League Spartan",
      fontSize: "25px",
      lineHeight: "23px",
      fontWeight: "500",
      marginBottom: "20px",
    },
    dashboardText: {
      fontFamily: "League Spartan",
      fontSize: "20px",
      lineHeight: "18.4px",
      fontWeight: "500",
      letterSpacing: "2%",
      marginBottom: "7px",
    },
    dashboardPera: {
      fontFamily: "League Spartan",
      fontSize: "16px",
      lineHeight: "22px",
      fontWeight: "400",
      letterSpacing: "3%",
      marginBottom: "20px",
      color: "#818183",
    },
    profileGrid: {
      borderBottom: "9px solid #F4F4F4",
      paddingBottom: "40px",
    },
    paperGrid: {
      paddingLeft: "23px",
      "&:first-child": {
        paddingLeft: "0px",
      },
      [theme.breakpoints.down("desktop")]: {
        paddingLeft: "16px",
      },
      [theme.breakpoints.down("xTab")]: {
        paddingLeft: "0px",
        paddingBottom: "16px",
      },
    },
    paperBox: {
      padding: "16px 20px 24px 20px",
      [theme.breakpoints.down("tab")]: {
        padding: "12px 11px 14px 11px",
      },
      [theme.breakpoints.down("desktop")]: {
        padding: "10px",
      },
    },
    titleText: {
      fontFamily: "League Spartan",
      fontSize: "22px",
      lineHeight: "29px",
      fontWeight: "500",
      letterSpacing: "2%",
      color: "#61616A",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "20px",
        lineHeight: "26px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "16px",
      },
    },
    numText: {
      fontFamily: "League Spartan",
      fontSize: "26px",
      lineHeight: "29px",
      fontWeight: "500",
      letterSpacing: "3%",
      color: "#35364F",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "21px",
        lineHeight: "27px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "20px",
      },
    },
    textBox: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "15px",
    },
    head2: {
      fontFamily: "League Spartan",
      fontSize: "23px",
      lineHeight: "21.16px",
      fontWeight: "500",
      letterSpacing: "3%",
      color: "#363739",
      marginTop: "42px",
      marginBottom: "12px",
    },
  };
});

const DashboardMain = ({
  lastLogin,
  lastOrder,
  totalOrder,
  setLastOrder,
  wishlist,
  loader,
}) => {
  const overview = [
    {
      img: shoppingBag,
      title: "Total Purchase",
      num: totalOrder,
    },
    {
      img: heart,
      title: "My wishlist",
      num: wishlist,
    },
    {
      img: logIn,
      title: "Last Login",
      num: lastLogin,
    },
  ];
  const { classes } = useStyles();
  const userDetail = useAppSelector(
    (state) => state?.auth?.isUserDetailsData?.userDetail?.result?.userData
  );

  return (
    <Box className={classes.profileBox}>
      <Typography variant="h1" className={classes.profileHead}>
        Dashboard
      </Typography>
      <Typography variant="h5" className={classes.dashboardText}>
        Hi, {userDetail?.first_name}
      </Typography>
      <Typography variant="body1" className={classes.dashboardPera}>
        Welcome to Chokmoki.
      </Typography>
      <Grid container columns={{ xSmall: 4, xTab: 12 }}>
        {overview.map((item, index) => (
          <Grid
            item
            xSmall={4}
            xTab={4}
            className={classes.paperGrid}
            key={index}
          >
            <Paper variant="outlined" square className={classes.paperBox}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                className={classes.imgBox}
              >
                <Box
                  className={classes.cardImage}
                  component="img"
                  src={item?.img}
                  alt={item?.title}
                  sx={(theme) => ({
                    width: "48px",
                    height: "48px",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    [theme.breakpoints.down("desktop")]: {
                      width: "36px",
                      height: "36px",
                    },
                    [theme.breakpoints.down("stab")]: {
                      width: "30px",
                      height: "30px",
                    },
                  })}
                />
                <Box className={classes.textBox}>
                  <Typography variant="p" className={classes.titleText}>
                    {item?.title}
                  </Typography>
                  <Typography variant="p" className={classes.numText}>
                    {item?.num}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography className={classes.head2}>Recent Order</Typography>
      <Box>
        <ShoppingCartTable
          order={lastOrder}
          setLastOrder={setLastOrder}
          loader={loader}
        />
      </Box>
    </Box>
  );
};

export default DashboardMain;
