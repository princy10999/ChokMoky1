import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import { SimpleInput } from "../../Components/Common/SimpleInput";
import StyledButton2 from "../../Components/Common/StyledButton2";
import { LoginLayout } from "../../Components/Common/LoginLayout";
import { loginCheackWithEmail } from "../../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
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
        },
      },
    },
    forgotText: {
      textAlign: "right",
      paddingTop: "19px",
      paddingBottom: "31px",
      color: "#5C5C63",
      fontFamily: "League Spartan !important",
      fontWeight: "400 !important",
      fontSize: "19px !important",
      lineHeight: "18px !important",
      [theme.breakpoints.down("iph")]: {
        fontSize: "16px !important",
        paddingTop: "16px",
        paddingBottom: "25px",
      },
      "&:hover": {
        color: "#BD3D3D",
      },
    },
    textForgot: {
      color: "#5C5C63",
      fontFamily: "League Spartan !important",
      fontWeight: "400 !important",
      fontSize: "19px !important",
      lineHeight: "18px !important",
      [theme.breakpoints.down("iph")]: {
        fontSize: "16px !important",
      },
      "&:hover": {
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
    },
  };
});
function Password() {
  const [loginError, setLoginError] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyles();

  const [value, setValue] = React.useState({
    showPassword: true,
  });
  const handleClickShowPassword = () => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please enter a password!")
      .min(6, "Password must be at least 6 character!")
      .max(10, "Password must be at least 6 character!"),
  });
  const initialValues = {
    password: "",
  };
  const onSubmit = async (values, formikHelpers) => {
    dispatch(isLoader(true));
    const body = {
      params: {
        email: location?.state?.email,
        password: values.password,
      },
    };
    if (sessionStorage.getItem("sessionId")) {
      body.params.session_id = sessionStorage.getItem("sessionId")
        ? sessionStorage.getItem("sessionId")
        : null;
    }
    const data = await dispatch(loginCheackWithEmail(body));
    if (data.payload.error) {
      dispatch(isLoader(false));
      setIsAlertVisible(true);
      setLoginError(data?.payload?.error?.meaning);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } else {
      dispatch(isLoader(false));
      localStorage.setItem("access_token", data?.payload?.result?.token);
      localStorage.setItem(
        "userData",
        JSON.stringify(data?.payload?.result?.userdata)
      );
      if (data?.payload?.result?.userdata?.address) {
        navigate("/dashboard");
      } else {
        navigate("/edit-profile");
      }
    }
    formikHelpers.resetForm();
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Password - Chokmoki";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  return (
    <Box>
      <LoginLayout
        emailError={loginError}
        isAlertVisible={isAlertVisible}
        text="Welcome Back, Please login to continue"
        title="Login"
        option=""
        link="/signup"
        margin="-60px"
        hight="auto"
        padding="53px 57px 43px 66px"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={classes.loginForm}>
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
                  <Box component="span" className={classes.err} disableGutters>
                    <ErrorMessage name="password" />
                  </Box>
                }
                eye={true}
                showPassword={value.showPassword}
                handleClickShowPassword={handleClickShowPassword}
              />
              <Typography className={classes.forgotText}>
                <Link to={"/forgot-password"} className={classes.textForgot}>
                  Forgot your password?
                </Link>
              </Typography>
              <StyledButton2 text="Login" />
            </Form>
          )}
        </Formik>
      </LoginLayout>
    </Box>
  );
}
export default Password;
