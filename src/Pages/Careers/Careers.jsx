import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Heading from "../../Components/Common/Heading";
import faqLine from "../../Assests/images/faqLine.webp";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SimpleInput } from "../../Components/Common/SimpleInput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import calendar from "../../Assests/images/calendar.webp";
import * as moment from "moment";
import upload from "../../Assests/images/upload.webp";
import { ApiPost } from "../../Api/Api";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import FormikErrorFocus from "formik-error-focus";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";
import { InvalidNumberKeys, InvalidNumberKeysAlphabet } from "../../lib/Regax";

const useStyles = makeStyles()((theme) => {
  return {
    cont: {
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
    },
    career: {
      marginTop: "97px",
      [theme.breakpoints.down("mobile")]: {
        marginTop: "60px",
      },
    },
    jwlhead: {
      marginTop: "77px",
      position: "relative",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "32px",
      lineHeight: "57px",
      letterSpacing: "0.01em",
      color: "#35364F",
      marginBottom: "18px",
      [theme.breakpoints.down("tab")]: {
        marginTop: "55px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "30px",
        lineHeight: "55px",
        marginTop: "30px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "26px",
        lineHeight: "45px",
      },
    },
    jwlimg: {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "93px",
      [theme.breakpoints.down("mobile")]: {
        width: "72px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "65px",
      },
    },
    carP: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "19px",
      lineHeight: "31px",
      letterSpacing: "0.01em",
      color: "#858A8C",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "17px",
        lineHeight: "26px",
      },
    },
    personal: {
      marginTop: "40px",
      [theme.breakpoints.down("mobile")]: {
        marginTop: "16px",
      },
    },
    persoH2: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "32px",
      lineHeight: "39px",
      letterSpacing: "0.01em",
      color: "#35364F",
      marginBottom: "27px",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "30px",
        marginBottom: "18px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "26px",
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
        borderColor: "rgba(0, 0, 0, 0.23) !important",
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
      [`& .Mui-error`]: {
        color: "#7E7F84",
        height: "59px",
      },
      [`& .Mui-focused`]: {
        color: "#BD3D3D",
      },
      [`& .Mui-focused .MuiOutlinedInput-notchedOutline`]: {
        borderColor: "#BD3D3D !important",
      },
    },
    err: {
      color: "#EB222C",
      fontSize: "15px",
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
      marginBottom: "11px",
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
    buutP: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "17px",
      lineHeight: "20px",
      color: "#61616A",
    },
    buttonDiv: {
      marginTop: "40px",
      marginBottom: "90px",
      paddingTop: "36px",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "9px",
        backgroundColor: "#F4F4F4",
        top: 0,
        left: 0,
      },
      [theme.breakpoints.down("iph")]: {
        marginTop: "30px",
        marginBottom: "55px",
      },
    },
    saveButton: {
      padding: "11px 15px 11px 15px",
      width: "168px",
      backgroundColor: "#141524",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "0",
      height: "58px",
      position: "relative",
      zIndex: "2",
      overflow: "hidden",
      "&:hover": {
        backgroundColor: "#BD3D3D !important",
      },
      "&::before": {
        content: '""',
        opacity: 0,
        position: "absolute",
        transition: "all 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        width: "0%",
        height: "100%",
        background: "#BD3D3D",
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
      "&:hover .css-1nd3ojk-MuiTypography-root-buttonText": {
        color: "#fff",
      },
      "&:hover .css-1sg9l6o-banbutspan": {
        backgroundColor: "#fff",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "100%",
        minWidth: "150px",
      },
    },
    buttonText: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "18px",
      lineHeight: "18px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#FFF",
      transition: "all 0.9s",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "14px",
      },
    },
  };
});

function Careers({ seo, key }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [mission, setMission] = useState("");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(isLoader(true));
    ApiPost("career").then((res) => {
      if (res?.data?.career) {
        setMission(res?.data?.career);
      }
      dispatch(isLoader(false));
    });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const desig = [
    {
      name: "Mr.",
    },
    {
      name: "Mrs.",
    },
    {
      name: "Miss.",
    },
    {
      name: "Dr.",
    },
  ];
  const gender = [
    {
      name: "Male",
    },
    {
      name: "Female",
    },
    {
      name: "Transgender",
    },
  ];
  const countries = [
    {
      name: "India",
    },
  ];
  const initialValues = {
    designation: "",
    name: "",
    dob: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    exp: "",
    Psalary: "",
    Esalary: "",
    EDetails: "",
    project: "",
    examination: "",
    YOP: "",
    marks: "",
    board: "",
    document: "",
  };
  const validationSchema = Yup.object().shape({
    designation: Yup.string()
      .trim()
      .required("Please select your designation!"),
    name: Yup.string().trim().required("Please enter your full name!"),
    email: Yup.string()
      .trim()
      .email("Please enter a valid email!")
      .required("Please enter email!"),
    phone: Yup.string()
      .trim()
      .required("Please enter your Phone/Mobile number!")
      .matches(/^([0-9\s\-+()]*)$/, "Invalid mobile number!")
      .min(10, "Phone/Mobile number must be at least 10 characters!")
      .max(10, "Phone/Mobile contains maximum 10 characters!"),
    gender: Yup.string()
      .trim()
      .required("Please select your gender!")
      .nullable(),
    dob: Yup.string()
      .required("Please enter your date of birth!")
      .test("dob", "Your age must be at least 18 years old", (value) => {
        return moment().diff(moment(value), "years") >= 18;
      })
      .nullable(),
    country: Yup.string().required("Please select your country!").nullable(),
    exp: Yup.string()
      .required("Please enter your year of experience!")
      .nullable(),
    Psalary: Yup.string()
      .required("Please enter your present salary (Per Month)!")
      .nullable(),
    Esalary: Yup.string()
      .required("Please enter your Expected salary (Per Month)!")
      .nullable(),
    EDetails: Yup.string()
      .required("Please enter your Experience Details!")
      .nullable(),
    project: Yup.string()
      .required("Please enter your Details of Projects Worked!")
      .nullable(),
    examination: Yup.string()
      .required("Please enter your name of examination!")
      .nullable(),
    YOP: Yup.string().required("Please enter your year of passing!").nullable(),
    marks: Yup.string().required("Please enter your marks!").nullable(),
    board: Yup.string()
      .required("Please enter your board/university!")
      .nullable(),
    document: Yup.mixed().required("Please upload your CV!"),
  });
  const onSubmit = async (values, actions) => {
    var formData = new FormData();
    formData.append("designation", values.designation);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone.toString());
    formData.append("gender", values.gender);
    formData.append("dob", values.dob);
    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("yoe", values.exp);
    formData.append("salary", values.Psalary);
    formData.append("ex_salary", values.Esalary);
    formData.append("exp_details", values.EDetails);
    formData.append("d_project", values.project);
    formData.append("name_of_ex", values.examination);
    formData.append("yop", values.YOP);
    formData.append("marks", values.marks);
    formData.append("boards", values.board);
    formData.append("file", values.document);
    formData.append("type", "submit");
    dispatch(isLoader(true));
    ApiPost("career", formData).then((res) => {
      dispatch(isLoader(false));
      if (res.data.result) {
        swal({
          title: "Success",
          text: res.data.result,
          icon: "success",
        });
      } else if (res.data.error) {
        swal({
          title: "Error",
          text: res.data.error,
          icon: "error",
        });
      }
      actions.resetForm();
    });
  };
  return (
    <Box key={key}>
      <SEOPart data={SeoData?.career} seo={seo} />
      <Box component="div" className={classes.career}>
        <Container className={classes.cont}>
          <Heading
            title="Career"
            bgText="C"
            fontFamily="League Spartan"
            subTitle="Through original imagery and editorial perspectives, we bring you unique point newviews."
            size="44px"
            bott="60px"
            lapbott="88px"
            tabsize="40px"
            iphsize="29px"
            h="120px"
            fsizePxdesk="1.1rem"
            tabh="98px"
            mobilebott="101px"
            iphbott="97px"
          />
          <Box component="div" className={classes.carCont}>
            <Box component="div" className={classes.jwlhead}>
              {mission?.title}
              <Box
                component="img"
                src={faqLine}
                alt="line"
                className={classes.jwlimg}
              />
            </Box>
            <Typography variant="p" className={classes.carP}>
              {mission?.description}
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue, setFieldTouched }) => (
              <Form>
                <Box component="div" className={classes.personal}>
                  <Box component="h2" className={classes.persoH2}>
                    Personal and Contact Information
                  </Box>
                  <Grid container spacing={3.125}>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={Autocomplete}
                        options={desig?.map((e) => e?.name)}
                        className={classes.textField}
                        name="designation"
                        value={values.designation}
                        onChange={(e, newValue) => {
                          setFieldValue("designation", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Designation" />
                        )}
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="designation" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={SimpleInput}
                        className={classes.textField}
                        label="Full Name"
                        name="name"
                        //   marginr="23px"
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="name" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={SimpleInput}
                        className={classes.textField}
                        label="Email"
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
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={SimpleInput}
                        type="number"
                        showPassword1={true}
                        className={classes.textField}
                        label="Phone/Mobile"
                        name="phone"
                        InputProps={{ min: 0 }}
                        onKeyDown={(event) => {
                          if (!InvalidNumberKeysAlphabet.includes(event.key)) {
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
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={Autocomplete}
                        options={gender?.map((e) => e?.name)}
                        className={classes.textField}
                        name="gender"
                        value={values.gender}
                        onChange={(e, newValue) => {
                          setFieldValue("gender", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Gender" />
                        )}
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="gender" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <FormControl
                        fullWidth
                        className={classes.textField}
                        style={{ position: "relative" }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileDatePicker
                            label="DOB"
                            inputFormat="DD/MM/YYYY"
                            value={values.dob}
                            name="dob"
                            maxDate={new Date()}
                            onChange={(value) => {
                              setFieldTouched("dob");
                              setFieldValue("dob", value.$d);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                          <Box
                            width={40}
                            position="absolute"
                            right="0px"
                            top="20px"
                          >
                            <img
                              src={calendar}
                              alt="calender"
                              style={{ cursor: "pointer" }}
                            />
                          </Box>
                        </LocalizationProvider>
                      </FormControl>
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="dob" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
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
                  </Grid>
                </Box>
                <Box component="div" className={classes.personal}>
                  <Box component="h2" className={classes.persoH2}>
                    Work Experience Details
                  </Box>
                  <Grid container spacing={3.125}>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={SimpleInput}
                        type="number"
                        showPassword1={true}
                        className={classes.textField}
                        label="Year of Experience"
                        name="exp"
                        InputProps={{ min: 0 }}
                        onKeyDown={(event) => {
                          if (InvalidNumberKeys.includes(event.code)) {
                            event.preventDefault();
                          }
                        }}
                        //   marginr="23px"
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="exp" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={SimpleInput}
                        type="number"
                        showPassword1={true}
                        className={classes.textField}
                        label="Present Salary (Per Month)"
                        name="Psalary"
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
                        <ErrorMessage name="Psalary" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={SimpleInput}
                        type="number"
                        showPassword1={true}
                        className={classes.textField}
                        label="Expected Salary (Per Month)"
                        name="Esalary"
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
                        <ErrorMessage name="Esalary" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={12}
                      mobile={6}
                      tab={6}
                      laptop={6}
                      desktop={6}
                    >
                      <Field
                        as={TextField}
                        multiline
                        rows={3}
                        fullWidth
                        className={classes.textField}
                        label="Experience Details"
                        name="EDetails"
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="EDetails" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={12}
                      mobile={6}
                      tab={6}
                      laptop={6}
                      desktop={6}
                    >
                      <Field
                        as={TextField}
                        multiline
                        rows={3}
                        fullWidth
                        className={classes.textField}
                        label="Details of Projects Worked"
                        name="project"
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="project" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={12}
                      mobile={4}
                      tab={3.5}
                      laptop={3.5}
                      desktop={3.5}
                    >
                      <Box component="div">
                        <Button
                          variant="contained"
                          component="label"
                          size="large"
                          name="document"
                          className={classes.uploadButton}
                          onChange={(e) => {
                            setFieldValue("document", e.target.files[0]);
                          }}
                          endIcon={
                            <Box
                              component="img"
                              src={upload}
                              alt
                              className={classes.endIco}
                            />
                          }
                        >
                          Upload Your CV
                          <input hidden accept=".pdf,.doc,.docx" type="file" />
                        </Button>
                        <Typography variant="p" className={classes.buutP}>
                          {values.document
                            ? values.document.name
                            : "Allowed file types : pdf, doc, docx"}
                        </Typography>
                      </Box>
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="document" />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box component="div" className={classes.personal}>
                  <Box component="h2" className={classes.persoH2}>
                    Academics Details
                  </Box>
                  <Grid container spacing={3.125}>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={SimpleInput}
                        className={classes.textField}
                        label="Name Of Examination"
                        name="examination"
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="examination" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={SimpleInput}
                        type="number"
                        showPassword1={true}
                        className={classes.textField}
                        label="Year Of Passing"
                        name="YOP"
                        InputProps={{
                          min: 0,
                          max: moment(Date.now()).format("YYYY"),
                        }}
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
                        <ErrorMessage name="YOP" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={SimpleInput}
                        type="number"
                        showPassword1={true}
                        className={classes.textField}
                        label="Marks"
                        name="marks"
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
                        <ErrorMessage name="marks" />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={4}
                      tab={4}
                      laptop={4}
                      desktop={4}
                    >
                      <Field
                        as={SimpleInput}
                        className={classes.textField}
                        label="Board/University"
                        name="board"
                      />
                      <Box
                        component="span"
                        className={classes.err}
                        disableGutters
                      >
                        <ErrorMessage name="board" />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box component="div" className={classes.buttonDiv}>
                  <Button
                    className={classes.saveButton}
                    variant="contained"
                    type="submit"
                    disableRipple
                  >
                    <Typography className={classes.buttonText}>
                      SUBMIT
                    </Typography>
                  </Button>
                </Box>
                <FormikErrorFocus
                  offset={0}
                  align={"middle"}
                  focusDelay={200}
                  ease={"linear"}
                  duration={1000}
                />
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Box>
  );
}

export default Careers;
