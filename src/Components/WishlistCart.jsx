import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Collectioncard from "../Components/Common/Collectioncard";
import LoadButton from "../Components/Common/LoadButton";

const useStyles = makeStyles()((theme) => {
  return {
    buttonDiv: {
      paddingTop: "36px",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      "&::before": {
        content: '""',
        position: "absolute",
        width: "calc(100% + 36px)",
        height: "9px",
        backgroundColor: "#F4F4F4",
        top: 0,
        left: "-36px",
      },
    },
    profileBox: {
      width: "100%",
      marginLeft: "16px",
      padding: "92px 0px 67px 36px!important",
      margin: "0px !important",
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
    profiletitle: {
      fontFamily: "League Spartan",
      fontSize: "25px",
      lineHeight: "23px",
      fontWeight: "500",
      marginBottom: "30px",
    },
  };
});

const WishlistCart = ({
  data,
  limit,
  productCount,
  getWishlist,
  updateData,
  loader,
}) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.profileBox}>
      <Typography variant="h1" className={classes.profiletitle}>
        Wishlist
      </Typography>
      <Grid
        container
        spacing={{ xSmall: 2, laptop: 3 }}
        columns={{ xSmall: 4, xTab: 12, mobile: 12, laptop: 12 }}
      >
        <Collectioncard
          cardData={data}
          fontSize="21px"
          lineHeight="19.32px"
          updateData={updateData}
          loader={loader}
        />
      </Grid>
      {productCount > 6 && (
        <Box
          component="div"
          className={classes.buttonDiv}
          onClick={() => {
            data?.length !== 0 &&
            limit < productCount &&
            (limit !== 0 || limit < 0)
              ? getWishlist(limit + 6)
              : getWishlist(6);
          }}
        >
          <LoadButton
            load={
              data?.length !== 0 &&
              limit < productCount &&
              (limit !== 0 || limit < 0)
                ? false
                : true
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default WishlistCart;
