import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Box,
  Container,
  Typography,
  TextField,
  Autocomplete,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
} from "@mui/material";
import Heading from "../../Components/Common/Heading";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import EastIcon from "@mui/icons-material/East";
import CommonCartTable from "../../Components/Common/CommonCartTable";
import SubTotalBox from "../../Components/Common/SubTotalBox";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SimpleInput } from "../../Components/Common/SimpleInput";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import { ApiPost } from "../../Api/Api";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";
import AddressBookBox from "../../Components/Common/AddressBookBox";
import { InvalidNumberKeys } from "../../lib/Regax";
import { getCount, getCountTemp } from "../../Redux/Actions/AuthUser";

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
    cart: {
      margin: "89px auto 97px",
      [theme.breakpoints.down("desktop")]: {
        margin: "70px auto",
      },
      [theme.breakpoints.down("mobile")]: {
        margin: "48px auto",
      },
    },
    breadcrumb: {
      [`& .MuiBreadcrumbs-separator`]: {
        marginLeft: "30px",
        marginRight: "30px",
        [theme.breakpoints.down("desktop")]: {
          marginLeft: "20px",
          marginRight: "20px",
        },
        [theme.breakpoints.down("laptop")]: {
          marginLeft: "10px",
          marginRight: "10px",
        },
        [theme.breakpoints.down("tab")]: {
          marginLeft: "5px",
          marginRight: "5px",
        },
      },
      [`& ol`]: {
        marginTop: "79px",
        justifyContent: "center",
        marginBottom: "37px",
        [theme.breakpoints.down("desktop")]: {
          marginTop: "60px",
        },
        [theme.breakpoints.down("laptop")]: {
          marginTop: "42px",
        },
        [theme.breakpoints.down("tab")]: {
          margin: "30px 0px",
        },
      },
    },
    bredIco: {
      color: "#BABABA",
      width: "26px",
      height: "auto",
      [theme.breakpoints.down("tab")]: {
        width: "18px",
      },
    },
    breadcont: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      fontFamily: "League Spartan",
      fontStyle: "Regular",
      fontSize: "24px",
      lineHeight: "39px",
      TextAlign: "Left",
      verticalAlign: "Top",
      letterSpacing: "3%",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "22px",
        lineHeight: "28px",
      },
      [theme.breakpoints.down("laptop")]: {
        fontSize: "20px",
        lineHeight: "24px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "17px",
        lineHeight: "30px",
      },
    },
    breadnum: {
      width: "37px",
      height: "37px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "league spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "22px",
      lineHeight: "22px",
      color: "#FFFFFF",
      paddingTop: "4px",
      marginRight: "16px",
      [theme.breakpoints.down("desktop")]: {
        width: "30px",
        height: "30px",
        fontSize: "20px",
        marginRight: "10px",
      },
      [theme.breakpoints.down("laptop")]: {
        width: "23px",
        height: "23px",
        fontSize: "18px",
        marginRight: "6px",
      },
      [theme.breakpoints.down("tab")]: {
        width: "17px",
        height: "17px",
        fontSize: "15px",
        marginRight: "5px",
      },
    },
    cartbott: {
      paddingTop: "14px",
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("laptop")]: {
        justifyContent: "flex-start",
        flexDirection: "column",
      },
    },
    cartbottLeft: {
      marginTop: "20px",
      width: "60%",
      [theme.breakpoints.down("laptop")]: {
        width: "98%",
        marginBottom: "16px",
      },
      [theme.breakpoints.down("tab")]: {
        marginTop: "10px",
      },
    },
    cartbottRight: {
      width: "30%",
      [theme.breakpoints.down("laptop")]: {
        width: "98%",
      },
    },
    billHead: {
      fontFamily: "league spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "32px",
      lineHeight: "39px",
      color: "#35364F",
      marginBottom: "16px",
      [theme.breakpoints.down("tab")]: {
        fontSize: "26px",
        lineHeight: "30px",
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
    err: {
      color: "#EB222C",
      fontSize: "15px",
    },
    loginForm: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("laptop")]: {
        flexDirection: "column",
        justifyContent: "flex-start",
      },
    },
    radio: {
      [`& .MuiTypography-root`]: {
        color: "#3D3D47",
        fontFamily: "League Spartan",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "22px",
        lineHeight: "20.5px",
        paddingTop: "5px",
        [theme.breakpoints.down("tab")]: {
          fontSize: "20px",
        },
      },
    },
  };
});

function CheckOut() {
  const userDetail = JSON.parse(localStorage.getItem("userData"));

  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [isMode, setIsMode] = useState([]);
  const [isPaymentMode, setIsPaymentMode] = useState(false);
  const [payment, setPayment] = useState("O");
  const [getCart, setGetCart] = useState([]);
  const [cartListFromApi, setCartListfromApi] = useState([]);
  const [addressBook, setAddressBook] = useState([]);
  const [shippingCharge, setShippingCharge] = useState("");
  const [addressBookId, setAddressBookId] = useState(null);
  const [addressBookIdShip, setAddressBookIdShip] = useState(null);
  const [total, setTotal] = useState(null);
  const [pinCode, setPincode] = useState("");

  const initialValues = {
    billing_first_name: "",
    billing_last_name: "",
    billing_email: "",
    billing_phone: "",
    billing_address: "",
    billing_city: "",
    billing_state: "",
    billing_country: "",
    billing_postcode: "",
    ship: false,
    billing: "newAddress",
    shipping: "newAddress",
    shipping_first_name: "",
    shipping_last_name: "",
    shipping_email: "",
    shipping_phone: "",
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_country: "",
    shipping_postcode: "",
  };
  const validationSchema = Yup.object().shape({
    billing: Yup.string(),
    billing_first_name: Yup.string().when("billing", {
      is: "newAddress",
      then: Yup.string().trim().required("Please enter your first name!"),
    }),
    billing_last_name: Yup.string().when("billing", {
      is: "newAddress",
      then: Yup.string().trim().required("Please enter your last name!"),
    }),
    billing_email: Yup.string().when("billing", {
      is: "newAddress",
      then: Yup.string()
        .trim()
        .email("Please enter a valid email address!")
        .required("Please enter email address!"),
    }),
    billing_phone: Yup.string().when("billing", {
      is: "newAddress",
      then: Yup.string()
        .trim()
        .required("Please enter your phone number!")
        .matches(/^([0-9\s\-+()]*)$/, "Invalid phone number!")
        .min(10, "Phone number must be at least 10 characters!")
        .max(10, "Phone number contains maximum 10 characters!"),
    }),
    billing_address: Yup.string().when("billing", {
      is: "newAddress",
      then: Yup.string()
        .trim()
        .required("Please enter your house address!")
        .nullable(),
    }),
    billing_city: Yup.string().when("billing", {
      is: "newAddress",
      then: Yup.string()
        .trim()
        .required("Please enter your town/city!")
        .nullable(),
    }),
    billing_state: Yup.string().when("billing", {
      is: "newAddress",
      then: Yup.string().required("Please select your state!").nullable(),
    }),
    billing_country: Yup.string().when("billing", {
      is: "newAddress",
      then: Yup.string().required("Please select your country!").nullable(),
    }),
    billing_postcode: Yup.string().when("billing", {
      is: "newAddress",
      then: Yup.string()
        .trim()
        .required("Please enter your ZIPCode!")
        .matches(/^[1-9][0-9]{5}$/, "Invalid zip code!")
        .nullable(),
    }),
    shipping: Yup.string(),
    shipping_first_name: Yup.string().when("ship", {
      is: true,
      then: Yup.string().when("shipping", {
        is: "newAddress",
        then: Yup.string().trim().required("Please enter your first name!"),
      }),
    }),
    shipping_last_name: Yup.string().when("ship", {
      is: true,
      then: Yup.string().when("shipping", {
        is: "newAddress",
        then: Yup.string().trim().required("Please enter your last name!"),
      }),
    }),
    shipping_email: Yup.string().when("ship", {
      is: true,
      then: Yup.string().when("shipping", {
        is: "newAddress",
        then: Yup.string()
          .trim()
          .email("Please enter a valid email address!")
          .required("Please enter email address!"),
      }),
    }),
    shipping_phone: Yup.string().when("ship", {
      is: true,
      then: Yup.string().when("shipping", {
        is: "newAddress",
        then: Yup.string()
          .trim()
          .required("Please enter your phone number!")
          .matches(/^([0-9\s\-+()]*)$/, "Invalid phone number!")
          .min(10, "Phone number must be at least 10 characters!")
          .max(10, "Phone number contains maximum 10 characters!"),
      }),
    }),
    shipping_address: Yup.string().when("ship", {
      is: true,
      then: Yup.string().when("shipping", {
        is: "newAddress",
        then: Yup.string()
          .trim()
          .required("Please enter your house address!")
          .nullable(),
      }),
    }),
    shipping_city: Yup.string().when("ship", {
      is: true,
      then: Yup.string().when("shipping", {
        is: "newAddress",
        then: Yup.string()
          .trim()
          .required("Please enter your town/city!")
          .nullable(),
      }),
    }),
    shipping_state: Yup.string().when("ship", {
      is: true,
      then: Yup.string().when("shipping", {
        is: "newAddress",
        then: Yup.string().required("Please select your state!").nullable(),
      }),
    }),
    shipping_country: Yup.string().when("ship", {
      is: true,
      then: Yup.string().when("shipping", {
        is: "newAddress",
        then: Yup.string().required("Please select your country!").nullable(),
      }),
    }),
    shipping_postcode: Yup.string().when("ship", {
      is: true,
      then: Yup.string().when("shipping", {
        is: "newAddress",
        then: Yup.string()
          .trim()
          .required("Please enter your ZIPCode!")
          .matches(/^[1-9][0-9]{5}$/, "Invalid zip code!")
          .nullable(),
      }),
    }),
  });
  const noAddress = () => {
    swal({
      title: "Warning",
      text: "You have no saved addresses.",
      icon: "warning",
    }).then(function () {
      // {
      //   /* setFieldValue("billing", 1) */
      // }
    });
  };
  var proDiscount = parseFloat(
    getCart?.total_before_discount - getCart?.total_after_discount
  ).toFixed(2);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    document.title = "Checkout - Chokmoki";
    dispatch(isLoader(true));
    ApiPost("country-list", {}).then((res) => {
      if (res?.data?.result) {
        setCountries([res?.data?.result?.country_list]);
        setStates(res?.data?.result?.state_list);
        dispatch(isLoader(false));
      }
    });
    ApiPost("order-info").then((res) => {
      setGetCart(res?.data?.cart);
      setCartListfromApi(res?.data?.cart?.get_cart_details);
      setAddressBook(res?.data?.address);
      setShippingCharge(
        res?.data?.shiping_chg
          ? JSON.parse(res?.data?.shiping_chg).toFixed(2)
          : 0.0
      );

      dispatch(isLoader(false));
    });
  }, []);
  useEffect(() => {
    setTotal(
      proDiscount === "0.00"
        ? location?.state?.data?.total_price_after_deduction ||
          location?.state?.data?.total_price_after_deduction === 0
          ? (
            location?.state?.data?.total_price_after_deduction +
            parseInt(shippingCharge)
          ).toFixed(2)
          : (
            JSON.parse(getCart?.total_before_discount) +
            parseInt(shippingCharge)
          ).toFixed(2)
        : getCart?.total_after_discount
          ? shippingCharge
            ? (
              JSON.parse(getCart?.total_after_discount) +
              parseInt(shippingCharge)
            ).toFixed(2)
            : getCart?.total_after_discount
          : getCart?.total_after_discount
    );
  }, [proDiscount, getCart, location?.state?.data]);

  const onSubmit = async (values) => {
    if (payment) {
      if (payment === "C" || payment === "O") {
        let data = {};
        if (values.ship) {
          if (values.shipping === "newAddress") {
            data = {
              params: {
                pincode: values.shipping_postcode,
              },
            };
          } else {
            var pin = addressBook.find((pin) => pin.id === addressBookIdShip);
            data = {
              params: {
                pincode: pin?.postcode,
              },
            };
          }
        } else {
          if (values.billing === "newAddress") {
            data = {
              params: {
                pincode: values.billing_postcode,
              },
            };
          } else {
            var pin1 = addressBook.find((pin) => pin.id === addressBookId);
            data = {
              params: {
                pincode: pin1?.postcode,
              },
            };
          }
        }
        dispatch(isLoader(true));
        ApiPost("pincode-payment-mode", data).then((res) => {
          dispatch(isLoader(false));
          setIsMode(res?.data?.mode)
          if (values?.billing !== "newAddress" && !addressBookId) {
            swal({
              title: "Warning",
              text: "Please select address",
              icon: "warning",
            });
          } else if (
            (values?.billing !== "newAddress") & values.ship &&
            !addressBookIdShip
          ) {
            swal({
              title: "Warning",
              text: "Please select shipping address",
              icon: "warning",
            });
          } else if (!isPaymentMode) {
            var formData = new FormData();
            if (values?.billing === "newAddress") {
              formData.append("billing_fname", values.billing_first_name);
              formData.append("billing_lname", values.billing_last_name);
              formData.append("billing_email", values.billing_email);
              formData.append("billing_phone", values.billing_phone.toString());
              formData.append("billing_street_address", values.billing_address);
              formData.append("billing_state", values.billing_state);
              formData.append("billing_city", values.billing_city);
              formData.append("billing_country", values.billing_country);
              formData.append("billing_postcode", values.billing_postcode);
            } else {
              formData.append("billing_address_book_id", +addressBookId);
            }
            formData.append("ship_to_different", values.ship ? "Y" : "N");
            if (values?.shipping === "newAddress" && values.ship) {
              formData.append("shipping_fname", values.shipping_first_name);
              formData.append("shipping_lname", values.shipping_last_name);
              formData.append("shipping_email", values.shipping_email);
              formData.append("shipping_phone", values.shipping_phone.toString());
              formData.append("shipping_street_address", values.shipping_address);
              formData.append("shipping_state", values.shipping_state);
              formData.append("shipping_city", values.shipping_city);
              formData.append("shipping_country", values.shipping_country);
              formData.append("shipping_postcode", values.shipping_postcode);
            } else {
              formData.append("shipping_address_book_id", +addressBookIdShip);
            }
            formData.append("total_amount", total);
            formData.append(
              "is_saved_shipping_address",
              values?.shipping !== "newAddress" ? "Y" : "N"
            );
            formData.append(
              "is_saved_billing_address",
              values?.billing !== "newAddress" ? "Y" : "N"
            );
            formData.append("is_saved_address", "N");
            formData.append("shipping_fees", shippingCharge);
            formData.append("currency_code", "IN");
            formData.append("payment_method", payment);
            formData.append(
              "coupon_apply",
              location?.state?.data?.total_price ? "Y" : "N"
            );
            formData.append(
              "coupon_code",
              location?.state?.data?.coupon_details?.id
                ? location?.state?.data?.coupon_details?.id
                : ""
            );

            dispatch(isLoader(true));
            ApiPost("order-place", formData).then((res) => {
              if (res?.data?.message) {
                swal({
                  title: "Success",
                  text: res.data.message,
                  icon: "success",
                }).then(function () {
                  const body = {
                    params: {
                      session_id: sessionStorage.getItem("sessionId"),
                    },
                  };
                  navigate("/order-history");
                  if (userDetail) {
                    dispatch(getCount());
                  } else {
                    dispatch(getCountTemp(body));
                  }
                });
              } else if (res.data.error) {
                swal({
                  title: "Error",
                  text: res.data.error,
                  icon: "error",
                });
              }
              dispatch(isLoader(false));
            });
          } else {
            if (isPaymentMode) {
              navigate('/payment', {
                state: {
                  data: values,
                  shippingCharge: shippingCharge,
                  total: total,
                  addressBookId: addressBookId
                }
              })
            } else {
              setIsPaymentMode(false)
              swal({
                title: "Error",
                text: "Given postcode is not avaliable!",
                icon: "error",
              });
            }
          }
        });
      } else {
        var formData = new FormData();
        if (values?.billing === "newAddress") {
          formData.append("billing_fname", values.billing_first_name);
          formData.append("billing_lname", values.billing_last_name);
          formData.append("billing_email", values.billing_email);
          formData.append("billing_phone", values.billing_phone.toString());
          formData.append("billing_street_address", values.billing_address);
          formData.append("billing_state", values.billing_state);
          formData.append("billing_city", values.billing_city);
          formData.append("billing_country", values.billing_country);
          formData.append("billing_postcode", values.billing_postcode);
        } else {
          formData.append("billing_address_book_id", +addressBookId);
        }
        formData.append("ship_to_different", values.ship ? "Y" : "N");
        if (values?.shipping === "newAddress" && values.ship) {
          formData.append("shipping_fname", values.shipping_first_name);
          formData.append("shipping_lname", values.shipping_last_name);
          formData.append("shipping_email", values.shipping_email);
          formData.append("shipping_phone", values.shipping_phone.toString());
          formData.append("shipping_street_address", values.shipping_address);
          formData.append("shipping_state", values.shipping_state);
          formData.append("shipping_city", values.shipping_city);
          formData.append("shipping_country", values.shipping_country);
          formData.append("shipping_postcode", values.shipping_postcode);
        } else {
          formData.append("shipping_address_book_id", +addressBookIdShip);
        }
        formData.append("total_amount", total);
        formData.append(
          "is_saved_shipping_address",
          values?.shipping !== "newAddress" ? "Y" : "N"
        );
        formData.append(
          "is_saved_billing_address",
          values?.billing !== "newAddress" ? "Y" : "N"
        );
        formData.append("is_saved_address", "N");
        formData.append("shipping_fees", shippingCharge);
        formData.append("currency_code", "IN");
        formData.append("payment_method", payment);
        formData.append(
          "coupon_apply",
          location?.state?.data?.total_price ? "Y" : "N"
        );
        formData.append(
          "coupon_code",
          location?.state?.data?.coupon_details?.id
            ? location?.state?.data?.coupon_details?.id
            : ""
        );

        dispatch(isLoader(true));
        ApiPost("order-place", formData).then((res) => {
          if (res?.data?.message) {
            swal({
              title: "Success",
              text: res.data.message,
              icon: "success",
            }).then(function () {
              const body = {
                params: {
                  session_id: sessionStorage.getItem("sessionId"),
                },
              };
              navigate("/order-history");
              if (userDetail) {
                dispatch(getCount());
              } else {
                dispatch(getCountTemp(body));
              }
            });
          } else if (res.data.error) {
            // swal({
            //   title: "Error",
            //   text: res.data.error,
            //   icon: "error",
            // });
          }
          dispatch(isLoader(false));
        });
      }
    } else {
      swal({
        title: "Error",
        text: "Please check your pincode first",
        icon: "error",
      });
    }
  };

  const CheckPincode = async (value) => {
    let data = {
      params: {
        pincode: value,
      },
    };
    ApiPost("pincode-payment-mode", data).then((res) => {
      setPincode(res?.data?.mode)
    })
  }

  useEffect(() => {
    CheckPincode(addressBook?.[0]?.postcode)
  }, [addressBookId, addressBookIdShip])


  return (
    <Box>
      <Box component="div" className={classes.cart}>
        <Container className={classes.cont}>
          <Heading
            title="Checkout"
            bgText="C"
            fontFamily="League Spartan"
            subTitle="Through original imagery and editorial perspectives, we bring you unique point new views."
            size="44px"
            tabsize="44px"
            iphsize="30px"
            h="120px"
            tabh="105px"
            iphh="84px"
            lapbott="80px"
            iphbott="71px"
            tabbott="75px"
            mobilebott="83px"
            bott="57px"
            deskbott="78px"
          />
          <Breadcrumbs
            separator={<EastIcon className={classes.bredIco} />}
            aria-label="breadcrumb"
            className={classes.breadcrumb}
          >
            <Typography className={classes.breadcont} sx={{ color: "#BD3D3D" }}>
              <Box
                component="span"
                className={classes.breadnum}
                sx={{ backgroundColor: "#BD3D3D" }}
              >
                1
              </Box>
              Shopping Cart
            </Typography>
            <Typography className={classes.breadcont} sx={{ color: "#BD3D3D" }}>
              <Box
                component="span"
                className={classes.breadnum}
                sx={{ backgroundColor: "#BD3D3D" }}
              >
                2
              </Box>
              Checkout & Delivery Options
            </Typography>
            <Typography className={classes.breadcont} sx={{ color: "#4F5067" }}>
              <Box
                component="span"
                className={classes.breadnum}
                sx={{ backgroundColor: "#4F5067" }}
              >
                3
              </Box>
              Successfully Purchased
            </Typography>
          </Breadcrumbs>
          <CommonCartTable cartListFromApi={cartListFromApi} />
          <Box component="div" className={classes.cartbott}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className={classes.loginForm}>
                  <Box component="div" className={classes.cartbottLeft}>
                    <Box component="div" className={classes.billing}>
                      <Typography variant="h2" className={classes.billHead}>
                        Billing details
                      </Typography>
                      <Grid
                        container
                        className={classes.profileGrid}
                        spacing={{
                          xSmall: 1,
                          laptop: 1.5,
                          smallLaptop: 1.5,
                          desktop: 1.5,
                        }}
                      >
                        <Grid
                          item
                          xSmall={12}
                          small={12}
                          iph={12}
                          mobile={12}
                          tab={12}
                          laptop={12}
                          desktop={12}
                          mLaptop={12}
                        >
                          <FormControl>
                            <RadioGroup
                              row
                              name="billing"
                              defaultValue="newAddress"
                              value={
                                addressBook?.length === 0
                                  ? "newAddress"
                                  : values.billing
                              }
                              onChange={(e) =>
                                setFieldValue("billing", e.target.value)
                              }
                            >
                              <FormControlLabel
                                value="newAddress"
                                control={<Radio />}
                                label="Create New Address"
                                className={classes.radio}
                              />
                              <FormControlLabel
                                value="savedAddress"
                                control={<Radio />}
                                label="Use Saved address"
                                className={classes.radio}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        {values.billing === "newAddress" ? (
                          <>
                            <Grid
                              item
                              xSmall={12}
                              small={12}
                              iph={12}
                              mobile={6}
                              tab={3}
                              laptop={6}
                              desktop={6}
                              mLaptop={3}
                            >
                              <Field
                                as={SimpleInput}
                                className={classes.textField}
                                label="First Name"
                                name="billing_first_name"
                                helperText={
                                  <Box
                                    component="span"
                                    className={classes.err}
                                    disableGutters
                                  >
                                    <ErrorMessage name="billing_first_name" />
                                  </Box>
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xSmall={12}
                              small={12}
                              iph={12}
                              mobile={6}
                              tab={3}
                              laptop={6}
                              desktop={6}
                              mLaptop={3}
                            >
                              <Field
                                as={SimpleInput}
                                className={classes.textField}
                                label="Last Name"
                                name="billing_last_name"
                                helperText={
                                  <Box
                                    component="span"
                                    className={classes.err}
                                    disableGutters
                                  >
                                    <ErrorMessage name="billing_last_name" />
                                  </Box>
                                }
                              />
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
                              mLaptop={6}
                            >
                              <Field
                                as={SimpleInput}
                                className={classes.textField}
                                label="Email Address"
                                name="billing_email"
                                helperText={
                                  <Box
                                    component="span"
                                    className={classes.err}
                                    disableGutters
                                  >
                                    <ErrorMessage name="billing_email" />
                                  </Box>
                                }
                              />
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
                              mLaptop={6}
                            >
                              <Field
                                as={SimpleInput}
                                type="number"
                                showPassword1={true}
                                className={classes.textField}
                                label="Phone"
                                name="billing_phone"
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
                                    <ErrorMessage name="billing_phone" />
                                  </Box>
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xSmall={12}
                              small={12}
                              iph={12}
                              mobile={12}
                              tab={12}
                              laptop={12}
                              desktop={12}
                              mLaptop={12}
                            >
                              <Field
                                as={SimpleInput}
                                className={classes.textField}
                                label="House Address"
                                name="billing_address"
                                helperText={
                                  <Box
                                    component="span"
                                    className={classes.err}
                                    disableGutters
                                  >
                                    <ErrorMessage name="billing_address" />
                                  </Box>
                                }
                              />
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
                              mLaptop={6}
                            >
                              <Field
                                className={classes.textField}
                                name="billing_country"
                                as={Autocomplete}
                                options={countries?.map((e) => e?.name)}
                                onChange={(e, value) => {
                                  setFieldValue("billing_country", value);
                                }}
                                value={values.country}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Country / Region"
                                  />
                                )}
                              />
                              <Box
                                component="span"
                                className={classes.err}
                                disableGutters
                              >
                                <ErrorMessage name="billing_country" />
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
                              mLaptop={6}
                            >
                              <Field
                                as={Autocomplete}
                                options={states?.map((e) => e?.name)}
                                className={classes.textField}
                                name="billing_state"
                                value={values.state}
                                onChange={(e, value) => {
                                  setFieldValue("billing_state", value);
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
                                <ErrorMessage name="billing_state" />
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
                              mLaptop={6}
                            >
                              <Field
                                as={SimpleInput}
                                className={classes.textField}
                                label="Town / City"
                                name="billing_city"
                                helperText={
                                  <Box
                                    component="span"
                                    className={classes.err}
                                    disableGutters
                                  >
                                    <ErrorMessage name="billing_city" />
                                  </Box>
                                }
                              />
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
                              mLaptop={6}
                            >
                              <Field
                                as={SimpleInput}
                                type="number"
                                showPassword1={true}
                                className={classes.textField}
                                label="ZIP Code"
                                name="billing_postcode"
                                InputProps={{ min: 0 }}
                                onKeyDown={(event) => {
                                  if (InvalidNumberKeys.includes(event.code)) {
                                    event.preventDefault();
                                  }
                                }}
                                onBlur={(e) => CheckPincode(e.target.value)}
                                onInput={(e) => { e.target.value = e.target.value ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 6) : '' }}
                                helperText={
                                  <Box
                                    component="span"
                                    className={classes.err}
                                    disableGutters
                                  >
                                    <ErrorMessage name="billing_postcode" />
                                  </Box>
                                }
                              />
                            </Grid>
                          </>
                        ) : (
                          <Grid sx={{ p: "10px 15px" }} xSmall={12}>
                            <Grid container columnSpacing={2}>
                              {addressBook?.length !== 0 &&
                                addressBook.map((item, index) => {
                                  return (
                                    <Grid
                                      item
                                      xSmall={12}
                                      small={12}
                                      xTab={6}
                                      mobile={6}
                                      laptop={6}
                                      key={index}
                                    >
                                      <AddressBookBox
                                        address={item}
                                        notShow={true}
                                        addressBookId={addressBookId}
                                        setAddressBookId={setAddressBookId}
                                        shipType="B"
                                      />
                                    </Grid>
                                  );
                                })}
                              {addressBook?.length === 0 && (
                                <>
                                  {setFieldValue("billing", "newAddress")}
                                  {noAddress()}
                                </>
                              )}
                            </Grid>
                          </Grid>
                        )}
                        <Grid
                          item
                          xSmall={12}
                          small={12}
                          iph={12}
                          mobile={12}
                          tab={12}
                          laptop={12}
                          desktop={12}
                          mLaptop={12}
                        >
                          <FormGroup>
                            <FormControlLabel
                              className={classes.radio}
                              control={
                                <Checkbox
                                  name="ship"
                                  checked={values?.ship}
                                  onChange={() =>
                                    setFieldValue("ship", !values.ship)
                                  }
                                  inputProps={{
                                    "aria-label": "controlled",
                                  }}
                                />
                              }
                              label="Ship to a different address?"
                            />
                          </FormGroup>
                        </Grid>
                        {values.ship === true ? (
                          <>
                            <Grid
                              item
                              xSmall={12}
                              small={12}
                              iph={12}
                              mobile={12}
                              tab={12}
                              laptop={12}
                              desktop={12}
                              mLaptop={12}
                            >
                              <FormControl>
                                <RadioGroup
                                  row
                                  name="shipping"
                                  defaultValue="newAddress"
                                  onChange={(e) =>
                                    setFieldValue("shipping", e.target.value)
                                  }
                                >
                                  <FormControlLabel
                                    value="newAddress"
                                    control={<Radio />}
                                    label="Create New Address"
                                    className={classes.radio}
                                  />
                                  <FormControlLabel
                                    value="savedAddress"
                                    control={<Radio />}
                                    label="Use Saved address"
                                    className={classes.radio}
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                            {values.shipping === "newAddress" ? (
                              <>
                                <Grid
                                  item
                                  xSmall={12}
                                  small={12}
                                  iph={12}
                                  mobile={6}
                                  tab={3}
                                  laptop={6}
                                  desktop={6}
                                  mLaptop={3}
                                >
                                  <Field
                                    as={SimpleInput}
                                    className={classes.textField}
                                    label="First Name"
                                    name="shipping_first_name"
                                    helperText={
                                      <Box
                                        component="span"
                                        className={classes.err}
                                        disableGutters
                                      >
                                        <ErrorMessage name="shipping_first_name" />
                                      </Box>
                                    }
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xSmall={12}
                                  small={12}
                                  iph={12}
                                  mobile={6}
                                  tab={3}
                                  laptop={6}
                                  desktop={6}
                                  mLaptop={3}
                                >
                                  <Field
                                    as={SimpleInput}
                                    className={classes.textField}
                                    label="Last Name"
                                    name="shipping_last_name"
                                    helperText={
                                      <Box
                                        component="span"
                                        className={classes.err}
                                        disableGutters
                                      >
                                        <ErrorMessage name="shipping_last_name" />
                                      </Box>
                                    }
                                  />
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
                                  mLaptop={6}
                                >
                                  <Field
                                    as={SimpleInput}
                                    className={classes.textField}
                                    label="Email Address"
                                    name="shipping_email"
                                    helperText={
                                      <Box
                                        component="span"
                                        className={classes.err}
                                        disableGutters
                                      >
                                        <ErrorMessage name="shipping_email" />
                                      </Box>
                                    }
                                  />
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
                                  mLaptop={6}
                                >
                                  <Field
                                    as={SimpleInput}
                                    type="number"
                                    showPassword1={true}
                                    className={classes.textField}
                                    label="Phone"
                                    name="shipping_phone"
                                    InputProps={{ min: 0 }}
                                    onKeyDown={(event) => {
                                      if (
                                        InvalidNumberKeys.includes(event.code)
                                      ) {
                                        event.preventDefault();
                                      }
                                    }}
                                    helperText={
                                      <Box
                                        component="span"
                                        className={classes.err}
                                        disableGutters
                                      >
                                        <ErrorMessage name="shipping_phone" />
                                      </Box>
                                    }
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xSmall={12}
                                  small={12}
                                  iph={12}
                                  mobile={12}
                                  tab={12}
                                  laptop={12}
                                  desktop={12}
                                  mLaptop={12}
                                >
                                  <Field
                                    as={SimpleInput}
                                    className={classes.textField}
                                    label="House Address"
                                    name="shipping_address"
                                    helperText={
                                      <Box
                                        component="span"
                                        className={classes.err}
                                        disableGutters
                                      >
                                        <ErrorMessage name="shipping_address" />
                                      </Box>
                                    }
                                  />
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
                                  mLaptop={6}
                                >
                                  <Field
                                    className={classes.textField}
                                    name="shipping_country"
                                    as={Autocomplete}
                                    options={countries?.map((e) => e?.name)}
                                    value={values.country}
                                    onChange={(e, newValue) => {
                                      setFieldValue(
                                        "shipping_country",
                                        newValue
                                      );
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Country / Region"
                                      />
                                    )}
                                  />
                                  <Box
                                    component="span"
                                    className={classes.err}
                                    disableGutters
                                  >
                                    <ErrorMessage name="shipping_country" />
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
                                  mLaptop={6}
                                >
                                  <Field
                                    as={Autocomplete}
                                    options={states?.map((e) => e?.name)}
                                    className={classes.textField}
                                    name="shipping_state"
                                    value={values.state}
                                    onChange={(e, newValue) => {
                                      setFieldValue("shipping_state", newValue);
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
                                    <ErrorMessage name="shipping_state" />
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
                                  mLaptop={6}
                                >
                                  <Field
                                    as={SimpleInput}
                                    className={classes.textField}
                                    label="Town / City"
                                    name="shipping_city"
                                    helperText={
                                      <Box
                                        component="span"
                                        className={classes.err}
                                        disableGutters
                                      >
                                        <ErrorMessage name="shipping_city" />
                                      </Box>
                                    }
                                  />
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
                                  mLaptop={6}
                                >
                                  <Field
                                    as={SimpleInput}
                                    type="number"
                                    showPassword1={true}
                                    className={classes.textField}
                                    label="ZIP Code"
                                    name="shipping_postcode"
                                    InputProps={{ min: 0 }}
                                    onKeyDown={(event) => {
                                      if (
                                        InvalidNumberKeys.includes(event.code)
                                      ) {
                                        event.preventDefault();
                                      }
                                    }}
                                    onBlur={(e) => CheckPincode(e.target.value)}
                                    onInput={(e) => { e.target.value = e.target.value ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 6) : '' }}
                                    helperText={
                                      <Box
                                        component="span"
                                        className={classes.err}
                                        disableGutters
                                      >
                                        <ErrorMessage name="shipping_postcode" />
                                      </Box>
                                    }
                                  />
                                </Grid>
                              </>
                            ) : (
                              <Box sx={{ p: "10px 15px", width: "100%" }}>
                                <Grid container columnSpacing={2}>
                                  {addressBook !== 0 &&
                                    addressBook.map((item, index) => {
                                      return (
                                        <Grid
                                          item
                                          xSmall={12}
                                          small={12}
                                          iph={6}
                                          mobile={6}
                                          laptop={6}
                                          key={index}
                                        >
                                          <AddressBookBox
                                            address={item}
                                            notShow={true}
                                            addressBookIdShip={
                                              addressBookIdShip
                                            }
                                            setAddressBookIdShip={
                                              setAddressBookIdShip
                                            }
                                            shipType="S"
                                          />
                                        </Grid>
                                      );
                                    })}
                                  {addressBook?.length === 0 && (
                                    <>
                                      {setFieldValue("shipping", "newAddress")}
                                      {noAddress()}
                                    </>
                                  )}
                                </Grid>
                              </Box>
                            )}
                          </>
                        ) : (
                          " "
                        )}
                      </Grid>
                    </Box>
                  </Box>
                  <Box component="div" className={classes.cartbottRight}>
                    <SubTotalBox
                      button="Place order"
                      pinCode={pinCode}
                      payment_mode={payment}
                      setPayment={setPayment}
                      setIsMode={setIsMode}
                      setIsPaymentMode={setIsPaymentMode}
                      isMode={isMode}
                      cartListFromApi={getCart}
                      shippingCharge={shippingCharge}
                      couponCode={location?.state?.data}
                    />
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default CheckOut;
