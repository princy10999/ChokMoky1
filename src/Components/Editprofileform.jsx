import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stack,
  Autocomplete,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import profile from "../Assests/images/images 6.webp";
import { SimpleInput } from "../Components/Common/SimpleInput";
import StyledButton3 from "./Common/StyledButton3";
import {
  editProfile,
  emailChangeStatus,
  getCount,
  MoveMaster,
  userDetails,
} from "../Redux/Actions/AuthUser";
import { isLoader } from "../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import swal from "sweetalert";
import { ApiPost } from "../Api/Api";
import Swal from "sweetalert2";
import ModalCommonEmail from "./Common/ModalEmail";
import { useAppSelector } from "../Redux/app/hooks";
import ModalCommonNumber from "./Common/ModalNumber";
import upload from "../Assests/images/upload.webp";
import { InvalidNumberKeys } from "../lib/Regax";

const useStyles = makeStyles()((theme) => {
  return {
    profileBox: {
      width: "100%",
      marginLeft: "16px",
      // marginBottom: "60px",
      // marginTop:"4.3rem",
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
      // marginTop: "30px",
      marginBottom: "26px",
    },
    radioBox: {
      display: "flex",
      alignItems: "center",
    },
    radioLabel: {
      fontFamily: "League Spartan",
      fontSize: "18px",
      lineHeight: "16.56px",
      fontWeight: "400",
      marginRight: "20px",
      [theme.breakpoints.down("desktop")]: {
        marginRight: "10px",
      },
      [theme.breakpoints.down("xTab")]: {
        marginRight: "5px",
      },
      [theme.breakpoints.down("mobile")]: {
        marginRight: "10px",
      },
    },
    addressInformation: {
      fontFamily: "League Spartan",
      fontSize: "22px",
      lineHeight: "20.24px",
      fontWeight: "400",
      marginTop: "14px",
      marginBottom: "3px",
    },
    profileGrid: {
      // borderBottom: "9px solid #F4F4F4",
      paddingBottom: "40px",
    },
    uploadButton: {
      textTransform: "none",
      marginRight: "18px",
      width: "100%",
      display: "flex",
      borderRadius: "0px",
      height: "50px",
      justifyContent: "space-between",
      fontFamily: "League Spartan !important",
      fontWeight: "500 !important",
      fontSize: "18px !important",
      lineHeight: "20px",
      [theme.breakpoints.down("smallLaptop")]: {
        marginRight: "10px",
        fontSize: "16px !important",
        padding: "8px 12px",
      },
    },
    endIco: {
      [theme.breakpoints.down("xTab")]: {
        marginRight: "-8px",
        marginLeft: "3px",
      },
      [theme.breakpoints.down("mobile")]: {
        marginRight: "0px",
        marginLeft: "0px",
      },
    },
    err: {
      color: "#EB222C",
      fontSize: "15px",
    },
    cardImage: {
      borderRadius: "50%",
    },
    absoul_spans: {
      position: "absolute",
      top: "39px",
      right: "8px",
      "&:hover": {
        cursor: "pointer",
        svg: {
          color: "#BD3D3D",
        },
      },
      [theme.breakpoints.down("laptop")]: {
        top: "33px",
      },
    },
    absoul_spans2: {
      position: "absolute",
      top: "39px",
      right: "8px",
      "&:hover": {
        cursor: "pointer",
        svg: {
          color: "#BD3D3D",
        },
      },
      [theme.breakpoints.down("laptop")]: {
        top: "33px",
      },
    },
    textField: {
      [`& label`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "18px !important",
        color: "#7E7F84",
        lineHeight: "30px",
        [theme.breakpoints.down("iph")]: {
          fontSize: "17px !important",
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
      "& input[type=number]": {
        "-moz-appearance": "textfield",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },
    upldCont: {
      display: "flex",
    },
    imgDiv: {
      width: "20%",
      [theme.breakpoints.down("smallLaptop")]: {
        width: "25%",
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
      marginTop: "15px",
      marginBottom: "20px",
      border: "1px solid",
    },
  };
});
const Editprofileform = () => {
  const userDetailsCon = useAppSelector(
    (state) => state?.auth?.isUserDetailsData?.userDetail?.result?.userData
  );

  const [user, setUser] = useState();
  const [errorMsg, seterrorMsg] = useState("");
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
  });
  const [sendImage, setSendImage] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [value, setValue] = React.useState("female");
  const [master, setMaster] = useState();

  const userData = async () => {
    if (userDetailsCon) {
      dispatch(isLoader(true));
      const data = await dispatch(userDetails());

      setUser(data?.payload?.result?.userData);
      setInitialValues(data?.payload?.result?.userData);
      setValue(
        data?.payload?.result?.userData?.gender === "M" ? "male" : "female"
      );
      dispatch(isLoader(false));
    }
  };
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  function handleChangeImage(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setSendImage(e.target.files[0]);
  }
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const { classes } = useStyles();
  const emailCode = useAppSelector(
    (state) =>
      state?.auth?.isEmailChangeStatusData?.emailStatus?.status
        ?.email_change_status
  );

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().trim().required("Please enter your first name!"),
    last_name: Yup.string().trim().required("Please enter your last name!"),
    address: Yup.string()
      .trim()
      .required("Please enter your address!")
      .nullable(),
    city: Yup.string().trim().required("Please enter your city!").nullable(),
    state: Yup.string().required("Please select your state!").nullable(),
    country: Yup.string().required("Please select your country!").nullable(),
    postcode: Yup.string().when("country", {
      is: "India",
      then: Yup.string()
        .trim()
        .required("Please enter your ZIPCode!")
        .matches(/^[1-9][0-9]{5}$/, "Invalid zip code!")
        .nullable(),
      otherwise: Yup.string()
        .trim()
        .required("Please enter your ZIPCode!")
        .nullable(),
    }),
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  });
  const [emailError, setEmailError] = useState("");
  const onSubmit = async (values, formikHelpers) => {
    window.scrollTo(0, 0);
    dispatch(isLoader(true));
    // api()
    var formData = new FormData();
    formData.append("first_name", values?.first_name);
    formData.append("last_name", values?.last_name);
    formData.append("email", values?.email ? values?.email : "");
    formData.append("phone", values?.phone.toString());
    formData.append("gender", value === "male" ? "M" : "F");
    formData.append("address", values?.address);
    formData.append("country", values?.country);
    formData.append("state", values?.state);
    formData.append("city", values?.city);
    formData.append("postcode", values?.postcode.toString());
    {
      sendImage && formData.append("profile_pic", sendImage);
    }
    const data = await dispatch(editProfile(formData));

    dispatch(isLoader(false));
    if (data?.payload?.result) {
      setEmailError({ msg: data?.payload?.result?.status?.message, key: true });
      // swal({
      //   title: "Success",
      //   text: data?.payload?.result?.status?.message,
      //   icon: "success",
      // });
      const datas = await dispatch(userDetails());
      setInitialValues(datas?.payload?.result?.userData);
    } else {
      setEmailError({ msg: data?.payload?.error?.meaning, key: false });
      // swal({
      //   title: "Warning",
      //   text: data?.payload?.error?.meaning,
      //   icon: "warning",
      // });
    }
  };

  const api = async () => {
    const body = {
      params: {
        session_id: await sessionStorage.getItem("sessionId"),
      },
    };
    const getUser = await dispatch(MoveMaster(body));

    setMaster(getUser?.payload?.result?.status);
  };

  const closeModal = () => setOpen(false);
  const openModal = () => {
    if (
      initialValues?.temp_email_verified === "Y" ||
      initialValues?.temp_email_verified === null ||
      !emailCode ||
      emailCode === "2"
    ) {
      setOpen(true);
    } else if (
      initialValues?.temp_email_verified === "N" &&
      emailCode === "0"
    ) {
      Swal.fire({
        title: "<strong>Warning</strong>",
        icon: "warning",
        html:
          "We have already send the email to complete the process (please check both inbox & spam folder), if still did not receive the message then " +
          "<a>Click Process button</a>" +
          " to receive the mail (again).",
        showCancelButton: true,
        confirmButtonText: "Process",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(isLoader(true));
          const body = {
            params: { change_email_status: true },
          };
          ApiPost("change-email", body)
            .then((res) => {
              dispatch(isLoader(false));
              if (res?.data?.error) {
                seterrorMsg(res?.data?.error?.meaning);
              } else if (res?.data?.result) {
                swal({
                  title: "Success",
                  text: res?.data?.result?.success,
                  icon: "success",
                });
                closeModal();
                dispatch(emailChangeStatus());
              }
            })
            .catch(async (err) => {});
        }
      });
    } else if (
      initialValues?.temp_email_verified === "N" &&
      emailCode === "1"
    ) {
      Swal.fire({
        title: "<strong>Warning</strong>",
        icon: "warning",
        html:
          "We have already send the email to complete the process (please check both inbox & spam folder), if still did not receive the message then " +
          "<a>Click Process button</a>" +
          " to receive the mail (again).",
        showCancelButton: true,
        confirmButtonText: "Process",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(isLoader(true));
          const body = {
            params: { change_email_status: true },
          };
          ApiPost("change-email", body)
            .then((res) => {
              dispatch(isLoader(true));
              if (res?.data?.error) {
                seterrorMsg(res?.data?.error?.meaning);
              } else if (res?.data?.result) {
                swal({
                  title: "Success",
                  text: res?.data?.result?.success,
                  icon: "success",
                });
                closeModal();
                dispatch(emailChangeStatus());
              }
            })
            .catch(async (err) => {});
        }
      });
    }
  };
  const openModal2 = () => {
    setOpen2(true);
  };
  const [errors, setError] = useState({});
  var validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [newEmail, setNewEmail] = useState("");
  const validateForm2 = () => {
    let errors = {};
    let formIsValid = true;
    if (!newEmail) {
      formIsValid = false;
      errors["newEmail"] = "Please enter email";
    } else if (!newEmail.match(validRegex)) {
      formIsValid = false;
      errors["newEmails"] = "Invalid email address!";
    }
    setError(errors);
    return formIsValid;
  };
  const saveNewEmail = (e, y) => {
    y.preventDefault();
    if (validateForm2()) {
      dispatch(isLoader(true));
      const body = {
        params: { email: newEmail, change_email_status: e },
      };
      ApiPost("change-email", body)
        .then((res) => {
          dispatch(isLoader(false));
          if (res?.data?.error) {
            seterrorMsg(res?.data?.error?.meaning);
          } else if (res?.data?.result) {
            swal({
              title: "Success",
              text: res?.data?.result?.status?.meaning,
              icon: "success",
            });
            closeModal();
            dispatch(emailChangeStatus());
            setInitialValues(res?.data?.result?.userData);
            localStorage.setItem(
              "userData",
              JSON.stringify(res?.data?.result?.userData)
            );
          }
        })
        .catch(async (err) => {});
    }
  };

  useEffect(() => {
    dispatch(isLoader(true));
    ApiPost("country-list", {}).then((res) => {
      if (res?.data?.result) {
        setCountries([res?.data?.result?.country_list]);
        setStates(res?.data?.result?.state_list);
        dispatch(isLoader(false));
      }
    });
    userData();
    dispatch(emailChangeStatus());
    dispatch(getCount());
  }, []);

  useEffect(() => {
    setInitialValues(userDetailsCon);
  }, [userDetailsCon]);

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
        Edit Profile
      </Typography>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.loginForm}>
            {emailError?.msg && (
              <Box
                className={classes.emailErrors}
                color={emailError?.key ? "green" : "#EB222C"}
                borderColor={emailError?.key ? "green" : "#EB222C"}
              >
                {emailError?.msg}
              </Box>
            )}
            <Grid
              container
              className={classes.profileGrid}
              spacing={{
                xSmall: 2,
                laptop: 2,
                smallLaptop: 2,
                desktop: 2.5,
              }}
              columns={{ xSmall: 4, mobile: 8, tab: 8, laptop: 8 }}
            >
              <Grid item mobile={2} xSmall={4}>
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  label="First Name"
                  name="first_name"
                  marginr="23px"
                />
                <Box component="span" className={classes.err} disableGutters>
                  <ErrorMessage name="first_name" />
                </Box>
              </Grid>
              <Grid item mobile={2} xSmall={4}>
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  label="Last Name"
                  name="last_name"
                />
                <Box component="span" className={classes.err} disableGutters>
                  <ErrorMessage name="last_name" />
                </Box>
              </Grid>
              <Grid item mobile={4} xSmall={4} position="relative">
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  label="Email id"
                  name="email"
                  disabled={true}
                />
                {values?.email ? (
                  <Tooltip title="Edit email address">
                    <span
                      className={classes.absoul_spans}
                      onClick={() => openModal()}
                    >
                      <MdModeEdit size={25} />
                    </span>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add email address">
                    <span
                      className={classes.absoul_spans}
                      onClick={() => openModal()}
                    >
                      <AiOutlinePlus size={25} />
                    </span>
                  </Tooltip>
                )}
              </Grid>
              <Grid item mobile={4} xSmall={4} position="relative">
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  label="Mobile number"
                  name="phone"
                  disabled={true}
                />
                {values?.phone ? (
                  <Tooltip title="Edit phone number">
                    <span
                      className={classes.absoul_spans2}
                      onClick={() => openModal2()}
                    >
                      <MdModeEdit size={25} />
                    </span>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add phone number">
                    <span
                      className={classes.absoul_spans2}
                      onClick={() => openModal2()}
                    >
                      <AiOutlinePlus size={25} />
                    </span>
                  </Tooltip>
                )}
              </Grid>
              <Grid item mobile={4} xSmall={4} className={classes.radioBox}>
                <Box className={classes.radioBox}>
                  <FormLabel id="gender" className={classes.radioLabel}>
                    Gender :
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="gender"
                    name="gender"
                    value={value}
                    onChange={handleChange}
                    className={classes.radioGroup}
                  >
                    <Stack direction="row">
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </Stack>
                  </RadioGroup>
                </Box>
              </Grid>
              <Grid item mobile={8} xSmall={4}>
                <Typography className={classes.addressInformation}>
                  Address Information:
                </Typography>
              </Grid>
              <Grid item mobile={8} xSmall={4}>
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  label="Address"
                  name="address"
                />
                <Box component="span" className={classes.err} disableGutters>
                  <ErrorMessage name="address" />
                </Box>
              </Grid>
              <Grid item mobile={4} xSmall={4}>
                <Field
                  className={classes.textField}
                  name="country"
                  as={Autocomplete}
                  options={countries?.map((e) => e?.name)}
                  onChange={(e, value) => {
                    setFieldValue("country", value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Country / Region" />
                  )}
                />
                <Box component="span" className={classes.err} disableGutters>
                  <ErrorMessage name="country" />
                </Box>
              </Grid>
              <Grid item mobile={4} xSmall={4}>
                <Field
                  as={Autocomplete}
                  options={states?.map((e) => e?.name)}
                  className={classes.textField}
                  name="state"
                  onChange={(e, value) => {
                    setFieldValue("state", value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="State" />
                  )}
                />
                <Box component="span" className={classes.err} disableGutters>
                  <ErrorMessage name="state" />
                </Box>
              </Grid>
              <Grid item mobile={4} xSmall={4}>
                <Field
                  as={SimpleInput}
                  className={classes.textField}
                  label="Town / City"
                  name="city"
                />
                <Box component="span" className={classes.err} disableGutters>
                  <ErrorMessage name="city" />
                </Box>
              </Grid>
              <Grid item mobile={4} xSmall={4}>
                <Field
                  as={SimpleInput}
                  type="number"
                  showPassword1={true}
                  className={classes.textField}
                  label="ZIP Code"
                  name="postcode"
                  onKeyDown={(event) => {
                    if (InvalidNumberKeys.includes(event.code)) {
                      event.preventDefault();
                    }
                  }}
                />
                <Box component="span" className={classes.err} disableGutters>
                  <ErrorMessage name="postcode" />
                </Box>
              </Grid>
              <Grid item mobile={4} xSmall={4} className={classes.upldCont}>
                <Button
                  variant="contained"
                  component="label"
                  size="large"
                  className={classes.uploadButton}
                  onChange={handleChangeImage}
                  endIcon={
                    <Box
                      component="img"
                      src={upload}
                      alt
                      className={classes.endIco}
                    />
                  }
                >
                  Upload Profile Image
                  <input hidden accept="image/*" type="file" />
                </Button>
                <Box component="div" className={classes.imgDiv}>
                  <Box
                    className={classes.cardImage}
                    component="img"
                    src={
                      file
                        ? file
                        : values?.profile_image
                        ? values?.image_path + values?.profile_image
                        : profile
                    }
                    alt="profile pic"
                    sx={(theme) => ({
                      width: "50px",
                      height: "50px",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    })}
                  />
                </Box>
              </Grid>
            </Grid>
            <StyledButton3 text="Save & Continue" width="250px" />
          </Form>
        )}
      </Formik>
      <ModalCommonEmail
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        initialValues={initialValues}
      />
      <ModalCommonNumber
        initialValues={initialValues}
        open={open2}
        handleClose={handleClose2}
        handleOpen={handleOpen2}
      />
    </Box>
  );
};
export default Editprofileform;
