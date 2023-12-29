import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/material";
import { LoginLayout } from "../../Components/Common/LoginLayout";
import OtpInput from "react-otp-input";
import StyledButton2 from "../../Components/Common/StyledButton2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import {
  loginCheackWithOtp,
  mobileVerify,
  resendOtp,
} from "../../Redux/Actions/AuthUser";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { InvalidNumberKeys } from "../../lib/Regax";
const useStyles = makeStyles()((theme) => {
  return {
    signup: {
      paddingTop: "33px",
      width: "467px",
      [theme.breakpoints.down("laptop")]: {
        width: "97%",
        margin: "0 auto",
      },
    },
  };
});
function OtpVerification() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [otpError, setOtpError] = useState("");
  const { code } = useParams();
  const { type } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [otp, setOtp] = useState({ otp: "" });
  const [resendOtpFromApi, setResendOtpFromApi] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    setPhoneNumber(location?.state?.number);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Otp Verification - Chokmoki";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const handleChange = (otp) => setOtp({ otp });
  const initialValues = {
    otp: "",
  };
  const onSubmit = async () => {
    if (otp?.otp.length < 6) {
      setIsAlertVisible(true);
      setOtpError("Please Enter Otp!");
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } else {
      dispatch(isLoader(true));
      const body = {
        params: {
          otp: otp.otp,
        },
      };
      const data = await dispatch(mobileVerify(body));
      if (data.payload.error) {
        dispatch(isLoader(false));
        setIsAlertVisible(true);
        setOtpError(data.payload.error?.meaning);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 3000);
      } else {
        dispatch(isLoader(false));
        navigate("/login");
      }
    }
  };
  const onSubmit2 = async () => {
    if (otp?.otp.length < 6) {
      setIsAlertVisible(true);
      setOtpError("Please Enter Otp!");
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } else {
      dispatch(isLoader(true));
      const body = {
        params: {
          phone: phoneNumber.toString(),
          otp: otp?.otp,
          session_id: (await sessionStorage.getItem("sessionId"))
            ? await sessionStorage.getItem("sessionId")
            : null,
        },
      };
      // if (sessionStorage.getItem("sessionId")) {
      //   body.params.session_id =await sessionStorage.getItem("sessionId") ? await sessionStorage.getItem("sessionId") : null
      // }
      const data = await dispatch(loginCheackWithOtp(body));
      if (data?.payload?.error) {
        dispatch(isLoader(false));
        setIsAlertVisible(true);
        setOtpError(data.payload.error?.meaning);
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
    }
  };
  const resendOtpFunction = async () => {
    dispatch(isLoader(true));
    const body = {
      params: {
        phone: phoneNumber.toString(),
      },
    };
    const data = await dispatch(resendOtp(body));
    setResendOtpFromApi(data?.payload?.result?.otp);
    dispatch(isLoader(false));
  };
  return (
    <Box
      onClick={() => {
        document.getElementById("circularMenu").classList.remove("active");
      }}
    >
      <LoginLayout
        emailError={otpError}
        isAlertVisible={isAlertVisible}
        text="Please enter the verification, send to your mobile no."
        title={`OTP verification : ${
          resendOtpFromApi ? resendOtpFromApi : code
        }`}
        option="Resend Code"
        link="#"
        margin="-120px"
        hight="auto"
        padding="112px 64px 79px 58px"
        mt="67px"
        iphmt="16px"
        onClick={resendOtpFunction}
      >
        <Box component="div" disableGutters className={classes.signup}>
          <Formik
            initialValues={initialValues}
            onSubmit={type === "s" ? onSubmit : onSubmit2}
          >
            {({ values, setFieldValue }) => (
              <Form className={classes.loginForm}>
                <OtpInput
                  type="number"
                  value={otp.otp}
                  isInputNum={true}
                  onChange={handleChange}
                  numInputs={6}
                  InputProps={{ min: 0 }}
                  onKeyDown={(event) => {
                    if (InvalidNumberKeys.includes(event.code)) {
                      event.preventDefault();
                    }
                  }}
                  separator={<span className="otpspace"></span>}
                  inputStyle={"inputStyle"}
                  focusStyle={"focusStyle"}
                />
                <Box component="div" sx={{ mt: "30px" }}>
                  <StyledButton2 text="Verification" />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </LoginLayout>
    </Box>
  );
}
export default OtpVerification;
