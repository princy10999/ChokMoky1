import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/material";
import CollectionHeader from "../../Components/CollectionHeader";
import CollectionData from "./../../Components/CollectionData";

const useStyles = makeStyles()((theme) => {
  return {
    CollectionSection: {
      marginTop: "113px",
    },
  };
});

const Collection = () => {
  const { classes } = useStyles();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    document.title = "Collection - Chokmoki";
  }, []);
  return (
    <Box className={classes.CollectionSection}>
      <CollectionHeader />
      <CollectionData />
    </Box>
  );
};

export default Collection;
