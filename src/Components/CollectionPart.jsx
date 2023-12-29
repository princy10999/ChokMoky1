import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import CollectionHeadPart from "./Common/CollectionHeadPart";
import Container from "@mui/material/Container";
import CollectionCarousal from "./Common/CollectionCarousal";

const useStyles = makeStyles()((theme) => {
  return {
    cont: {
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
    },
    collection: {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top center",
      backgroundSize: "100% 677px",
      paddingTop: "119px",
      position: "relative",
      [theme.breakpoints.down("laptop")]: {
        paddingTop: "50px",
      },
      [theme.breakpoints.down("tab")]: {
        paddingTop: "20px",
      },
      [theme.breakpoints.down("iph")]: {
        paddingTop: "40px",
      },
    },
  };
});

function CollectionPart({ ref }) {
  const { classes } = useStyles();
  return (
    <Box component="div" disableGutters className={classes.collection}>
      <Container className={classes.cont}>
        <CollectionHeadPart />
        <CollectionCarousal />
      </Container>
    </Box>
  );
}

export default CollectionPart;
