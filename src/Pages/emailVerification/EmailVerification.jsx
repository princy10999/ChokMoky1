import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import StyledButton2 from "../../Components/Common/StyledButton2";
import { emailVerify } from "../../Redux/Actions/AuthUser";
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
  };
});
const EmailVerification = () => {
  const [value, setValue] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const emailVerifications = async (ids) => {
    dispatch(isLoader(true));
    const body = {
      params: {
        random: ids,
      },
    };
    const data = await dispatch(emailVerify(body));
    dispatch(isLoader(false));
    setValue(data.payload);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Email Verification - Chokmoki";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  useEffect(() => {
    if (id) {
      emailVerifications(id);
    }
  }, [id]);
  return (
    <Box>
      <Box className={classes.main}>
        {value.error && (
          <>
            <Typography variant="h1" className={classes.title}>
              Error
            </Typography>
            <Typography
              variant="h6"
              className={classes.title}
              sx={{ marginBottom: "15px" }}
            >
              {value.error.message}
            </Typography>
          </>
        )}
        {value?.result?.status && (
          <>
            <Typography variant="h5" className={classes.title}>
              Success
            </Typography>
            <Typography
              variant="h6"
              className={classes.title}
              sx={{ marginBottom: "15px" }}
            >
              {value?.result?.status?.meaning}
            </Typography>
          </>
        )}
        <Link to="/login">
          <StyledButton2 text="Go To Login" />
        </Link>
      </Box>
    </Box>
  );
};
export default EmailVerification;
