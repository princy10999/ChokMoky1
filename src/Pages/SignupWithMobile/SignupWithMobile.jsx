import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import { SimpleInput } from "../../Components/Common/SimpleInput";
import StyledButton2 from "../../Components/Common/StyledButton2";
import { LoginLayout } from "../../Components/Common/LoginLayout";
import check from "../../Assests/images/check.webp";
import { userSignupWithMobile } from "../../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";
import { InvalidNumberKeys } from "../../lib/Regax";
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
      paddingTop: "17px",
      paddingBottom: "36px",
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
  };
});
function SignupWithMobile() {
  const [emailError, setEmailError] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyles();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email!"),
    first_name: Yup.string().required("Please enter your first name!"),
    last_name: Yup.string().required("Please enter your last name!"),
    phone: Yup.string()
      .required("Please enter your mobile number!")
      .matches(/^([0-9\s\-+()]*)$/, "Invalid mobile number!")
      .min(10, "Mobile number must be at least 10 characters!")
      .max(10, "Mobile number contains maximum 10 characters!"),
  });
  const initialValues = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  };
  const onSubmit = async (values, formikHelpers) => {
    dispatch(isLoader(true));
    const data = await dispatch(userSignupWithMobile(values));
    if (data.payload.error) {
      dispatch(isLoader(false));
      setIsAlertVisible(true);
      setEmailError(data?.payload?.error?.meaning);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } else {
      dispatch(isLoader(false));
      navigate(`/otp-verification/${data?.payload?.result?.status?.otp}/s`, {
        state: {
          number: values.phone.toString(),
        },
      });
      formikHelpers.resetForm();
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  return (
    <Box>
      <SEOPart data={SeoData?.signupPhone} />
      <LoginLayout
        emailError={emailError}
        isAlertVisible={isAlertVisible}
        text="Please fill in the below fields to create an account"
        title="Signup with mobile number"
        option="Login Now"
        link="/login"
        margin="-60px"
        hight="auto"
        padding="61px 64px 49px 58px"
        mt="38px"
        iphmt="20px"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
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
                  <Box component="span" className={classes.err} disableGutters>
                    <ErrorMessage name="email" />
                  </Box>
                }
              />
              <Field
                as={SimpleInput}
                type="number"
                className={classes.textField}
                fullWidth
                id="mobile"
                label="Mobile Number"
                name="phone"
                InputProps={{ min: 0 }}
                onKeyDown={(event) => {
                  if (InvalidNumberKeys.includes(event.code)) {
                    event.preventDefault();
                  }
                }}
                helperText={
                  <Box component="span" className={classes.err} disableGutters>
                    <ErrorMessage name="phone" />
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
    </Box>
  );
}
export default SignupWithMobile;
