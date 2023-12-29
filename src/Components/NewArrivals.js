import React from "react";
import Heading from "./Common/Heading";
import { makeStyles } from "tss-react/mui";
import NewArrivalCard from "./Common/NewArrivalCard";
import StyledButton1 from "./Common/StyledButton1";
import { Box } from "@mui/material";
import { newArrival } from "../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles()((theme) => {
  return {
    NewArrival: {
      marginTop: "83px",
      [theme.breakpoints.down("tab")]: {
        marginTop: "45px",
      },
      [theme.breakpoints.down("iph")]: {
        marginTop: "50px",
      },
    },
  };
});

const NewArrivals = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await dispatch(newArrival());
      setData(response?.payload?.new_arrival);
    })();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  return (
    <Box className={classes.NewArrival}>
      <Heading
        title="New Arrivals"
        subTitle="Through original imagery and editorial perspectives, we bring you unique point new views."
        bgText="N"
        fontFamily="League Spartan, serif"
        h="128px"
        tabh="105px"
        iphh="90px"
        smallbott="72px"
        mobilebott="86px"
      />
      <NewArrivalCard data={data} />
      <Box display={"flex"}>
        <StyledButton1 text={"Explore All"} link="/search"></StyledButton1>
      </Box>
    </Box>
  );
};

export default NewArrivals;
