import { Container, Box, Grid, TextField, Button } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import Heading from "../../Components/Common/Heading";
import stamp from "../../Assests/images/stamp1.webp";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "antd";
import fotph from "../../Assests/images/foot-phone.webp";
import fotmail from "../../Assests/images/foot-mail.webp";
import { ApiPost } from "../../Api/Api";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
// import swal from "sweetalert";
import OtpInput from "react-otp-input";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";
import swal from "sweetalert";

const useStyles = makeStyles()((theme) => {
  return {
    contact: {
      margin: "100px 0",
      [theme.breakpoints.down("laptop")]: {
        margin: "75px 0",
      },
      [theme.breakpoints.down("iph")]: {
        margin: "50px 0",
      },
    },
    cont: {
      height: "100%",
      maxWidth: "1200px",
      [theme.breakpoints.down("laptop")]: {
        maxWidth: "900px",
      },
      [theme.breakpoints.down("tab")]: {
        maxWidth: "700px",
      },
      [theme.breakpoints.down("mobile")]: {
        maxWidth: "575px",
      },
    },
    contactdiv: {
      paddingLeft: "100px",
      paddingRight: "100px",
      [theme.breakpoints.down("desktop")]: {
        paddingLeft: "35px",
        paddingRight: "35px",
      },
      [theme.breakpoints.down("sDesktop")]: {
        paddingLeft: "0px",
        paddingRight: "0px",
      },
    },
    form: {
      marginTop: "40px",
      width: "100%",
      height: "auto",
      maxWidth: "100%",
      maxHeight: "100%",
      background: "#FEE473",
      borderTop: "10px solid #FEE473",
      borderLeft: "5px solid #FEE473",
      borderRight: "5px solid #FEE473",
      boxShadow: "0px 0px 23px rgba(0, 0, 0, 0.08)",
      padding: "25px 25px 43px 25px",
      [theme.breakpoints.down("laptop")]: {
        padding: "25px 25px 25px 25px",
      },
      [theme.breakpoints.down("iph")]: {
        background: " white",
        borderTop: "10px solid white",
        borderLeft: "5px solid white",
        borderRight: "5px solid white",
      },
    },
    err: {
      color: "#EB222C",
      fontSize: "15px",
    },
    stamp: {
      position: "absolute",
      top: "30px",
      right: "30px",
      width: "105px",
      height: "90px",
      maxHeight: "100%",
      maxWidth: "100%",
      [theme.breakpoints.down("laptop")]: {
        width: "96px",
        height: "82px",
      },
      [theme.breakpoints.down("tab")]: {
        width: "74px",
        height: "60px",
        top: "20px",
        right: "20px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "58px",
        height: "47px",
        top: "15px",
        right: "15px",
      },
    },
    msg: {
      paddingRight: "60px",
      marginTop: "20px",
      textAlign: "left",
      [theme.breakpoints.down("laptop")]: {
        paddingRight: "0px",
        marginTop: "24px",
      },
      [theme.breakpoints.down("tab")]: {
        marginTop: "20px",
      },
      [theme.breakpoints.down("iph")]: {
        marginTop: "20px",
      },
      [`& fieldset`]: {
        border: "2px solid #CF6C2C",
      },
      [`& label`]: {
        fontFamily: "League Spartan",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "19px",
        lineHeight: "17px",
        letterSpacing: "0.03em",
        color: "#CF6C2C",
        [theme.breakpoints.down("tab")]: {
          fontSize: "17px",
        },
        [theme.breakpoints.down("iph")]: {
          fontSize: "16px",
        },
      },
      [`& textarea`]: {
        [theme.breakpoints.down("laptop")]: {
          height: "135px !important",
        },
        [theme.breakpoints.down("laptop")]: {
          height: "100px !important",
        },
        [theme.breakpoints.down("small")]: {
          height: "70px !important",
        },
        "&::placeholder": {
          fontFamily: "League Spartan",
          textAlign: "center !important",
          fontStyle: "normal",
          fontWeight: 500,
          opacity: 1,
          fontSize: "19px",
          marginTop: "20%",
          lineHeight: "360px",
          letterSpacing: "0.03em",
          color: "#CF6C2C",
          [theme.breakpoints.down("laptop")]: {
            marginTop: "60%",
            lineHeight: "100px",
          },
          [theme.breakpoints.down("mobile")]: {
            fontSize: "17px",
          },
          [theme.breakpoints.down("iph")]: {
            fontSize: "16px",
          },
          [theme.breakpoints.down("small")]: {
            marginTop: "60%",
            lineHeight: "70px",
          },
        },
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "0px !important",
      },
    },
    name: {
      marginTop: "70px",
      [theme.breakpoints.down("laptop")]: {
        marginTop: "60px",
      },
      [theme.breakpoints.down("tab")]: {
        marginTop: "25px",
      },
      [theme.breakpoints.down("iph")]: {
        marginTop: "0px",
      },
      [`& label`]: {
        fontFamily: "League Spartan",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "19px",
        lineHeight: "17px",
        letterSpacing: "0.03em",
        color: "#CF6C2C",
        [theme.breakpoints.down("tab")]: {
          fontSize: "17px",
        },
        [theme.breakpoints.down("iph")]: {
          fontSize: "16px",
        },
      },
      [`& .MuiInput-root`]: {
        "&::before": {
          borderColor: "#CF6C2C",
          borderBottomWidth: "2px",
        },
      },
    },
    field: {
      marginTop: "10px",
      [theme.breakpoints.down("laptop")]: {
        marginTop: "8px",
      },
      [theme.breakpoints.down("tab")]: {
        marginTop: "0px",
      },
      [`& label`]: {
        fontFamily: "League Spartan",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "19px",
        lineHeight: "17px",
        letterSpacing: "0.03em",
        color: "#CF6C2C",
        [theme.breakpoints.down("tab")]: {
          fontSize: "17px",
        },
        [theme.breakpoints.down("iph")]: {
          fontSize: "16px",
        },
      },
      [`& .MuiInput-root`]: {
        "&::before": {
          borderColor: "#CF6C2C",
          borderBottomWidth: "2px",
        },
      },
    },
    field1: {
      marginTop: "10px",
      gap: "8px",
      ".inputStyle": {
        border: "2px solid #CF6C2C",
        minWidth: "38px",
        height: "38px",
        backgroundColor: "transparent",
        [theme.breakpoints.down("mobile")]: {
          minWidth: "30px",
          height: "30px",
        },
        [theme.breakpoints.down("iph")]: {
          minWidth: "25px",
          height: "30px",
        },
        [theme.breakpoints.down("small")]: {
          minWidth: "21px",
          height: "25px",
        },
      },
      ".otpspace": { width: "0px" },
      [theme.breakpoints.down("mLaptop")]: {
        gap: "5px",
      },
      [theme.breakpoints.down("laptop")]: {
        gap: "4px",
      },
      [`& label`]: {
        fontFamily: "League Spartan",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "19px",
        lineHeight: "17px",
        letterSpacing: "0.03em",
        color: "#CF6C2C",
        [theme.breakpoints.down("tab")]: {
          fontSize: "17px",
        },
        [theme.breakpoints.down("iph")]: {
          fontSize: "16px",
        },
        [`& input`]: {
          [theme.breakpoints.down("tab")]: {
            padding: "4px",
          },
        },
      },
      [`& fieldset`]: {
        border: "2px solid #CF6C2C",
      },
      [`& .MuiInput-root`]: {
        "&::before": {
          borderColor: "#CF6C2C",
        },
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "0px !important",
        width: "40px",
        height: "43px",
        [theme.breakpoints.down("mLaptop")]: {
          width: "33px",
          height: "38px",
        },
        [theme.breakpoints.down("laptop")]: {
          width: "40px",
          height: "40px",
        },
        [theme.breakpoints.down("stab")]: {
          width: "33px",
          height: "38px",
        },
        [theme.breakpoints.down("tab")]: {
          width: "32px",
          height: "32px",
        },
        [theme.breakpoints.down("mobile")]: {
          width: "26px",
          height: "28px",
        },
        [theme.breakpoints.down("iph")]: {
          width: "21px",
          height: "27px",
        },
        [theme.breakpoints.down("small")]: {
          width: "18px",
          height: "25px",
        },
      },
      "& .MuiOutlinedInput-input": {
        padding: "10px",
        [theme.breakpoints.down("tab")]: {
          padding: "10px 6px",
        },
        [theme.breakpoints.down("iph")]: {
          padding: "2px",
        },
      },
    },
    loop: {
      // padding: "10px",
      marginTop: " -15px",
      width: "100%",
      display: "none",
      [theme.breakpoints.down("mLaptop")]: {
        display: "none",
      },
      [theme.breakpoints.down("laptop")]: {
        display: "none",
      },
      [theme.breakpoints.down("stab")]: {
        display: "none",
      },
      [theme.breakpoints.down("iph")]: {
        display: "block",
      },
    },
    phone: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: "25px",
      flexDirection: "column",
      [theme.breakpoints.down("laptop")]: {
        marginTop: "18px",
      },
      [theme.breakpoints.down("tab")]: {
        marginTop: "12px",
      },
      [theme.breakpoints.down("iph")]: {
        marginTop: "15px",
      },
    },
    label: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "19px",
      lineHeight: "17px",
      letterSpacing: "0.03em",
      color: "#CF6C2C",
      whiteSpace: "nowrap",
      // marginBottom: "10px",
      [theme.breakpoints.down("tab")]: {
        fontSize: "17px",
        marginBottom: "-2px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "17px",
        marginBottom: "-2px",
      },
    },
    butto: {
      display: "flex",
      marginLeft: "auto",
      marginTop: "22px",
      [theme.breakpoints.down("laptop")]: {
        width: "100%",
        marginTop: "10px",
      },
    },
    enlop: {
      position: "relative",
      margin: "auto",
      width: "100%",
    },
    rightgrid: {
      position: "relative",
      "&:before": {
        content: '""',
        position: "absolute",
        width: "1.5px",
        height: "470px",
        top: "0px",
        bottom: "7px",
        left: "-30px",
        backgroundColor: "#CF6C2C",
        [theme.breakpoints.down("laptop")]: {
          display: "none",
        },
      },
    },
    gridContainer: {
      [theme.breakpoints.down("laptop")]: {
        flexDirection: "column",
      },
      [theme.breakpoints.down("small")]: {
        flexDirection: "column-reverse",
      },
    },
    headP: {
      fontFamily: "Nunito, sans-serif",
      fontSize: "1.2rem",
      textAlign: "center",
      color: "#70717C",
      fontWeight: "400",
      marginTop: "30px",
      lineHeight: "25px",
      [theme.breakpoints.down("tab")]: {
        fontSize: "1.1rem",
        lineHeight: "22px",
      },
      [theme.breakpoints.down("stab")]: {
        fontSize: "1rem",
      },
      [theme.breakpoints.down("iph")]: {
        marginTop: "0",
        fontSize: "15px",
        lineHeight: "18px",
      },
    },
    footLastul: {
      marginTop: "15px",
    },
    footLastli: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: "19px",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      marginBottom: "8px !important",
      lineHeight: "25px",
      letterSpacing: "0.00em",
      color: "#5C5C63",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "16px",
        lineHeight: "22px",
      },
      [theme.breakpoints.down("iph")]: {
        marginBottom: "8px",
      },
    },
    footLastimg: {
      display: "block",
      width: "20px",
      height: "20px",
      marginRight: "14px",
      [theme.breakpoints.down("desktop")]: {
        width: "16px",
        height: "16px",
      },
    },
    footLastlink: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "25px",
      letterSpacing: "0.00em",
      color: "#5C5C63 !important",
      "&:hover": {
        color: "#BD3D3D !important",
      },
      [theme.breakpoints.down("desktop")]: {
        fontSize: "16px",
        lineHeight: "22px",
      },
    },
    bannButto: {
      padding: "18px 20px 15px 17px",
      backgroundColor: "#BD3D3D",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "0",
      height: "58px",
      color: "#FFFF",
      position: "relative",
      zIndex: "2",
      overflow: "hidden",
      "&:hover": {
        backgroundColor: "#1A1B2F !important",
      },
      "&::before": {
        content: '""',
        opacity: 0,
        position: "absolute",
        transition: "all 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        width: "0%",
        height: "100%",
        background: "#141524",
        zIndex: "-1",
        top: "-50px",
        "-webkit-transform": "rotate(35deg)",
        transform: "rotate(35deg)",
      },
      "&::after": {
        background: "#fff",
        content: '""',
        opacity: 0,
        position: "absolute",
        top: "-50px",
        "-webkit-transform": "rotate(35deg)",
        transform: "rotate(35deg)",
        transition: "all 3s cubic-bezier(0.19, 1, 0.22, 1)",
        height: "20rem",
        width: "8rem",
        left: "-100%",
      },
      "&:hover::before": {
        left: "120%",
        opacity: "0.5",
      },
      "&:hover::after": {
        left: "200%",
        opacity: "0.6",
      },
      "&:hover .css-kzg10w-buttStrong": {
        color: "#FFFF",
      },
      "&:hover .css-1avwszq-banbutspan": {
        backgroundColor: "#141524!important",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "auto",
        minWidth: "150px",
        height: "40px",
      },
    },
    buttStrong: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "18px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#FFFF",
      transition: "all 0.9s",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "14px",
      },
    },
    banbutspan: {
      display: "block !important",
      marginRight: "10px !important",
      width: "30px !important",
      height: "2px !important",
      transition: "all 0.9s",
      backgroundColor: "#fff !important",
      position: "relative !important",
      zIndex: 4,
      "&::before": {
        display: "none !important",
      },
    },
  };
});

function ContactUs({ seo, key }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  const matchIsString = (text) => {
    // const isString = !typeof text === 'number'
  };

  function matchIsNumeric(text) {
    const isNumber = typeof text === "number";
    const isString = matchIsString(text);
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    subject: Yup.string().required("Please enter subject!"),
    message: Yup.string().required("Please enter message!"),
    email: Yup.string()
      .email("Please enter a valid email!")
      .required("Please enter your email!"),
    phone: Yup.string()
      .required("Please enter your mobile number!")
      .matches(/^([0-9\s\-+()]*)$/, "Invalid mobile number!")
      .min(10, "Mobile number must be at least 10 characters!")
      .max(10, "Mobile number contains maximum 10 characters!"),
  });

  const validateChar = (value, index) => {
    if (!/[0-9]/.test(value)) {
      return matchIsNumeric(+value);
    } else {
      return matchIsNumeric(+value);
    }
  };
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  };
  const onSubmit = (values, actions) => {
    let data = {
      params: {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
        phone: values.phone.toString(),
      },
    };
    dispatch(isLoader(true));
    ApiPost("contact-us", data).then((res) => {
      dispatch(isLoader(false));
      if (res.data.success) {
        swal({
          title: "Success",
          text: res.data.success.meaning,
          icon: "success",
        });
      } else if (res.data.error) {
        swal({
          title: "Error",
          text: res.data.error.meaning,
          icon: "error",
        });
      }
      actions.resetForm();
    });
  };
  return (
    <Box key={key}>
      <SEOPart data={SeoData?.contact} seo={seo} />
      <Box component="div" className={classes.contact}>
        <Container className={classes.cont}>
          <Heading
            title="Contact Us"
            bgText="C"
            fontFamily="Playfair Display, serif"
            subTitle=""
            size="52px"
            tabsize="36px"
            iphsize="28px"
            h="120px"
            tabh="105px"
            iphh="84px"
            lapbott="35px"
            iphbott="28px"
            smallsize="24px"
          />
          <Box component="div" className={classes.contactdiv}>
            <Typography className={classes.headP} data-aos="fade-up">
              <Box
                sx={(theme) => ({
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "20px",
                  [theme.breakpoints.down("tab")]: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  },
                })}
              >
                <Box
                  component="ul"
                  className={classes.footLastul}
                  sx={(theme) => ({
                    maxWidth: "42%",
                    textAlign: "start",
                    [theme.breakpoints.down("tab")]: {
                      maxWidth: "96%",
                    },
                  })}
                >
                  <Box component="li" className={classes.footLastli}>
                    Plot No 24, Shop No 10, Neelratan Society, Sector 19, Vashi,
                    Navi Mumbai
                  </Box>
                  <Box component="li" className={classes.footLastli}>
                    <Box
                      component="img"
                      src={fotph}
                      alt="phone"
                      className={classes.footLastimg}
                    />
                    <Box
                      component="a"
                      href="tel:+91 9876543210"
                      className={classes.footLastlink}
                    >
                      +91 9876543210 /&nbsp;
                      <Box
                        component="a"
                        href="tel:(033) 2999-533"
                        className={classes.footLastlink}
                      >
                        (033) 2999-533
                      </Box>
                    </Box>
                  </Box>
                  <Box component="li" className={classes.footLastli}>
                    <Box
                      component="img"
                      src={fotmail}
                      alt="mail"
                      className={classes.footLastimg}
                    />
                    <Box
                      component="a"
                      href="mailto:support@gmail.com"
                      className={classes.footLastlink}
                    >
                      support@gmail.com
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={(theme) => ({
                    width: "50%",
                    [theme.breakpoints.down("tab")]: {
                      width: "100%",
                    },
                  })}
                >
                  <iframe
                    title="Company Address"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30164.23552295642!2d72.98628586362689!3d19.08441592330248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c0d0f1cbe293%3A0x626513299205c51e!2swylamdecorating!5e0!3m2!1sen!2sin!4v1678886498155!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>
              </Box>
            </Typography>
            <Box component="div" className={classes.enlop}>
              <Box component="div" className={classes.form}>
                <Box
                  component="img"
                  src={stamp}
                  alt="stamp"
                  className={classes.stamp}
                />
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ values, setFieldValue }) => (
                    <Form className={classes.loginForm}>
                      <Grid container className={classes.gridContainer}>
                        <Grid
                          item
                          xsmall={12}
                          small={12}
                          laptop={6}
                          smallLaptop={6}
                          desktop={6}
                          order={{
                            xsmall: 2,
                            small: 2,
                            laptop: 1,
                            smallLaptop: 1,
                            desktop: 1,
                          }}
                        >
                          <Field
                            as={TextField}
                            multiline
                            rows={17}
                            name="message"
                            id="outlined-basic"
                            placeholder="Type your message here"
                            onFocus={(e) => (e.target.placeholder = "")}
                            onBlur={(e) =>
                              (e.target.placeholder = "Type your message here")
                            }
                            variant="outlined"
                            fullWidth
                            className={classes.msg}
                            helperText={
                              <Box
                                component="span"
                                className={classes.err}
                                disableGutters
                              >
                                <ErrorMessage name="message" />
                              </Box>
                            }
                          />
                        </Grid>
                        <Grid
                          item
                          xsmall={12}
                          small={12}
                          laptop={6}
                          smallLaptop={6}
                          desktop={6}
                          className={classes.rightgrid}
                          order={{
                            xsmall: 1,
                            small: 1,
                            laptop: 2,
                            smallLaptop: 2,
                            desktop: 2,
                          }}
                        >
                          <Grid
                            container
                            rowSpacing={1}
                            sx={(theme) => ({
                              [theme.breakpoints.down("small")]: {
                                display: "block",
                              },
                            })}
                          >
                            <Grid
                              item
                              xsmall={12}
                              small={12}
                              mobile={12}
                              tab={12}
                              laptop={12}
                              desktop={12}
                            >
                              <Field
                                as={TextField}
                                name="name"
                                label="Name"
                                id="name"
                                variant="standard"
                                fullWidth
                                className={classes.name}
                                helperText={
                                  <Box
                                    component="span"
                                    className={classes.err}
                                    disableGutters
                                  >
                                    <ErrorMessage name="name" />
                                  </Box>
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xsmall={12}
                              small={12}
                              mobile={12}
                              tab={12}
                              laptop={12}
                              desktop={12}
                            >
                              <Field
                                as={TextField}
                                name="email"
                                label="Email Address"
                                id="email"
                                variant="standard"
                                fullWidth
                                className={classes.field}
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
                            </Grid>
                            <Grid
                              item
                              xsmall={12}
                              small={12}
                              mobile={12}
                              tab={12}
                              laptop={12}
                              desktop={12}
                            >
                              <Field
                                as={TextField}
                                name="subject"
                                label="Subjects"
                                id="subject"
                                variant="standard"
                                fullWidth
                                className={classes.field}
                                helperText={
                                  <Box
                                    component="span"
                                    className={classes.err}
                                    disableGutters
                                  >
                                    <ErrorMessage name="subject" />
                                  </Box>
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xsmall={12}
                              small={12}
                              mobile={12}
                              tab={12}
                              laptop={12}
                              desktop={12}
                            >
                              <Box className={classes.phone}>
                                <Box className="joke">
                                  <Typography
                                    variant="p"
                                    className={classes.label}
                                  >
                                    Phone
                                  </Typography>
                                  <OtpInput
                                    className={classes.field1}
                                    value={values.phone}
                                    isInputNum={true}
                                    onChange={(e) => {
                                      setFieldValue("phone", e);
                                    }}
                                    numInputs={10}
                                    separator={
                                      <span className="otpspace"></span>
                                    }
                                    inputStyle={"inputStyle"}
                                    focusStyle={"focusStyle"}
                                  />
                                </Box>

                                <Box className={classes.loop}>
                                  <Field
                                    as={TextField}
                                    name="phone"
                                    label="Phone"
                                    id="phone"
                                    className={classes.field}
                                    value={values.phone}
                                    variant="standard"
                                    fullWidth
                                    isInputNum={true}
                                    numInputs={10}
                                    onKeyPress={(event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    }}
                                    helperText={
                                      <Box
                                        component="span"
                                        className={classes.err}
                                        disableGutters
                                      ></Box>
                                    }
                                  />
                                </Box>
                              </Box>
                              <Box
                                component="span"
                                className={classes.err}
                                disableGutters
                              >
                                <ErrorMessage name="phone" />
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xsmall={12}
                              small={12}
                              mobile={12}
                              tab={12}
                              laptop={12}
                              desktop={12}
                              sx={(theme) => ({
                                [theme.breakpoints.down("laptop")]: {
                                  display: "none",
                                },
                              })}
                            >
                              <Box component="div" className={classes.butto}>
                                <Button
                                  type="submit"
                                  className={classes.bannButto}
                                  contained
                                >
                                  <Box
                                    component="span"
                                    className={classes.banbutspan}
                                  ></Box>
                                  <Box
                                    component="strong"
                                    className={classes.buttStrong}
                                  >
                                    Send
                                  </Box>
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Box
                        component="div"
                        className={classes.butto}
                        sx={(theme) => ({
                          [theme.breakpoints.up("laptop")]: {
                            display: "none",
                          },
                        })}
                      >
                        <Button
                          type="submit"
                          className={classes.bannButto}
                          sx={{ margin: "10px auto" }}
                          contained
                        >
                          <Box
                            component="span"
                            className={classes.banbutspan}
                          ></Box>
                          <Box
                            component="strong"
                            className={classes.buttStrong}
                          >
                            Send
                          </Box>
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default ContactUs;
