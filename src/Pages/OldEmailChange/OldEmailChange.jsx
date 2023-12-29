import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { ApiPost } from "../../Api/Api";
import StyledButton2 from "../../Components/Common/StyledButton2";
import { isLoader } from "../../Redux/Actions/loaderSlice";
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
      fontSize: "2rem",
      textAlign: "center",
      marginBottom: "10px",
    },
    buttonBox: {
      width: "300px",
    },
  };
});
const OldEmailChange = () => {
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const { code } = useParams();
  const verifyUser = () => {
    dispatch(isLoader(true));
    const body = {
      params: {
        random: code,
      },
    };
    ApiPost("email-change-verify", body)
      .then((res) => {
        if (res?.data?.result) {
          setType("S");
        } else if (res?.data?.error) {
          setType("F");
        }
        dispatch(isLoader(false));
      })
      .catch(async (err) => {
        setType("F");
        dispatch(isLoader(false));
      });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Old Email Change - Chokmoki";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  const { classes } = useStyles();
  return (
    <Box>
      <Box className={classes.main}>
        {type === "" && (
          <Box className={classes.main}>
            <Typography variant="h1" className={classes.title}>
              Are you sure you want to change email?
            </Typography>
            <Typography variant="h6" className={classes.title}></Typography>
            <Box className={classes.buttonBox}>
              <StyledButton2 text="Confirm" onClick={verifyUser} />
            </Box>
          </Box>
        )}
        {type === "F" && (
          <Box className={classes.main}>
            <Typography variant="h5" className={classes.title}>
              Error
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Your verification link has been expired.
            </Typography>
            <Link to="/login">
              <StyledButton2 text="Go to login" />
            </Link>
          </Box>
        )}
        {type === "S" && (
          <Box className={classes.main}>
            <Typography variant="h5" className={classes.title}>
              Success !
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Your email is verified successfully. Now you can Sign in with your
              email and password.
            </Typography>
            <Link to="/login">
              <StyledButton2 text="Go to login" />
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default OldEmailChange;
