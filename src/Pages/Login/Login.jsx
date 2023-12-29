import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import { SimpleInput } from "../../Components/Common/SimpleInput";
import StyledButton2 from "../../Components/Common/StyledButton2";
import { LoginLayout } from "../../Components/Common/LoginLayout";
import BottomLoginButton from "../../Components/Common/BottomLoginButton";
import { loginCheack, socialLogin } from "../../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
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
      // [theme.breakpoints.down("iph")]: {
      //   paddingTop: " 11px",
      // },
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
function Login() {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const navigate = useNavigate();
  const { classes } = useStyles();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const [value, setValue] = React.useState({
    showPassword: true,
  });
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Please enter email/mobile number"),
  });
  const initialValues = {
    email: "",
  };
  const onSubmit = async (values, formikHelpers) => {
    dispatch(isLoader(true));
    const body = {
      params: {
        email: values.email,
      },
    };
    const data = await dispatch(loginCheack(body));
    if (data.payload.error) {
      dispatch(isLoader(false));
      setIsAlertVisible(true);
      setEmailError(data?.payload?.error?.meaning);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } else if (
      data.payload.result.verified === "N" &&
      data.payload.result.otp
    ) {
      dispatch(isLoader(false));
      navigate(`/otp-verification/${data?.payload?.result?.otp}/s`);
    } else if (data.payload.result.verified === "N") {
      dispatch(isLoader(false));
      setIsAlertVisible(true);
      setEmailError(data?.payload?.result?.status?.meaning);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
      navigate("/signup-success", {
        state: {
          success: data?.payload?.result?.status?.meaning,
        },
      });
    } else if (
      data.payload.result.status &&
      !data.payload.result.otp &&
      !data.payload.result.type
    ) {
      dispatch(isLoader(false));
      setIsAlertVisible(true);
      setEmailError(data?.payload?.result?.status?.meaning);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } else if (data.payload.result.otp && data.payload.result.status) {
      dispatch(isLoader(false));
      navigate(`/otp-verification/${data?.payload?.result?.otp}/l`, {
        state: {
          number: values.email,
        },
      });
    } else if (data.payload.result.type) {
      dispatch(isLoader(false));
      navigate(`/password`, {
        state: {
          email: values.email,
        },
      });
    }
    formikHelpers.resetForm();
  };
  const responseFacebook = async (response) => {
    if (response?.data) {
      dispatch(isLoader(true));
      const body = {
        params: {
          social_id: response?.data?.userID,
          type: "F",
          first_name: response?.data?.first_name,
          last_name: response?.data?.last_name,
          email: response?.data?.email,
          action_type: "L",
        },
      };
      if (sessionStorage.getItem("sessionId")) {
        body.params.session_id = sessionStorage.getItem("sessionId")
          ? sessionStorage.getItem("sessionId")
          : null;
      }
      const data = await dispatch(socialLogin(body));
      dispatch(isLoader(false));
      if (data?.payload?.error) {
        setIsAlertVisible(true);
        setEmailError(data?.payload?.error?.meaning);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 3000);
      } else if (data?.payload?.result) {
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
        }, 500);
      }
    }
  };

  const responseGoogle = async (res) => {
    if (res?.googleId) {
      dispatch(isLoader(true));
      const body = {
        params: {
          social_id: res?.googleId,
          type: "G",
          first_name: res?.profileObj?.givenName,
          last_name: res?.profileObj?.familyName,
          email: res?.profileObj?.email,
          action_type: "L",
        },
      };
      if (sessionStorage.getItem("sessionId")) {
        body.params.session_id = sessionStorage.getItem("sessionId")
          ? sessionStorage.getItem("sessionId")
          : null;
      }
      const data = await dispatch(socialLogin(body));
      dispatch(isLoader(false));
      if (data?.payload?.error) {
        window.scrollTo(0, 0);
        setIsAlertVisible(true);
        setEmailError(data?.payload?.error?.meaning);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 3000);
      } else if (data?.payload?.result) {
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
      }
    }
  };

  return (
    <div>
      <Box>
        <SEOPart data={SeoData?.login} />
        <LoginLayout
          emailError={emailError}
          isAlertVisible={isAlertVisible}
          text="Welcome Back, Please login to continue"
          title="Login"
          // option="Create account?"
          // link="/signup"
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
                  id="email"
                  label="Email Address / Mobile Number"
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
                <Typography className={classes.forgotText}>
                  <Link to={"/forgot-password"} className={classes.textForgot}>
                    Forgot your password?
                  </Link>
                </Typography>
                <StyledButton2 text="Login" />
              </Form>
            )}
          </Formik>
          <BottomLoginButton
            responseFacebook={responseFacebook}
            responseGoogle={responseGoogle}
            option="Create account?"
            link="/signup"
            mt="30px"
            iphmt="22px"
          />
        </LoginLayout>
      </Box>
    </div>
  );
}
export default Login;
