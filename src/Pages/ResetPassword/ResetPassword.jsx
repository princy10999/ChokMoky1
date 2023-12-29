import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import { SimpleInput } from "../../Components/Common/SimpleInput";
import StyledButton2 from "../../Components/Common/StyledButton2";
import { LoginLayout } from "../../Components/Common/LoginLayout";
import { useDispatch } from "react-redux";
import { resetPassword, verifyOtp } from "../../Redux/Actions/AuthUser";
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
    textField2: {
      marginTop: "24px",
      marginBottom: "24px",
      [`& label`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "19px !important",
        color: "#7E7F84",
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
    err: {
      color: "#EB222C",
      fontSize: "15px",
      lineHeight: "15px",
    },
  };
});
function ResetPassword() {
  const { otp } = useParams();
  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [emailError, setEmailError] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const verifyOTP = async () => {
    dispatch(isLoader(true));
    const body = {
      params: {
        email: email,
        otp: otp,
      },
    };
    const data = await dispatch(verifyOtp(body));
    if (data.payload.error) {
      setIsAlertVisible(true);
      setEmailError(data.payload.error?.meaning);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } else {
    }
    dispatch(isLoader(false));
  };
  useEffect(() => {
    verifyOTP();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    document.title = "Reset Password- Chokmoki";
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
    password: Yup.string()
      .required("Please enter a password!")
      .min(6, "Please give atleast 6 character!")
      .max(10, "Please enter max 10 character!"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords is not matching!")
      .min(6, "Please give atleast 6 character!")
      .max(10, "Please enter max 10 character!")
      .required("Please confirm your password!"),
  });
  const initialValues = {
    password: "",
    confirm_password: "",
  };
  const onSubmit = async (values, formikHelpers) => {
    dispatch(isLoader(true));
    const body = {
      params: {
        otp: otp,
        password: values.password,
      },
    };
    const data = await dispatch(resetPassword(body));
    if (data?.payload?.result?.status?.meaning) {
      navigate("/login");
    } else {
      setIsAlertVisible(true);
      setEmailError(data?.payload?.error?.meaning);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    }
    dispatch(isLoader(false));
  };
  return (
    <Box>
      <React.Fragment>
        <LoginLayout
          emailError={emailError}
          isAlertVisible={isAlertVisible}
          text=""
          title="Create new password"
          option=""
          link="/login"
          margin="-29px"
          hight="108%"
          padding="60px 64px 40px 58px"
          mt="37px"
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
                  className={classes.textField2}
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
                <StyledButton2 text="Change password" />
              </Form>
            )}
          </Formik>
        </LoginLayout>
      </React.Fragment>
    </Box>
  );
}
export default ResetPassword;
