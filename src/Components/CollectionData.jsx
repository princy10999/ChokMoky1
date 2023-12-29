import React from "react";
import { makeStyles } from "tss-react/mui";
import {
  Box,
  Grid,
  Typography,
  Pagination,
  PaginationItem,
} from "@mui/material";

import Collectioncard from "./Common/Collectioncard";

const useStyles = makeStyles()((theme) => {
  return {
    cardLayout: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    root: {
      marginTop: "47px",
      marginBottom: "58px",
      [theme.breakpoints.down("tab")]: {
        marginTop: "20px",
        marginBottom: "30px",
      },
      [`& button`]: {
        fontSize: "20px",
        lineHeight: "24px",
        fontWeight: 600,
        color: "#676767",
        fontFamily: "League spartan",
        "& .MuiPaginationItem-root:hover": {
          borderRadius: "0px !important",
        },
        [theme.breakpoints.down("mobile")]: {
          fontSize: "16px",
          lineHeight: "20px",
        },
        [theme.breakpoints.down("small")]: {
          fontSize: "14px",
        },
      },
      "& .Mui-selected": {
        width: "21px",
        height: "21px",
        color: "#000",
        [theme.breakpoints.down("mobile")]: {
          width: "17px",
          height: "17px",
        },
        [theme.breakpoints.down("small")]: {
          width: "15px",
          height: "15px",
        },
      },
    },
    selected: {
      backgroundColor: "transparent !important",
      color: "#1A1B2F",
      padding: "0px 4px",
      borderBottom: " 0.7px solid #1A1B2F",
      borderRadius: "0px !important",
      "&:hover": {
        borderRadius: "0px !important",
      },
      [theme.breakpoints.down("small")]: {
        fontSize: "0.6rem",
      },
    },
    headText2: {
      fontFamily: "League Spartan, sans-serif",
      fontSize: "24px",
      color: "#424358",
      width: "100%",
      display: "flex",

      fontWeight: "400",
      lineHeight: "22.08px",
      marginBottom: "2rem",
      [theme.breakpoints.down("smallLaptop")]: {
        fontSize: "20px",
      },
      [theme.breakpoints.down("laptop")]: {
        fontSize: "18px",
        marginBottom: "0.9rem",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "16px",
      },
    },
  };
});

const CollectionData = ({
  collection,
  onPageChange,
  count,
  productCount,
  nomargin,
  loader,
}) => {
  const { classes } = useStyles();
  return (
    <Box
      className={classes.cardLayout}
      sx={(theme) => ({
        margin: nomargin ? "0rem" : "3rem 9rem 1rem 9rem",
        [theme.breakpoints.down("desktop")]: {
          margin: nomargin ? "0rem" : "3rem 7rem 1rem 7rem",
        },
        [theme.breakpoints.down("laptop")]: {
          padding: "0rem  3rem",
          margin: nomargin ? "0rem" : "3rem auto 1rem auto",
        },
        [theme.breakpoints.down("mobile")]: {
          margin: nomargin ? "0rem" : "2rem auto 1rem auto",
          padding: "0rem  1rem",
        },
        [theme.breakpoints.down("smartPhone")]: {
          padding: "0rem  1rem",
        },
      })}
    >
      <Typography component="p" className={classes.headText2}>
        {productCount ? productCount : 0} Products found by Search
      </Typography>
      <Grid
        container
        columnSpacing={{ xSmall: 2, laptop: 5, smallLaptop: 8, desktop: 8 }}
        spacing={{ xSmall: 2, iph: 2, laptop: 2, xDesktop: 3 }}
        columns={{ xSmall: 4, mobile: 12, laptop: 12 }}
        className={classes.mainGrid}
      >
        <Collectioncard
          cardData={collection}
          fontSize="25px"
          lineHeight="23px"
          loader={loader}
        />
      </Grid>
      {count > 1 && (
        <Pagination
          count={count}
          onChange={onPageChange}
          className={classes.root}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              classes={{ selected: classes.selected }}
            />
          )}
        />
      )}
    </Box>
  );
};

export default CollectionData;
