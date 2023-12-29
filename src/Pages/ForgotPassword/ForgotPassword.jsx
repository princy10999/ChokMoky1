import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import { SimpleInput } from "../../Components/Common/SimpleInput";
import StyledButton2 from "../../Components/Common/StyledButton2";
import { LoginLayout } from "../../Components/Common/LoginLayout";
import { forgetPassword } from "../../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles()((theme) => {
  return {
    forgotForm: {
      paddingTop: "4px",
      paddingBottom: "15px",
      [theme.breakpoints.down("iph")]: {
        paddingTop: "0px",
      },
    },
    textField: {
      marginTop: "24px",
      marginBottom: "24px",
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
    err: {
      color: "#EB222C",
      fontSize: "15px",
    },
  };
});
function ForgotPassword() {
  const [error, setError] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "ForgotPassword - Chokmoki";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please enter email!")
      .email("Please enter a valid email address!")
      .nullable(),
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
    const data = await dispatch(forgetPassword(body));

    if (data.payload.error) {
      dispatch(isLoader(false));
      setIsAlertVisible(true);
      setError(data?.payload?.error?.meaning);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } else {
      dispatch(isLoader(false));
      if (data?.payload?.result?.otp) {
        navigate("/signup-success", {
          state: {
            success: data?.payload?.result?.status?.meaning,
          },
        });
      }
    }
    formikHelpers.resetForm();
  };
  return (
    <Box>
      <LoginLayout
        emailError={error}
        isAlertVisible={isAlertVisible}
        text=""
        title="Forgot Password"
        option="Login?"
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
            <Form className={classes.forgotForm}>
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
              <StyledButton2 text="Submit" />
            </Form>
          )}
        </Formik>
      </LoginLayout>
    </Box>
  );
}
export default ForgotPassword;
