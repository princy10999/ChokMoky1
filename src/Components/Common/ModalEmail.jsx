import { Box, Typography, Modal, Grid } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { makeStyles } from "tss-react/mui";
import { SimpleInput } from "./SimpleInput";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { ApiPost } from "../../Api/Api";
// import swal from "sweetalert";
import { emailChangeStatus, userDetails } from "../../Redux/Actions/AuthUser";
import StyledButton2 from "./StyledButton2";
import swal from "sweetalert";
import { useEffect } from "react";
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
  };
});
const ModalCommon = ({ initialValues, open, handleClose }) => {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email!")
      .required("Please enter email id!"),
  });
  const onSubmit = (e, values) => {
    dispatch(isLoader(true));
    const body = {
      params: { email: values.email, change_email_status: e },
    };
    const body2 = {
      params: {
        user_email: values.email,
        first_name: initialValues?.first_name,
        change_email_status: e,
      },
    };
    ApiPost(
      initialValues?.email ? "change-email" : "add-email",
      initialValues?.email ? body : body2
    ).then((res) => {
      dispatch(isLoader(false));
      if (res?.data?.error) {
        swal({
          title: "warning",
          text: res?.data?.error?.meaning,
          icon: "warning",
        });
      } else if (res?.data?.result) {
        swal({
          title: "Success",
          text: res?.data?.result?.status?.meaning,
          icon: "success",
        });
        handleClose();
        dispatch(emailChangeStatus());
        dispatch(userDetails());
        if (initialValues?.email) {
          localStorage.setItem(
            "userData",
            JSON.stringify(res?.data?.result?.userData)
          );
        }
      }
    });
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
          <Formik
            enableReinitialize={true}
            initialValues={{ email: "" }}
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
                      Change Email
                    </Typography>
                    <Field
                      as={SimpleInput}
                      className={classes.textField}
                      label="Email Id"
                      name="email"
                      marginr="23px"
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
                </Grid>
                <Box style={{ marginTop: "5%", width: "250px" }}>
                  <StyledButton2 text="Save & Continue" width="230px" />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <CloseIcon className={classes.close} onClick={() => handleClose()} />
      </Box>
    </Modal>
  );
};
export default ModalCommon;
