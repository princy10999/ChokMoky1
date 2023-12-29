import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Button, Container, Typography } from "@mui/material";
import Heading from "../../Components/Common/Heading";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import EastIcon from "@mui/icons-material/East";
import CommonCartTable from "../../Components/Common/CommonCartTable";
import ApplyCode from "../../Components/Common/ApplyCode";
import InterestBox from "../../Components/Common/InterestBox";
import SubTotalBox from "../../Components/Common/SubTotalBox";
import swal from "sweetalert";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import {
  addToCart,
  cartList,
  getCount,
  RemoveFromCart,
  coupanCode,
  removeFormCartQty,
  cartListTemp,
  RemoveFromCartTemp,
  removeFormCartQtyTemp,
  addToCartTemp,
  getCountTemp,
  coupanCodeBeforeLogin,
} from "../../Redux/Actions/AuthUser";
import noRecord from "../../Assests/images/no-record.webp";
import { useDispatch } from "react-redux";

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
      },
    },
    cartbottRight: {
      width: "30%",
      [theme.breakpoints.down("laptop")]: {
        width: "98%",
      },
    },
    cartleftbott: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "26px",
      marginTop: "34px",
      [theme.breakpoints.down("tab")]: {
        marginBottom: "18px",
        marginTop: "24px",
      },
      [theme.breakpoints.down("mobile")]: {
        marginBottom: "15px",
        marginTop: "18px",
      },
    },
    botthead: {
      color: "#35364F",
      fontSize: "25px",
      fontWeight: 400,
      lineHeight: "18px",
      fontFamily: "League Spartan",
      paddingBottom: "26px",
      [theme.breakpoints.down("tab")]: {
        fontSize: "23px",
        paddingBottom: "18px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "20px",
        paddingBottom: "12px",
      },
    },
    dataBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginTop: "30px",
    },
    foundText: {
      lineHeight: "1.167",
      letterSpacing: "-0.01562em",
      fontFamily: " League Spartan",
      color: "#BD3D3D",
      fontSize: "40px",
      fontWeight: "500",
      textAlign: "center",
      marginTop: "10px",
      [theme.breakpoints.down("smartPhone")]: {
        fontSize: "30px",
      },
    },
    imgOfData: {
      width: "340px",
      height: "auto",
      [theme.breakpoints.down("mobile")]: {
        width: "310px",
      },
    },
    shoppingBut: {
      padding: "12px 15px 12px 15px",
      backgroundColor: "#141524",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "0",
      height: "50px",
      position: "relative",
      marginTop: "15px",
      zIndex: "2",
      overflow: "hidden",
      textTransform: "none",
      [`& p`]: {
        fontFamily: "League Spartan",
        fontSize: "18px",
        lineHeight: "24px",
      },
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
        minWidth: "150px",
        height: "40px",
      },
    },
  };
});

function Cart() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetail = JSON.parse(localStorage.getItem("userData"));
  const [couponCodeValue, setCouponCodeValue] = useState("");
  const [cartListFromApi, setCartListFromApi] = useState([]);
  const [interestedProduct, setInterestedProduct] = useState([]);
  const [couponCode, setCouponCode] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Shopping Cart - Chokmoki";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  useEffect(() => {
    cartListFunction();
  }, []);

  let removeFromCart = async (id) => {
    const removeBody = {
      params: {
        cart_details_id: id,
      },
    };
    const removeBody2 = {
      params: {
        cart_details_id: id,
        session_id: sessionStorage.getItem("sessionId"),
      },
    };
    const response = await dispatch(
      userDetail ? RemoveFromCart(removeBody) : RemoveFromCartTemp(removeBody2)
    );
    if (response?.payload?.result?.status?.meaning) {
      // swal({
      //   title: "Success",
      //   text: response?.payload?.result?.status?.meaning,
      //   icon: "success",
      // });
    } else {
      // swal({
      //   title: "Warning",
      //   text: response?.payload?.error?.meaning,
      //   icon: "warning",
      // });
    }
    cartListFunction();
  };

  let incrementCounter = async (id, stock) => {
    if (stock > 0) {
      const body = {
        params: {
          product_id: id,
          currency_code: "IN",
          quantity: 1,
        },
      };
      const body2 = {
        params: {
          product_id: id,
          currency_code: "IN",
          quantity: 1,
          session_id: sessionStorage.getItem("sessionId"),
        },
      };
      const response = await dispatch(
        userDetail ? addToCart(body) : addToCartTemp(body2)
      );
      if (response?.payload?.result?.status?.meaning) {
        // swal({
        //   title: "Success",
        //   text: response?.payload?.result?.status?.meaning,
        //   icon: "success",
        // });
      } else {
        // swal({
        //   title: "Warning",
        //   text: response?.payload?.error?.meaning,
        //   icon: "warning",
        // });
      }
      cartListFunction();
      if (couponCodeValue) {
        coupanCodeFunction(couponCodeValue);
      } else {
        coupanCodeBeforeLogin();
      }
    } else {
      swal({
        title: "Warning",
        text: "Sorry, This product now out of stock. Check again later.",
        icon: "warning",
      });
    }
  };

  let decrementCounter = async (id) => {
    const body = {
      params: {
        cart_details_id: id,
      },
    };
    const body2 = {
      params: {
        cart_details_id: id,
        session_id: sessionStorage.getItem("sessionId"),
      },
    };
    const response = await dispatch(
      userDetail ? removeFormCartQty(body) : removeFormCartQtyTemp(body2)
    );
    if (response?.payload?.result?.status) {
      // swal({
      //   title: "Success",
      //   text: response?.payload?.result?.status,
      //   icon: "success",
      // });
    } else {
      // swal({
      //   title: "Warning",
      //   text: response?.payload?.error?.meaning,
      //   icon: "warning",
      // });
    }
    cartListFunction();
    if (couponCodeValue) {
      coupanCodeFunction(couponCodeValue);
    } else {
      coupanCodeBeforeLogin();
    }
  };

  const cartListFunction = async () => {
    dispatch(isLoader(true));
    let body = {
      params: {
        coupon_code: "",
        session_id: sessionStorage.getItem("sessionId"),
      },
    };
    const response = await dispatch(
      userDetail ? cartList() : cartListTemp(body)
    );
    setCartListFromApi(response?.payload?.cartList?.[0]);
    // const responseTemp = dispatch(cartListTemp())
    // setCartListFromApi(responseTemp?.payload?.cartList?.[0]);
    setInterestedProduct(response?.payload?.interested_product);
    if (userDetail) {
      dispatch(getCount());
    } else {
      dispatch(getCountTemp(body));
    }
    dispatch(isLoader(false));
  };

  const coupanCodeFunction = async (value) => {
    if (value === "cancel") {
      setCouponCode({});
      setCouponCodeValue("");
    } else {
      setCouponCodeValue(value);
      const body = {
        params: {
          coupon_code: value,
          card_type: "C",
          currency_code: "IN",
          session_id: sessionStorage.getItem("sessionId"),
        },
      };
      const response = await dispatch(
        userDetail ? coupanCode(body) : coupanCodeBeforeLogin(body)
      );
      setCouponCode(response?.payload);
      if (response?.payload?.message) {
        swal({
          title: "Success",
          text: response?.payload?.message,
          icon: "success",
        });
      } else {
        swal({
          title: "Warning",
          text: response?.payload?.error,
          icon: "warning",
        });
      }
    }
  };
  const handleNavigate = () => {
    navigate("/search");
  };

  return (
    <Box>
      <Box component="div" className={classes.cart}>
        <Container className={classes.cont}>
          <Heading
            title="Shopping cart"
            bgText="S"
            fontFamily="League Spartan"
            subTitle="Through original imagery and editorial perspectives, we bring you unique point new views."
            size="44px"
            tabsize="44px"
            iphsize="30px"
            h="120px"
            tabh="105px"
            iphh="84px"
            lapbott="65px"
            iphbott="71px"
            tabbott="75px"
            mobilebott="83px"
          />
          {cartListFromApi ? (
            <Box>
              <Breadcrumbs
                separator={<EastIcon className={classes.bredIco} />}
                aria-label="breadcrumb"
                className={classes.breadcrumb}
              >
                <Typography
                  className={classes.breadcont}
                  sx={{ color: "#BD3D3D" }}
                >
                  <Box
                    component="span"
                    className={classes.breadnum}
                    sx={{ backgroundColor: "#BD3D3D" }}
                  >
                    1
                  </Box>
                  Shopping Cart
                </Typography>
                <Typography
                  className={classes.breadcont}
                  sx={{ color: "#4F5067" }}
                >
                  <Box
                    component="span"
                    className={classes.breadnum}
                    sx={{ backgroundColor: "#4F5067" }}
                  >
                    2
                  </Box>
                  Checkout & Delivery Options
                </Typography>
                <Typography
                  className={classes.breadcont}
                  sx={{ color: "#4F5067" }}
                >
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
              <CommonCartTable
                cartListFromApi={cartListFromApi?.get_cart_details}
                decrementCounter={decrementCounter}
                removeFromCart={removeFromCart}
                incrementCounter={incrementCounter}
              />
              <Box component="div" className={classes.cartbott}>
                <Box component="div" className={classes.cartbottLeft}>
                  <ApplyCode
                    coupanCodeFunction={coupanCodeFunction}
                    couponCode={couponCode}
                  />
                  {interestedProduct?.length > 0 && interestedProduct ? (
                    <Box component="div" className={classes.cartleftbott}>
                      <Typography variant="h2" className={classes.botthead}>
                        You may be interested in…
                      </Typography>

                      <InterestBox
                        interestedProduct={interestedProduct}
                        incrementCounter={incrementCounter}
                      />
                    </Box>
                  ) : (
                    " "
                  )}
                </Box>
                <Box component="div" className={classes.cartbottRight}>
                  <SubTotalBox
                    button="Proceed to checkout"
                    cartListFromApi={cartListFromApi}
                    couponCode={couponCode}
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box className={classes.dataBox}>
              <Box
                component="img"
                src={noRecord}
                className={classes.imgOfData}
              />

              <Typography variant="h1" className={classes.foundText}>
                Your Cart Is Empty
              </Typography>
              <Button
                className={classes.shoppingBut}
                variant="contained"
                type="submit"
                disableRipple
                onClick={handleNavigate}
              >
                <Typography className={classes.buttonText}>
                  Continue Shopping
                </Typography>
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Cart;
