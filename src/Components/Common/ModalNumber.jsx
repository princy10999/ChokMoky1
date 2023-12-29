import { Box, Typography, Modal, Grid } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { SimpleInput } from "./SimpleInput";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { ApiPost } from "../../Api/Api";
// import swal from "sweetalert";
import OtpInput from "react-otp-input";
import { userDetails } from "../../Redux/Actions/AuthUser";
import StyledButton2 from "./StyledButton2";
import { InvalidNumberKeys } from "../../lib/Regax";
import swal from "sweetalert";

const useStyles = makeStyles()((theme) => {
  return {
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 800,
      background: "white",
      borderRadius: "10px",
      boxShadow: 24,
      p: 4,
      [theme.breakpoints.down("tab")]: {
        width: "100%",
        height: 400,
      },
    },
    style2: {
      margin: "60px 20px 20px 20px",
      boxShadow: "#80808073 1px 1px 11px 0px",
      borderRadius: "10px",
    },
    loginForm: {
      padding: "20px",
    },
    close: {
      position: "absolute",
      top: "10px",
      right: "10px",
      cursor: "pointer",
    },
    err: {
      color: "#EB222C",
      fontSize: "15px",
    },
    loginHead: {
      fontFamily: "League Spartan",
      fontWeight: "500",
      fontSize: "39px",
      lineHeight: "36px",
      color: "#35364F",
      marginBottom: "10px",
      [theme.breakpoints.down("iph")]: {
        fontSize: "30px",
      },
    },
    error: {
      padding: "10px",
      marginBottom: "10px",
    },
  };
});
const ModalCommon = ({ initialValues, open, handleClose }) => {
  const [type, setType] = useState("");
  const [otp, setOtp] = useState({ otp: "" });
  const [otp2, setOtp2] = useState({ otp2: "" });
  const [meassge, setMeassge] = useState("");
  const [otpFromApi, setOtpFromApi] = useState("");
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const handleChange = (otp) => setOtp({ otp });
  const handleChange2 = (otp2) => setOtp2({ otp2 });
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Please enter your mobile number!")
      .matches(/^([0-9]*)$/, "Invalid mobile number!")
      .min(10, "Mobile number must be at least 10 characters!")
      .max(10, "Mobile number contains maximum 10 characters!"),
  });
  const onSubmit = (e, values) => {
    dispatch(isLoader(true));
    const body = {
      params: { phone: values.phone.toString() },
    };
    ApiPost(
      `${initialValues?.phone ? "change-phone" : "add-phone"}`,
      body
    ).then((res) => {
      dispatch(isLoader(false));
      if (res?.data?.error) {
        swal({
          title: "warning",
          text: res?.data?.error?.meaning,
          icon: "warning",
        });
      } else if (res?.data?.result) {
        setType("2");
        setOtpFromApi(res?.data?.result?.otp);
      }
    });
  };
  const onSubmit1 = async (e, values) => {
    if (otp?.otp?.length < 6) {
      setMeassge("Please Enter Otp!");
    } else {
      dispatch(isLoader(true));
      const body = {
        params: { otp: otp },
      };
      ApiPost("verifyUserPhone", body).then((res) => {
        dispatch(isLoader(false));
        if (res?.data?.error) {
          swal({
            title: "warning",
            text: res?.data?.error?.meaning,
            icon: "warning",
          });
        } else if (res?.data?.result) {
          setType("");
          setMeassge("");
          handleClose();
          setOtp("");
          dispatch(userDetails());
          swal({
            title: "success",
            text: res?.data?.result.status?.meaning,
            icon: "success",
          });
        }
      });
    }
  };
  const onSubmit2 = (e, values) => {
    if (otp?.otp?.length < 6) {
      setMeassge("Please Enter Otp!");
    } else {
      dispatch(isLoader(true));
      const body = {
        params: { otp: otp },
      };
      ApiPost("phone-change-verify", body).then((res) => {
        dispatch(isLoader(false));
        if (res?.data?.error) {
          // swal({
          //   title: "warning",
          //   text: res?.data?.error?.meaning,
          //   icon: "warning",
          // });
        } else if (res?.data?.result) {
          setType("3");
          setOtpFromApi(res?.data?.result?.temp_otp);
          setMeassge(res?.data?.result?.status?.meaning);
          setOtp("");
        }
      });
    }
  };
  const onSubmit3 = (e, values) => {
    if (otp2?.otp2?.length < 6) {
      setMeassge("Please Enter Otp!");
    } else {
      dispatch(isLoader(true));
      const body = {
        params: { otp: otp2 },
      };
      ApiPost("temp-phone-verify", body).then((res) => {
        dispatch(isLoader(false));
        if (res?.data?.error) {
          // swal({
          //   title: "warning",
          //   text: res?.data?.error?.meaning,
          //   icon: "warning",
          // });
        } else if (res?.data?.result) {
          handleClose();
          dispatch(userDetails());
          // swal({
          //   title: "success",
          //   text: res?.data?.result.status?.meaning,
          //   icon: "success",
          // });
          setOtp2("");
          setType("");
          setMeassge("");
        }
      });
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes?.style}>
        <Box className={classes?.style2}>
          {type === "" && (
            <Formik
              enableReinitialize={true}
              initialValues={{ phone: "" }}
              validationSchema={validationSchema}
              onSubmit={(e) => onSubmit(false, e)}
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
                  >
                    <Grid item mobile={12} xSmall={12}>
                      <Typography
                        fontStyle="normal"
                        fontWeight="600"
                        fontSize="30px"
                        lineHeight="38px"
                        letterSpacing="0.01em"
                        textTransform="capitalize"
                        color="#181818"
                        marginBottom="10px"
                      >
                        Change Number
                      </Typography>
                      <Field
                        as={SimpleInput}
                        type="number"
                        className={classes.textField}
                        label="Phone number"
                        name="phone"
                        marginr="23px"
                        InputProps={{ min: 0 }}
                        onKeyDown={(event) => {
                          if (InvalidNumberKeys.includes(event.code)) {
                            event.preventDefault();
                          }
                        }}
                        helperText={
                          <Box
                            component="span"
                            className={classes.err}
                            disableGutters
                          >
                            <ErrorMessage name="phone" />
                          </Box>
                        }
                      />
                    </Grid>
                  </Grid>
                  <Box style={{ marginTop: "5%", width: "250px" }}>
                    <StyledButton2 text="Save & Continue" width="230px" />
                  </Box>
                </Form>
              )}
            </Formik>
          )}
          {type === "2" && (
            <Formik
              initialValues={{ otp: "" }}
              onSubmit={initialValues?.phone ? onSubmit2 : onSubmit1}
            >
              {({ values, setFieldValue }) => (
                <Form className={classes.loginForm}>
                  <Typography
                    className={classes.loginHead}
                  >{`OTP verification : ${otpFromApi}`}</Typography>
                  <Typography className={classes.error}>{meassge}</Typography>
                  <OtpInput
                    value={otp.otp}
                    isInputNum={true}
                    onChange={handleChange}
                    numInputs={6}
                    separator={<span className="otpspace"></span>}
                    inputStyle={"inputStyle"}
                    focusStyle={"focusStyle"}
                  />
                  <Box style={{ marginTop: "5%", width: "250px" }}>
                    <StyledButton2 text="Verification" width="230px" />
                  </Box>
                </Form>
              )}
            </Formik>
          )}
          {type === "3" && (
            <Formik initialValues={{ otp2: "" }} onSubmit={onSubmit3}>
              {({ values, setFieldValue }) => (
                <Form className={classes.loginForm}>
                  <Typography
                    className={classes.loginHead}
                  >{`OTP verification : ${otpFromApi}`}</Typography>
                  <Typography className={classes.error}>{meassge}</Typography>
                  <OtpInput
                    value={otp2?.otp2}
                    isInputNum={true}
                    onChange={handleChange2}
                    numInputs={6}
                    separator={<span className="otpspace"></span>}
                    inputStyle={"inputStyle"}
                    focusStyle={"focusStyle"}
                  />
                  <Box style={{ marginTop: "5%", width: "250px" }}>
                    <StyledButton2 text="Verification" width="230px" />
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </Box>
        <CloseIcon className={classes.close} onClick={() => handleClose()} />
      </Box>
    </Modal>
  );
};
export default ModalCommon;
