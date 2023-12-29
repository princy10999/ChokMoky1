import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Typography, Grid } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SimpleInput } from "../Components/Common/SimpleInput";
import StyledButton3 from "./Common/StyledButton3";
import { changePassword } from "../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
import { isLoader } from "../Redux/Actions/loaderSlice";
import { useEffect } from "react";

const useStyles = makeStyles()((theme) => {
  return {
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
    profileHead: {
      fontFamily: "League Spartan",
      fontSize: "25px",
      lineHeight: "23px",
      fontWeight: "500",
      marginBottom: "30px",
    },
    profileGrid: {
      paddingBottom: "104px",
      [theme.breakpoints.down("tab")]: {
        paddingBottom: "54px",
      },
    },
    err: {
      color: "#EB222C",
      fontSize: "15px",
    },
    textField: {
      width: "75%",
      [theme.breakpoints.down("tab")]: {
        width: "90%",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "96%",
      },
      [`& label`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "18px !important",
        color: "#7E7F84",
        lineHeight: "30px",
        [theme.breakpoints.down("iph")]: {
          fontSize: "15px !important",
        },
      },
      [`& fieldset`]: {
        borderRadius: 0,
      },
      [`& div`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "18px !important",
        color: "#7E7F84",
        borderRadius: "0px !important",
        [theme.breakpoints.down("iph")]: {
          fontSize: "15px !important",
        },
      },
    },
    emailErrors: {
      margin: "0",
      fontFamily: "League Spartan",
      fontWeight: "400",
      fontSize: "1.25rem",
      lineHeight: "1.6",
      letterSpacing: " 0.0075em",
      padding: "10px",
      marginLeft: "17px",
      marginTop: "15px",
      border: "1px solid ",
    },
  };
});

const ChangePasswordForm = () => {
  const [emailError, setEmailError] = useState({});
  const dispatch = useDispatch();
  const { classes } = useStyles();

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .trim()
      .required("Please enter current password!"),
    newPassword: Yup.string()
      .trim()
      .required("Please enter new password!")
      .min(6, "Please give atleast 6 character!")
      .max(10, "Please give atleast 10 character!"),
    reEnterPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match!")
      .required("Please re enter your Password!"),
  });

  const initialValues = {
    newPassword: "",
    reEnterPassword: "",
    currentPassword: "",
  };
  const onSubmit = async (values, formikHelpers) => {
    dispatch(isLoader(true));
    const body = {
      params: {
        old_password: values?.currentPassword,
        new_password: values?.newPassword,
      },
    };
    const data = await dispatch(changePassword(body));
    if (data?.payload?.error) {
      setEmailError({ msg: data?.payload?.error?.meaning, key: false });
      // swal({
      //   title: "Error",
      //   text: data?.payload?.error?.meaning,
      //   icon: "error",
      // });
    } else if (data?.payload?.result) {
      setEmailError({ msg: data?.payload?.result?.status?.meaning, key: true });
      // swal({
      //   title: "Success",
      //   text: data?.payload?.result?.status?.meaning,
      //   icon: "success",
      // });
      formikHelpers.resetForm();
    }
    dispatch(isLoader(false));
  };
  useEffect(() => {
    if (emailError?.msg) {
      setTimeout(() => {
        setEmailError({ msg: "" });
      }, 5000);
    }
  }, [emailError]);
  return (
    <Box className={classes.profileBox}>
      <Typography variant="h1" className={classes.profileHead}>
        Change password
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.loginForm}>
            <Grid
              container
              className={classes.profileGrid}
              spacing={{
                xSmall: 1,
                laptop: 2,
                smallLaptop: 2,
                desktop: 2,
              }}
              columns={{ xSmall: 4, mobile: 8, tab: 8, laptop: 8 }}
            >
              <Grid item mobile={6} xSmall={4}>
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  id="currentPassword"
                  label="Current Password"
                  name="currentPassword"
                  marginr="23px"
                  helperText={
                    <Box
                      component="span"
                      className={classes.err}
                      disableGutters
                    >
                      <ErrorMessage name="currentPassword" />
                    </Box>
                  }
                />
              </Grid>
              <Grid item mobile={6} xSmall={4}>
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  helperText={
                    <Box
                      component="span"
                      className={classes.err}
                      disableGutters
                    >
                      <ErrorMessage name="newPassword" />
                    </Box>
                  }
                />
              </Grid>
              <Grid item mobile={6} xSmall={4}>
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  id="reEnterPassword"
                  label="Re Enter Password"
                  name="reEnterPassword"
                  helperText={
                    <Box
                      component="span"
                      className={classes.err}
                      disableGutters
                    >
                      <ErrorMessage name="reEnterPassword" />
                    </Box>
                  }
                />
              </Grid>
              {emailError?.msg && (
                <Box
                  className={classes.emailErrors}
                  color={emailError?.key ? "green" : "#EB222C"}
                  borderColor={emailError?.key ? "green" : "#EB222C"}
                >
                  {emailError?.msg}
                </Box>
              )}
            </Grid>

            <StyledButton3 text="Submit" width="179px" />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangePasswordForm;
