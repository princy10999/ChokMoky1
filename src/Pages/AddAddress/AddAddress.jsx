import React, { useState } from "react";
import SideBar from "../../Components/Common/SideBar";
import { makeStyles } from "tss-react/mui";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { Grid, Autocomplete, TextField } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SimpleInput } from "../../Components/Common/SimpleInput";
import StyledButton3 from "../../Components/Common/StyledButton3";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import { ApiPost } from "../../Api/Api";
// import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { InvalidNumberKeys } from "../../lib/Regax";

const useStyles = makeStyles()((theme) => {
  return {
    topColor: {
      backgroundColor: "#FCF8ED",
      height: "3.5rem",
    },
    mainBox: {
      display: "flex",
      margin: "-57px auto 0 auto",
      paddingLeft: "15px",
      paddingRight: "15px",
      height: "100%",
      maxWidth: "1200px",
      [theme.breakpoints.down("laptop")]: {
        maxWidth: "767px",
      },
      [theme.breakpoints.down("mobile")]: {
        maxWidth: "575px",
      },
      // display: "flex",
      // marginTop: "-57px",
      // padding: "0px 160px 0px 160px",
      // [theme.breakpoints.down("mLaptop")]: {
      //   padding: "0px 80px 0px 80px",
      // },
      // [theme.breakpoints.down("xDesktop")]: {
      //   padding: "0px 60px 0px 60px",
      // },
      // [theme.breakpoints.down("laptop")]: {
      //   padding: "0px 39px 0px 39px",
      // },
      // [theme.breakpoints.down("tab")]: {
      //   padding: "0px 30px 0px 30px",
      // },
      // [theme.breakpoints.down("stab")]: {
      //   padding: "0px 30px 0px 30px",
      // },
      // [theme.breakpoints.down("iph")]: {
      //   padding: "0px 10px 0px 10px",
      // },
    },
    profileBox: {
      width: "100%",
      marginLeft: "16px",
      padding: "82px 0px 52px 36px!important",
      margin: "0px !important",
      [theme.breakpoints.down("smallLaptop")]: {
        padding: "92px 0px 67px 26px !important",
      },
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
      marginBottom: "26px",
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
    err: {
      color: "#EB222C",
      fontSize: "15px",
    },
    cardImage: {
      borderRadius: "50%",
    },
    absoul_spans: {
      position: "absolute",
      top: "33px",
      right: "8px",
      "&:hover": {
        cursor: "pointer",
        svg: {
          color: "#BD3D3D",
        },
      },
      [theme.breakpoints.down("laptop")]: {
        top: "25px",
      },
    },
    absoul_spans2: {
      position: "absolute",
      top: "33px",
      right: "8px",
      "&:hover": {
        cursor: "pointer",
        svg: {
          color: "#BD3D3D",
        },
      },
      [theme.breakpoints.down("laptop")]: {
        top: "25px",
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
  };
});

function AddAddress() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [addressDetail, setAddressDetail] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (id) {
      document.title = "Edit Address - Chokmoki";
    } else {
      document.title = "Add Address - Chokmoki";
    }
    dispatch(isLoader(true));
    ApiPost("country-list", {}).then((res) => {
      if (res?.data?.result) {
        setCountries([res?.data?.result?.country_list]);
        setStates(res?.data?.result?.state_list);
        dispatch(isLoader(false));
      }
    });
    if (id) {
      let data = {
        params: {
          id: id,
        },
      };
      ApiPost("address-edit", data).then((res) => {
        setAddressDetail(res?.data?.details);
      });
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const initialValues = {
    first_name: addressDetail?.first_name ? addressDetail.first_name : "",
    last_name: addressDetail?.last_name ? addressDetail.last_name : "",
    email: addressDetail?.email ? addressDetail.email : "",
    phone: addressDetail?.mobile ? addressDetail.mobile : "",
    address: addressDetail?.address ? addressDetail.address : "",
    city: addressDetail?.city ? addressDetail.city : "",
    state: addressDetail?.state ? addressDetail.state : "",
    country: addressDetail?.country ? addressDetail.country : "",
    postcode: addressDetail?.postcode ? addressDetail.postcode : "",
  };
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().trim().required("Please enter your first name!"),
    last_name: Yup.string().trim().required("Please enter your last name!"),
    email: Yup.string()
      .trim()
      .email("Please enter a valid email address!")
      .required("Please enter email address!"),
    phone: Yup.string()
      .trim()
      .required("Please enter your phone number!")
      .matches(/^([0-9\s\-+()]*)$/, "Invalid phone number!")
      .min(10, "Phone number must be at least 10 characters!")
      .max(10, "Phone number contains maximum 10 characters!"),
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
  const onSubmit = (values) => {
    let data = {
      params: {
        id: id ? id : null,
        first_name: values.first_name,
        last_name: values.last_name,
        address: values.address,
        country_id: values.country,
        state: values.state,
        city: values.city,
        postcode: values.postcode.toString(),
        mobile: values.phone.toString(),
        email: values.email,
        default_shipping_address: "Y",
      },
    };
    dispatch(isLoader(true));
    let url = "add-address";
    if (id) {
      url = "update-address";
    }
    ApiPost(url, data).then((res) => {
      navigate("/address-book");
      dispatch(isLoader(false));
    });
  };
  return (
    <Box>
      <Box className={classes.ProductPage}>
        <Box className={classes.topColor}></Box>
        <Box className={classes.mainBox}>
          <SideBar />
          <Box className={classes.profileBox}>
            <Typography variant="h1" className={classes.profileHead}>
              {id ? "Edit" : "Add"} Address
            </Typography>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className={classes.loginForm}>
                  <Grid item mobile={8} xSmall={4} sx={{ mb: "12px" }}>
                    <Typography className={classes.addressInformation}>
                      Basic Information:
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    className={classes.profileGrid}
                    spacing={{
                      xSmall: 1,
                      laptop: 2,
                      smallLaptop: 2,
                      desktop: 2.5,
                    }}
                    columns={{ xSmall: 4, mobile: 8, tab: 8, laptop: 8 }}
                  >
                    <Grid item mobile={4} xSmall={4}>
                      <Field
                        as={SimpleInput}
                        className={classes.textField}
                        label="First Name"
                        name="first_name"
                        marginr="23px"
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="first_name" />
                      </Box>
                    </Grid>
                    <Grid item mobile={4} xSmall={4}>
                      <Field
                        as={SimpleInput}
                        className={classes.textField}
                        label="Last Name"
                        name="last_name"
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="last_name" />
                      </Box>
                    </Grid>
                    <Grid item mobile={4} xSmall={4}>
                      <Field
                        as={SimpleInput}
                        className={classes.textField}
                        label="Email id"
                        name="email"
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="email" />
                      </Box>
                    </Grid>
                    <Grid item mobile={4} xSmall={4}>
                      <Field
                        as={SimpleInput}
                        type="number"
                        showPassword1={true}
                        className={classes.textField}
                        label="Mobile number"
                        name="phone"
                        InputProps={{ min: 0 }}
                        onKeyDown={(event) => {
                          if (InvalidNumberKeys.includes(event.code)) {
                            event.preventDefault();
                          }
                        }}
                      />

                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="phone" />
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
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
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
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
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
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
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
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
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
                        InputProps={{ min: 0 }}
                        onKeyDown={(event) => {
                          if (InvalidNumberKeys.includes(event.code)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="postcode" />
                      </Box>
                    </Grid>
                  </Grid>
                  <StyledButton3 text={id ? "Update" : "Save"} width="230px" />
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddAddress;
