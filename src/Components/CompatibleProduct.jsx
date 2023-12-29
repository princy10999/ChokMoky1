import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { makeStyles } from "tss-react/mui";
// import new4 from "../Assests/images/new4.webp";
import noComp from "../Assests/images/no-compatible.webp";
import plus from "../Assests/images/plus.webp";
import Heading from "./Common/Heading";
import { BaseURL } from "../Api/Api";
import def from "../Assests/images/default.webp";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  addToCart,
  getCount,
  cartList,
  addToCartTemp,
  cartListTemp,
  getCountTemp,
} from "../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    Compatible: {
      margin: "69px 20px 80px 20px",
      [theme.breakpoints.down("smallLaptop")]: {
        margin: "50px 10px 80px 10px",
      },
      [theme.breakpoints.down("tab")]: {
        margin: "50px 0px 70px 0px",
      },
      [theme.breakpoints.down("mobile")]: {
        margin: "12px 0px 32px 0px",
      },
    },
    leftImg: {
      [theme.breakpoints.down("tab")]: {
        width: "220.28px",
        height: "230.59px",
      },
      [theme.breakpoints.down("stab")]: {
        width: "205px",
        height: "210px",
      },
      [theme.breakpoints.down("xTab")]: {
        width: "180px",
        height: "190px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "140px",
        height: "150px",
      },
      [theme.breakpoints.down("small")]: {
        width: "130px",
        height: "140px",
      },
    },
    rightImg: {
      [theme.breakpoints.down("tab")]: {
        width: "220.28px",
        height: "230.59px",
      },
      [theme.breakpoints.down("stab")]: {
        width: "205px",
        height: "210px",
      },
      [theme.breakpoints.down("xTab")]: {
        width: "180px",
        height: "190px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "140px",
        height: "150px",
      },
      [theme.breakpoints.down("small")]: {
        width: "130px",
        height: "140px",
      },
    },
    pluseImg: {
      [theme.breakpoints.down("tab")]: {
        width: "49px",
        height: "49px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "46px",
        height: "46px",
      },
      [theme.breakpoints.down("small")]: {
        width: "30px",
        height: "30px",
        marginLeft: "0px",
      },
    },

    collectionBox: {
      marginTop: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("stab")]: {
        flexWrap: "wrap",
      },
    },

    buttonBox: {
      marginLeft: "30px",
      [theme.breakpoints.down("laptop")]: {
        marginLeft: "10px",
      },
      [theme.breakpoints.down("stab")]: {
        marginTop: "30px",
        marginLeft: "0px",
      },
    },
    cBtn: {
      borderRadius: "0px",
      fontFamily: "League Spartan",
      fontSize: "22px",
      fontWeight: "500",
      lineHeight: "20.24px",
      padding: " 12px 24px",
      textTransform: "none",
      borderColor: "#141524",
      color: "#141524",
      [theme.breakpoints.up("laptop")]: {
        "&:hover": {
          color: "#FFFFFF",
          borderColor: "#BD3D3D",
          backgroundColor: "#BD3D3D",
        },
      },
      [theme.breakpoints.down("iph")]: {
        padding: " 9px 21px",
        fontSize: "18px",
      },
    },
    addBtn: {
      borderRadius: "0px",
      fontFamily: "League Spartan",
      fontSize: "22px",
      fontWeight: "500",
      lineHeight: "20.24px",
      padding: " 12px 24px",
      textTransform: "none",
      color: "#FFFFFF",
      borderColor: "#BD3D3D",
      backgroundColor: "#BD3D3D !important",
      [theme.breakpoints.up("laptop")]: {
        "&:hover": {
          color: "#141524",
          borderColor: "#141524",
          backgroundColor: "#FFFFFF !important",
        },
      },
      [theme.breakpoints.down("iph")]: {
        padding: " 9px 21px",
        fontSize: "18px",
      },
    },
  };
});

const CompatibleProduct = ({ data, defaultImage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [compatible, setCompatible] = useState([]);
  const [productIndex, setProductIndex] = useState(0);
  const [select, setSelect] = useState(false);
  const [cartListFromApi, setCartListFromApi] = useState("");
  const userDetail = JSON.parse(localStorage.getItem("userData"));

  const addToCartProduct = async (id) => {
    const body = {
      params: {
        product_id: id,
        currency_code: "IN",
        quantity: 1,
      },
    };
    const response = await dispatch(addToCart(body));
    if (response?.payload?.result?.status?.meaning) {
      let body = {
        params: {
          coupon_code: "",
          session_id: sessionStorage.getItem("sessionId"),
        },
      };
      // swal({
      //   title: "Success",
      //   text: response?.payload?.result?.status?.meaning,
      //   icon: "success",
      // });
      const response2 = await dispatch(
        userDetail ? cartList() : cartListTemp(body)
      );
      if (response2) {
        setCartListFromApi(response2?.payload?.cartList?.[0]?.get_cart_details);
      }
      if (userDetail) {
        dispatch(getCount());
      } else {
        dispatch(getCountTemp(body));
      }
    } else {
      // swal({
      //   title: "Warning",
      //   text: response?.payload?.error?.meaning,
      //   icon: "warning",
      // });
    }
  };

  useEffect(() => {
    setCompatible(data);
    (async () => {
      let body = {
        params: {
          coupon_code: "",
          session_id: sessionStorage.getItem("sessionId"),
        },
      };
      const response = await dispatch(
        userDetail ? cartList() : cartListTemp(body)
      );
      if (response) {
        setCartListFromApi(response?.payload?.cartList?.[0]?.get_cart_details);
      }
    })();
  }, [data]);

  const addToCartProductTemp = async (id) => {
    const body = {
      params: {
        product_id: id,
        currency_code: "IN",
        quantity: 1,
        session_id: sessionStorage.getItem("sessionId"),
      },
    };
    const removeBody = {
      params: {
        // cart_details_id: checkItem?.[0]?.id,
      },
    };
    const response = await dispatch(addToCartTemp(body));
    if (response?.payload?.result?.status?.meaning) {
      let body = {
        params: {
          coupon_code: "",
          session_id: sessionStorage.getItem("sessionId"),
        },
      };
      // swal({
      //   title: "Success",
      //   text: response?.payload?.result?.status
      //     ?.meaning,
      //   icon: "success",
      // })
      const response2 = await dispatch(cartListTemp(body));
      if (response2) {
        setCartListFromApi(response2?.payload?.cartList?.[0]?.get_cart_details);
      }
      if (userDetail) {
        dispatch(getCount());
      } else {
        dispatch(getCountTemp(body));
      }
    } else {
      // swal({
      //   title: "Warning",
      //   text: response?.payload?.error?.meaning,
      //   icon: "warning",
      // });
    }
  };

  const handleAdd = (id) => {
    const checkItem =
      cartListFromApi &&
      cartListFromApi?.filter((item) => item?.get_product_details?.id === id);
    setSelect(!select);
    userDetail
      ? checkItem && checkItem?.length !== 0
        ? swal({
            title: "Warning",
            text: "This product is already added to your cart.",
            icon: "warning",
          })
        : addToCartProduct(id)
      : addToCartProductTemp(id);
  };

  const handleSkip = () => {
    if (data?.length - 1 === productIndex) {
      swal({
        title: "Warning",
        text: "Sorry, No more compatible product found at this moment",
        icon: "warning",
      }).then((res) => res === true && setProductIndex(0));
    } else {
      setSelect(!select);
      setProductIndex(productIndex + 1);
    }
  };

  return (
    <Box className={classes.Compatible}>
      <Heading
        title="Compatible with"
        subTitle="Through original imagery and editorial perspectives, we bring you unique point newviews."
        bgText="c"
        fontFamily="League Spartan, serif"
        h="130px"
        tabh="105px"
        iphh="90px"
        mobilebott="90px"
        iphbott="78px"
        tabbott="81px"
        smallbott="84px"
      />
      <Box className={classes.collectionBox}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xSmall: 0, iph: 0.8, xTab: 2 }}
          className={classes.imgBox}
        >
          <LazyLoad offset={200}>
            <Box
              className={`${classes.comImage} ${classes.leftImg}`}
              component="img"
              src={
                defaultImage?.get_all_image?.[0]?.image
                  ? BaseURL + defaultImage?.get_all_image?.[0]?.image
                  : def
              }
              alt="product"
              sx={(theme) => ({
                cursor: "pointer",
                width: "232.28px",
                height: "257.59px",
                maxWidth: "100%",
                maxHeight: "100%",
              })}
              onClick={() =>
                defaultImage?.[0]?.get_products?.[0]?.slug
                  ? navigate(
                      `/product-detail/` +
                        defaultImage?.[0]?.get_products?.[0]?.slug
                    )
                  : {}
              }
            />
          </LazyLoad>
          <LazyLoad offset={200}>
            <Box
              className={`${classes.comImage} ${classes.pluseImg}`}
              component="img"
              src={plus}
              alt="plus"
              sx={(theme) => ({
                width: "51px",
                height: "51px",
                maxWidth: "100%",
                maxHeight: "100%",
              })}
            />
          </LazyLoad>
          {compatible && compatible.length > 0 ? (
            <LazyLoad offset={200}>
              <Box
                className={`${classes.comImage} ${classes.rightImg}`}
                component="img"
                src={
                  compatible?.[productIndex]?.get_products?.[0]
                    ?.get_all_image?.[0]?.image
                    ? BaseURL +
                      compatible?.[productIndex]?.get_products?.[0]
                        ?.get_all_image?.[0]?.image
                    : def
                }
                alt="compatible product"
                sx={(theme) => ({
                  cursor: "pointer",
                  width: "232.28px",
                  height: "257.59px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                })}
                onClick={() =>
                  compatible?.[productIndex]?.get_products?.[0]?.slug
                    ? navigate(
                        `/product-detail/` +
                          compatible?.[productIndex]?.get_products?.[0]?.slug
                      )
                    : {}
                }
              />
            </LazyLoad>
          ) : (
            <LazyLoad offset={200}>
              <Box
                className={`${classes.comImage} ${classes.rightImg}`}
                component="img"
                src={noComp}
                sx={(theme) => ({
                  cursor: "pointer",
                  width: "232.28px",
                  height: "257.59px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                })}
                alt="Not available"
              />
            </LazyLoad>
          )}
        </Stack>
        {compatible &&
        compatible.length > 0 &&
        compatible?.[productIndex] !== null ? (
          <Stack
            direction={{ xSmall: "row", stab: "column" }}
            alignItems="center"
            spacing={2}
            className={classes.buttonBox}
          >
            <Button
              variant="outlined"
              className={classes.addBtn}
              onClick={() =>
                handleAdd(compatible?.[productIndex]?.product_compatible_id)
              }
            >
              Add
            </Button>
            <Button
              variant="outlined"
              className={classes.cBtn}
              onClick={() => handleSkip()}
            >
              Skip
            </Button>
          </Stack>
        ) : null}
      </Box>
    </Box>
  );
};

export default CompatibleProduct;
