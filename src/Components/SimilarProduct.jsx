import React from "react";
import { Box, Container } from "@mui/material";
import Heading from "./Common/Heading";
import { makeStyles } from "tss-react/mui";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import Swiper4 from "./Common/Swiper4";

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
    main: {
      paddingTop: "54px",
      position: "relative",
      [theme.breakpoints.down("iph")]: {
        paddingTop: "30px",
      },
      "&::before": {
        position: "absolute",
        content: '""',
        height: "1px",
        width: "100%",
        background: "#EAEAEA",
        top: "0",
      },
    },
  };
});
const SimilarProduct = ({ data }) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.main}>
      <Container className={classes.cont}>
        <Heading
          title="You may also like"
          subTitle="Through original imagery and editorial perspectives, we bring you unique point newviews."
          bgText="y"
          fontFamily="League Spartan, serif"
          h="117px"
          // bott="50px"
          // iphh="88px"
          // lapbott="38px"
          // tabbott="15px"
        />
        <Swiper4 data={data} />
      </Container>
    </Box>
  );
};

export default SimilarProduct;
