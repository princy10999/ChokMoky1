import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import StyledButton2 from "../../Components/Common/StyledButton2";
const useStyles = makeStyles()((theme) => {
  return {
    main: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    title: {
      width: "60%",
      textAlign: "center",
      marginBottom: "10px",
      fontSize: "20px",
      lineHeight: "24px",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "18px",
        lineHeight: "22px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "16px",
        lineHeight: "20px",
      },
    },
  };
});
const SignupSuccess = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Signup Success - Chokmoki";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const location = useLocation();
  const { classes } = useStyles();
  return (
    <Box>
      <Box className={classes.main}>
        <Typography variant="h1" className={classes.title}>
          {location?.state?.success}
        </Typography>
        <Typography variant="h6" className={classes.title}></Typography>
        <Link to="/login">
          <StyledButton2 text="Go To Login" />
        </Link>
      </Box>
    </Box>
  );
};
export default SignupSuccess;
