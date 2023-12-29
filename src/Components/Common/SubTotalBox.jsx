import { Box, Button, FormHelperText, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import EastIcon from "@mui/icons-material/East";
import { useLocation } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { ApiPost } from "../../Api/Api";
// import swal from "sweetalert";
import { InvalidNumberKeysAlphabet } from "../../lib/Regax";

const useStyles = makeStyles()((theme) => {
  return {
    subtot: {
      display: "flex",
      flexDirection: "column",
    },
    subtotttl: {
      display: "flex",
      justifyContent: "space-between",
      color: "#4E4E56",
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "39px",
      fontFamily: "League Spartan",
      [`& span`]: {
        color: "#1A1B2F",
        fontSize: "20px",
        fontWeight: 400,
        lineHeight: "39px",
        fontFamily: "League Spartan",
      },
    },
    subtotal: {
      display: "flex",
      justifyContent: "space-between",
      color: "#1A1B2F",
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "39px",
      padding: "7px 0",
      fontFamily: "League Spartan",
      borderTop: "1px solid rgba(214, 214, 214, 0.4)",
      borderBottom: "1px solid rgba(214, 214, 214, 0.4)",
      [`& span`]: {
        color: "#1A1B2F",
        fontSize: "20px",
        fontWeight: 500,
        lineHeight: "39px",
        fontFamily: "League Spartan",
      },
    },
    checkButt: {
      marginTop: "20px",
    },
    saveButton: {
      padding: "18px 15px 12px 15px",
      backgroundColor: "#141524",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "0",
      height: "48px",
      width: "100%",
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
        height: "40px",
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
    contitue: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#141524",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "18px",
      marginTop: "24px",
      [`& svg`]: {
        marginLeft: "11px",
      },
      "&:hover": {
        color: "#BD3D3D",
      },
    },
    payOption: {
      display: "flex",
      flexDirection: "column",
      marginTop: "24px",

    },
    payhead: {
      color: "#35364F",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "23px",
      lineHeight: "18px",
      marginBottom: "16px",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "14px",
        lineHeight: "3px",
        marginBottom: "15px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "14px",
        lineHeight: "3px",
        marginBottom: "15px",
      },
    },
    payhead2: {
      color: "#BD3D3D",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "23px",
      lineHeight: "18px",
      marginBottom: "16px",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "14px",
        lineHeight: "3px",
        marginBottom: "0px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "14px",
        lineHeight: "3px",
        marginBottom: "0px",
      },
    },
    payBott: {
      border: "1px solid rgba(214, 214, 214, 0.4)",
      padding: "17px 16px",
    },
    radio: {
      [`& .MuiTypography-root`]: {
        color: "#3D3D47",
        fontFamily: "League Spartan",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "18px",
        lineHeight: "20px",
      },
    },
    radiohelper: {
      color: "#858A8C",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "15px",
      lineHeight: "18px",
      paddingLeft: "30px",
      marginTop: "-6px",
    },
    boxCheck: {
      display: "flex",
      alignItems: "flex-start",
      marginTop: '10px',
      [theme.breakpoints.down("xiph")]: {
        marginLeft: "0px !important",
        marginTop: "18px !important",
      },
    },
    checkText: {
      fontFamily: "League Spartan",
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "16.56px",
      color: "#BD3D3D",
      cursor: "pointer",
      paddingTop: "14px",
      paddingLeft: "14px",
    },
    textField: {
      width: "98%",
      [`& .MuiOutlinedInput-root`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "17px !important",
        color: "#7E7F84",
        borderRadius: "0px !important",
      },
      [`& .MuiFormHelperText-root`]: {
        fontFamily: "League Spartan",
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "14.72px",
        color: "#61616A",
        margin: "0px !important",
        padding: "0px !important",
        marginTop: "11px !important",
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

function SubTotalBox(props) {
  const { classes } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [pinCode, setPinCode] = useState();

  var proDiscount = parseFloat(
    props?.cartListFromApi?.total_before_discount -
    props?.cartListFromApi?.total_after_discount
  ).toFixed(2);
  const handleNavigate = () => {
    if (location.pathname === "/cart") {
      navigate("/checkout", { state: { data: props?.couponCode } });
    }
  };

  const _checkDefaultPayment = (data) => {
    if (data === "COD") {
      return "C"
    } else if (data === "BNK") {
      return "D"
    } else {
      return "O"
    }
  }

  const pay = () => {
    props?.setIsPaymentMode(true)
    handleNavigate()
    // navigate('/payment')
  }

  return (
    <Box component="div" className={classes.subtot}>
      <Typography variant="h4" className={classes.subtotttl}>
        Subtotal:
        <Typography variant="p">
          ₹{props?.cartListFromApi?.total_before_discount ? JSON.parse(props?.cartListFromApi?.total_before_discount).toFixed(2) : 0.00}
        </Typography>
      </Typography>
      <Typography variant="h4" className={classes.subtotttl}>
        Product Discount:
        <Typography variant="p">₹{proDiscount}</Typography>
      </Typography>
      <Typography variant="h4" className={classes.subtotttl}>
        Coupon Discount:
        <Typography variant="p">₹{props?.couponCode?.total_price && proDiscount === "0.00" ? (JSON.parse(props?.couponCode?.total_price) - props?.couponCode?.total_price_after_deduction).toFixed(2) : "0.00"}</Typography>
      </Typography>
      {location.pathname === "/checkout" && (
        <Typography variant="h4" className={classes.subtotttl}>
          Shipping:
          <Typography variant="p">
            ₹{props?.shippingCharge ? props?.shippingCharge : 0}
          </Typography>
        </Typography>
      )}
      {location?.pathname === "/cart" ? (
        <Typography variant="h4" className={classes.subtotal}>
          Total:
          <Typography variant="p">
            ₹
            {proDiscount === "0.00" ? ((props?.couponCode?.total_price_after_deduction || props?.couponCode?.total_price_after_deduction === 0) ? JSON.parse(props?.couponCode?.total_price_after_deduction).toFixed(2) :
              props?.cartListFromApi?.total_before_discount ? JSON.parse(props?.cartListFromApi?.total_before_discount).toFixed(2) : 0.00) :
              (props?.cartListFromApi?.total_after_discount
                ? props?.shippingCharge
                  ? (JSON.pars(props?.cartListFromApi?.total_after_discount) +
                    JSON.pars(props?.shippingCharge)).toFixed(2)
                  : props?.cartListFromApi?.total_after_discount ? JSON.parse(props?.cartListFromApi?.total_after_discount).toFixed(2) : 0.00
                : props?.cartListFromApi?.total_after_discount ? JSON.parse(props?.cartListFromApi?.total_after_discount).toFixed(2) : 0.00)}
          </Typography>
        </Typography>
      ) : <Typography variant="h4" className={classes.subtotal}>
        Total:
        <Typography variant="p">
          ₹
          {proDiscount === "0.00" ?
            ((props?.couponCode?.total_price_after_deduction || props?.couponCode?.total_price_after_deduction === 0) ? ((JSON.parse(props?.couponCode?.total_price_after_deduction) + parseInt(props?.shippingCharge))).toFixed(2) : (parseInt(props?.cartListFromApi?.total_before_discount) + parseInt(props?.shippingCharge)).toFixed(2))
            :
            (props?.cartListFromApi?.total_after_discount
              ? props?.shippingCharge
                ? (JSON.parse(props?.cartListFromApi?.total_after_discount) +
                  parseInt(props?.shippingCharge)).toFixed(2)
                : props?.cartListFromApi?.total_after_discount
              : props?.cartListFromApi?.total_after_discount)
          }
        </Typography>
      </Typography>}

      {location?.pathname === "/checkout" && (
        <>
          <Box component="div" className={classes.payOption}>
            <Typography variant="h3" className={classes.payhead}>
              Payment Options
            </Typography>
            <Box component="div" className={classes.payBott}>
              <RadioGroup
                value={props?.payment_mode?.length > 1 ? 'C' : props?.payment_mode}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={props?.payment_mode}
                name={'payment'}
                onChange={(e) => props.setPayment(e.target.value)}
              >

                {props?.pinCode === "Y" &&
                  <FormControlLabel
                    className={classes.radio}
                    value="C"
                    control={<Radio value="C" name='payment' />}
                    label="Cash on delivery"
                    name="payment"
                  />
                }
                <FormControlLabel
                  className={classes.radio}
                  value="O"
                  control={<Radio value="O" name="payment" />}
                  label="Online"
                  name="payment"
                />
              </RadioGroup>
            </Box>
          </Box>
          {
            props?.isMode && props?.isMode === "N" &&
            <Box component="div" className={classes.payOption}>
              <Typography variant="h3" className={classes.payhead} >
                No Payment Option Available.
              </Typography>

            </Box>
          }
        </>
      )}
      <Box component="div" className={classes.checkButt}>
        {(props?.payment_mode?.[0] === "C" || location?.pathname === '/cart') &&
          <Button
            className={classes.saveButton}
            variant="contained"
            type="submit"
            disableRipple
            onClick={handleNavigate}
          >
            <Typography className={classes.buttonText}>
              {props?.button}
            </Typography>
          </Button>
        }
        {location?.pathname === "/cart" && (
          <Box component={Link} className={classes.contitue} to="/search">
            Continue Shopping
            <EastIcon />
          </Box>
        )}
        {location?.pathname === "/checkout" && props?.payment_mode?.[0] === "O" && (
          <Button
            className={classes.saveButton}
            variant="contained"
            type="submit"
            disableRipple
            sx={{ marginTop: '10px' }}
            onClick={pay}
            defaultValue="O"
          >
            <Typography className={classes.buttonText}>
              Pay
            </Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default SubTotalBox;