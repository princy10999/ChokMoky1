import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Typography } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles()((theme) => {
  return {
    mainBox: {
      margin: "10px 200px 90px",
      [theme.breakpoints.down("mLaptop")]: {
        margin: "10px 100px 90px",
      },
      [theme.breakpoints.down("laptop")]: {
        margin: "10px 70px 90px",
      },
      [theme.breakpoints.down("stab")]: {
        margin: "10px 50px 90px",
      },
      [theme.breakpoints.down("iph")]: {
        margin: "10px 30px 90px",
      },
    },
    qunBox: {
      marginBottom: "30px",
    },
    qun: {
      fontFamily: "League Spartan",
      fontSize: "22px",
      lineHeight: "27px",
      fontWeight: "500",
      color: "#56565E",
      [theme.breakpoints.down("xTab")]: {
        fontSize: "20px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "18px",
        lineHeight: "23px",
      },
    },
    ans: {
      fontFamily: "League Spartan",
      fontSize: "17px",
      lineHeight: "26px",
      fontWeight: "400",
      color: "#858A8C",
      [theme.breakpoints.down("xTab")]: {
        fontSize: "15px",
      },
    },
  };
});
const PrivacyCommon = ({ data }) => {
  const { classes } = useStyles();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Box component="div" className={classes.mainBox} data-aos="fade-up">
      {data.map((item, index) => (
        <Box component="div" className={classes.qunBox}>
          <Typography variant="subtitle2" className={classes.qun}>
            {item?.title?.indexOf(`${index + 1}. `, 0) !== 0 &&
              `${index + 1}. `}{" "}
            {item?.title}
          </Typography>
          <Typography variant="body2" className={classes.ans}>
            {item?.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PrivacyCommon;
