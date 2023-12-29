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
import { useDispatch } from "react-redux";
import { userSignupWithEmail } from "../../Redux/Actions/AuthUser";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";
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
function SignupWithEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [emailError, setEmailError] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const [value, setValue] = React.useState({
    showPassword: true,
    showPassword1: true,
  });
  const handleClickShowPassword = () => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };
  const handleClickShowPassword1 = () => {
    setValue({
      ...value,
      showPassword1: !value.showPassword1,
    });
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email!")
      .required("Please enter email id!"),
    first_name: Yup.string().required("Please enter your first name!"),
    last_name: Yup.string().required("Please enter your last name!"),
    password: Yup.string()
      .required("Please enter a password!")
      .min(6, "Please give atleast 6 character!")
      .max(10, "Please give atleast 10 character!"),
    mobile: Yup.string()
      .matches(/^([0-9\s\-+()]*)$/, "Invalid mobile number!")
      .min(10, "Mobile number must be at least 10 characters!")
      .max(10, "Mobile number contains maximum 10 characters!"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords is not matching!")
      .required("Please confirm your password!"),
  });
  const initialValues = {
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const onSubmit = async (values, formikHelpers) => {
    dispatch(isLoader(true));
    const data = await dispatch(userSignupWithEmail(values));
    if (data.payload.error) {
      dispatch(isLoader(false));
      setIsAlertVisible(true);
      setEmailError(data?.payload?.error?.meaning);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } else {
      dispatch(isLoader(false));
      navigate("/signup-success", {
        state: {
          success: data?.payload?.result?.status?.meaning,
        },
      });
    }
  };

  return (
    <Box>
      <React.Fragment>
        <SEOPart data={SeoData?.signupEmail} />
        <LoginLayout
          emailError={emailError}
          isAlertVisible={isAlertVisible}
          text="Please fill in the below fields to create an account"
          title="Signup with email Id."
          option="Login Now"
          link="/login"
          margin="-60px"
          hight="108%"
          padding="60px 64px 40px 58px"
          mt="37px"
          iphmt="20px"
        >
          <Formik
            initialValues={initialValues}
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
                    <Box
                      component="span"
                      className={classes.err}
                      disableGutters
                    >
                      <ErrorMessage name="email" />
                    </Box>
                  }
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
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  helperText={
                    <Box
                      component="span"
                      className={classes.err}
                      disableGutters
                    >
                      <ErrorMessage name="password" />
                    </Box>
                  }
                  eye={true}
                  showPassword={value.showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                />
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  fullWidth
                  id="confirm_password"
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  value={values.confirm_password}
                  helperText={
                    <Box
                      component="span"
                      className={classes.err}
                      disableGutters
                    >
                      <ErrorMessage name="confirm_password" />
                    </Box>
                  }
                  eye1={true}
                  showPassword1={value.showPassword1}
                  handleClickShowPassword1={handleClickShowPassword1}
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
export default SignupWithEmail;
