import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import { SimpleInput } from "../../Components/Common/SimpleInput";
import StyledButton2 from "../../Components/Common/StyledButton2";
import { LoginLayout } from "../../Components/Common/LoginLayout";
import check from "../../Assests/images/check.webp";
import { useDispatch } from "react-redux";
import { socialLogin } from "../../Redux/Actions/AuthUser";
import swal from "sweetalert";
import { isLoader } from "../../Redux/Actions/loaderSlice";
const useStyles = makeStyles()((theme) => {
  return {
    loginForm: {
      paddingTop: "4px",
      [theme.breakpoints.down("iph")]: {
        paddingTop: "0px",
      },
    },
    textField: {
      marginTop: "24px",
      [`& label`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "19px !important",
        color: "#7E7F84",
        lineHeight: "30px",
        [theme.breakpoints.down("iph")]: {
          fontSize: "16px !important",
          lineHeight: "22px",
        },
      },
      [`& fieldset`]: {
        borderRadius: 0,
      },
      [`& div`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "19px !important",
        color: "#7E7F84",
        borderRadius: "0px !important",
        [theme.breakpoints.down("iph")]: {
          fontSize: "16px !important",
          height: "50px !important",
        },
      },
    },
    privacy: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      textAlign: "left",
      paddingTop: "23px",
      paddingBottom: "19px",
      color: "#35364F",
      fontFamily: "League Spartan !important",
      fontWeight: "400 !important",
      fontSize: "17px !important",
      lineHeight: "23px !important",
      [theme.breakpoints.down("iph")]: {
        fontSize: "15px !important",
        lineHeight: "18px !important",
        paddingTop: "16px",
      },
    },
    textLink: {
      color: "#35364F",
      fontFamily: "League Spartan !important",
      fontWeight: "400 !important",
      fontSize: "17px !important",
      lineHeight: "23px !important",
      textDecoration: "underline !important",
      [theme.breakpoints.down("iph")]: {
        fontSize: "15px !important",
        lineHeight: "18px !important",
      },
      "&:hover": {
        textDecoration: "underline !important",
        color: "#BD3D3D",
      },
    },
    loginButton: {
      borderRadius: 0,
      backgroundColor: "#141524",
      padding: "11px",
      "&:hover": {
        backgroundColor: "#141524",
      },
    },
    buttonText: {
      fontFamily: "League Spartan",
      fontSize: "20px",
      display: "flex",
      "&::before": {
        content: '" "',
        height: "2px",
        width: "29px",
        background: "white",
        position: "absolute",
        left: "35%",
        top: 22.5,
        [theme.breakpoints.down("iph")]: {
          width: "18px",
          left: "32%",
          top: 21.5,
        },
        [theme.breakpoints.down("small")]: {
          width: "17px",
          left: "29%",
          top: 20.5,
        },
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "1rem",
      },
    },
    err: {
      color: "#EB222C",
      fontSize: "15px",
      lineHeight: "15px",
    },
    emailErrorUi: {
      border: "1px solid #BD3D3D",
      padding: "10px",
      marginTop: "10px",
    },
  };
});
function SignupWithGoogle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { classes } = useStyles();
  const [emailError, setEmailError] = useState("");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Signup with Google - Chokmoki";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email!")
      .required("Please enter email id!"),
    first_name: Yup.string().required("Please enter your first name!"),
    last_name: Yup.string().required("Please enter your last name!"),
    mobile: Yup.string()
      .required("Please enter your mobile number!")
      .matches(/^([0-9\s\-+()]*)$/, "Invalid mobile number!")
      .min(10, "Mobile number must be at least 10 characters!"),
    // .max(10, "Mobile number contains maximum 10 characters!"),
  });
  const initialValues = {
    first_name: location?.state?.data?.profileObj?.givenName
      ? location?.state?.data?.profileObj?.givenName
      : "",
    last_name: location?.state?.data?.profileObj?.familyName
      ? location?.state?.data?.profileObj?.familyName
      : "",
    mobile: "",
    email: location?.state?.data?.profileObj?.email
      ? location?.state?.data?.profileObj?.email
      : "",
  };
  const initialValues2 = {
    first_name: location?.state?.data?.data?.first_name
      ? location?.state?.data?.data?.first_name
      : "",
    last_name: location?.state?.data?.data?.last_name
      ? location?.state?.data?.data?.last_name
      : "",
    mobile: "",
    email: location?.state?.data?.data?.email
      ? location?.state?.data?.data?.email
      : "",
  };
  const onSubmit = async (values, formikHelpers) => {
    dispatch(isLoader(true));
    const body = {
      params: {
        social_id:
          location?.state?.type === "G"
            ? location?.state?.data?.googleId
            : location?.state?.data?.data?.id,
        type: location?.state?.type,
        first_name: values?.first_name,
        last_name: values?.last_name,
        email: values?.email,
        phone: values?.mobile.toString(),
        action_type: location?.state?.action_type,
      },
    };
    if (sessionStorage.getItem("sessionId")) {
      body.params.session_id = sessionStorage.getItem("sessionId")
        ? sessionStorage.getItem("sessionId")
        : null;
    }

    const data = await dispatch(socialLogin(body));

    dispatch(isLoader(false));
    if (data?.payload?.result) {
      swal({
        title: "Success",
        text: "Registration Successfully",
        icon: "success",
      });
      localStorage.setItem("access_token", data?.payload?.result?.token);
      localStorage.setItem(
        "userData",
        JSON.stringify(data?.payload?.result?.userData)
      );
      setTimeout(() => {
        if (data?.payload?.result?.userData?.address) {
          navigate("/dashboard");
        } else {
          navigate("/edit-profile");
        }
      }, 100);
    } else {
      swal({
        title: "Warning",
        text: data?.payload?.error?.meaning,
        icon: "warning",
      });
    }
  };
  return (
    <Box>
      <React.Fragment>
        <LoginLayout
          emailError={emailError}
          text="Please fill in the below fields to create an account"
          title="Signup with Google."
          option="Login Now"
          link="/login"
          margin="-60px"
          hight="108%"
          padding="60px 64px 40px 58px"
          mt="37px"
        >
          <Formik
            initialValues={
              location?.state?.type === "G" ? initialValues : initialValues2
            }
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ values, setFieldValue }) => (
              <Form className={classes.loginForm}>
                <Box
                  fullWidth
                  sx={(theme) => ({
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    [theme.breakpoints.down("iph")]: {
                      flexWrap: "wrap",
                    },
                  })}
                >
                  <Field
                    as={SimpleInput}
                    className={classes.textField}
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    marginr="23px"
                    helperText={
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="first_name" />
                      </Box>
                    }
                    disabled={true}
                  />
                  <Field
                    as={SimpleInput}
                    className={classes.textField}
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    helperText={
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="last_name" />
                      </Box>
                    }
                    disabled={true}
                  />
                </Box>
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  helperText={
                    <Box
                      component="span"
                      className={classes.err}
                      disableGutters
                    >
                      <ErrorMessage name="email" />
                    </Box>
                  }
                  disabled={true}
                />
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  helperText={
                    <Box
                      component="span"
                      className={classes.err}
                      disableGutters
                    >
                      <ErrorMessage name="mobile" />
                    </Box>
                  }
                />
                <Typography className={classes.privacy}>
                  <Box
                    component="img"
                    src={check}
                    alt="check"
                    sx={(theme) => ({
                      marginRight: "13px",
                      [theme.breakpoints.down("iph")]: {
                        marginRight: "8px",
                        width: "20px",
                        height: "20px",
                      },
                    })}
                  />
                  <Box component="span">
                    By clicking Sign Up, I agree to all{" "}
                    <Link
                      to="/terms-and-conditions"
                      target="_"
                      className={classes.textLink}
                    >
                      Terms of Service
                    </Link>{" "}
                    &{" "}
                    <Link
                      to="/privacy-policy"
                      target="_"
                      className={classes.textLink}
                    >
                      Privacy Policy
                    </Link>
                  </Box>
                </Typography>
                <StyledButton2 text="Signup" />
              </Form>
            )}
          </Formik>
        </LoginLayout>
      </React.Fragment>
    </Box>
  );
}
export default SignupWithGoogle;
