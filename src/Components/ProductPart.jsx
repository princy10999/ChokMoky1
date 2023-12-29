import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Stack,
  Rating,
} from "@mui/material";
import ProductSlider from "./ProductSlider";
import StyledButton1 from "./Common/StyledButton1";
import StyledButton2 from "./Common/StyledButton2";
import Counter from "./Common/Counter";
import { BsFacebook, BsLinkedin, BsPinterest, BsTwitter } from "react-icons/bs";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
} from "react-share";
import { useState } from "react";
import { ApiPost, BaseURL } from "../Api/Api";
// import Swal from "sweetalert2";
// import swal from "sweetalert";
import def from "../Assests/images/default.webp";
import {
  addToCart,
  addToCartTemp,
  addToWishlist,
  cartList,
  cartListTemp,
  coupanCode,
  getCount,
  getCountTemp,
  getWishlist,
  userDetails,
} from "../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAppSelector } from "../Redux/app/hooks";
import { isLoader } from "../Redux/Actions/loaderSlice";
import { SideBySideMagnifier } from "react-image-magnifiers";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const useStyles = makeStyles()((theme) => {
  return {
    gridContainer: {
      flexWrap: "nowrap",
      [theme.breakpoints.down("laptop")]: {
        flexWrap: "wrap",
      },
    },

    imgSlider: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    headingProduct: {
      fontFamily: "League Spartan, sans-serif",
      fontSize: "31px",
      fontWeight: "400",
      lineHeight: "39px",
      color: "#494A67",
      marginBottom: "6px",
      marginTop: "-5px",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "27px",
        lineHeight: "32px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "28px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "22px",
        lineHeight: "28px",
      },
      [theme.breakpoints.down("small")]: {
        fontSize: "20px",
        lineHeight: "26px",
      },
    },
    box: {
      display: "flex",
      [theme.breakpoints.down("mobile")]: {
        display: "block",
      },
    },
    priceSocial: {
      paddingBottom: "15px",
      borderBottom: "1px solid #E3E3E3",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("desktop")]: {
        marginBottom: "16px",
        paddingBottom: "3px",
      },
      [theme.breakpoints.down("iph")]: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
    },
    ProductImage: {
      display: "flex",
      position: "relative",
      height: "562px",
      paddingTop: "0px !important",
      paddingLeft: "0px !important",
      [theme.breakpoints.down("desktop")]: {
        height: "479px",
      },
      [theme.breakpoints.down("smallLaptop")]: {
        height: "490px",
      },
      [theme.breakpoints.down("laptop")]: {
        height: "540px",
      },
      [theme.breakpoints.down("tab")]: {
        height: "460px",
      },
      [theme.breakpoints.down("tab")]: {
        height: "520px",
      },
      [theme.breakpoints.down("iph")]: {
        height: "285px",
      },
      [theme.breakpoints.down("small")]: {
        height: "230px",
      },
    },
    productTxtCont: {
      paddingTop: "0px !important",
      paddingLeft: "30px !important",
      marginLeft: "42px !important",
      [theme.breakpoints.down("desktop")]: {
        paddingLeft: "13px !important",
      },
      [theme.breakpoints.down("laptop")]: {
        paddingTop: "30px !important",
        paddingLeft: "0px !important",
        marginLeft: "0px !important",
      },
      [theme.breakpoints.down("mobile")]: {
        paddingTop: "16px !important",
      },
    },
    price: {
      fontFamily: "League Spartan, sans-serif",
      fontSize: "30px",
      fontWeight: "500",
      lineHeight: "27.6px",
      color: "#3D3D47",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "27px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "26px",
        lineHeight: "26px",
      },
      [theme.breakpoints.down("small")]: {
        fontSize: "22px",
        lineHeight: "22px",
      },
    },
    priceline: {
      fontFamily: "League Spartan, sans-serif",
      fontSize: "20px",
      fontWeight: "500",
      lineHeight: "18.4px",
      color: "#787877",
      textDecoration: "line-through",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "19px",
      },
      [theme.breakpoints.down("small")]: {
        fontSize: "16px",
      },
    },
    textShare: {
      fontFamily: "League Spartan, sans-serif",
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "20px",
      color: "#2D2E30",
      textAlign: "center",
    },
    specificationHead: {
      fontFamily: "league spartan",
      fontSize: "21px",
      fontWeight: "400",
      lineHeight: "19.32px",
      color: "#5C5C63",
      marginBottom: "8px",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "18px",
        lineHeight: "18px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "18px",
        fontWeight: "400",
        lineHeight: "19.32px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "19.32px",
      },
    },
    specificationPera: {
      fontFamily: "league spartan",
      fontSize: "17px",
      fontWeight: "400",
      lineHeight: "25px",
      color: "#818183",
      marginBottom: "9px",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "16px",
        lineHeight: "21px",
        marginBottom: "7px",
      },
    },
    readBtn: {
      marginLeft: "10px",
      border: "none",
      background: "none",
      color: " #bd3d3d",
      fontWeight: "800",
    },
    specificationContent: {
      fontFamily: "league spartan",
      fontSize: "17px",
      fontWeight: "500",
      lineHeight: "29px",
      color: "#61616A",
      marginBottom: "7px",
      [theme.breakpoints.down("desktop")]: {
        marginBottom: "4px",
      },
    },
    specificationWeight2: {
      fontFamily: "league spartan",
      color: "#818183",
    },

    specificationSize: {
      fontFamily: "league spartan",
      fontWeight: 500,
    },
    specificationLength: {
      fontFamily: "league spartan",
      fontWeight: 500,
    },
    specificationWeight: {
      fontFamily: "league spartan",
      fontWeight: 500,
    },
    reviewCon: {
      fontFamily: "League Spartan, sans-serif",
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
      [theme.breakpoints.down("mobile")]: {
        flexWrap: "wrap",
        marginBottom: "10px",
      },
    },
    pinCodeBox: {
      marginBottom: "23px",
    },
    stars: {
      padding: " 0px 7px 0px 0px",
    },
    starImage: {
      marginTop: "5px",
      color: "#F87419",
    },
    productImages: {
      width: "calc(100% - 120px)",
      marginLeft: "18px",
      [theme.breakpoints.down("laptop")]: {
        marginLeft: "10px",
      },
      [theme.breakpoints.down("tab")]: {
        marginLeft: "10px",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "calc(100% - 100px)",
        marginLeft: "10px",
      },
    },
    boxCheck: {
      display: "flex",
      alignItems: "flex-start",
      // marginTop: '8px',
      [theme.breakpoints.down("mobile")]: {
        marginLeft: "0px !important",
        marginTop: "18px !important",
      },
      [theme.breakpoints.down("xiph")]: {
        marginLeft: "0px !important",
        marginTop: "18px !important",
      },
    },
    wishlistIcon: {
      zIndex: "100",
      position: "absolute",
      right: "0",
      margin: "20px 10px",
      cursor: "pointer",
      path: {
        stroke: "#BD3D3D",
      },
      "&:hover": {
        fill: "#BD3D3D",
      },
    },
    WishListSelect: {
      fill: "#BD3D3D",
    },
    review: {
      display: "flex",
    },
    reviewText: {
      color: "#858A8C",
      fontWeight: "400",
      fontSize: "14px",
      [theme.breakpoints.down("tab")]: {
        fontSize: "12px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "11px",
      },
    },
    reviewNum: {
      fontSize: "14px",
      color: "#2E3233",
      fontWeight: "600",

      [theme.breakpoints.down("tab")]: {
        fontSize: "12px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "11px",
      },
    },
    sideImg: {
      padding: "10px",
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

    helpText: {
      fontFamily: "League Spartan",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "14.72px",
      color: "#61616A",
      marginBottom: "23px",
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
    buttons: {
      display: "flex",
      width: "100%",
      [theme.breakpoints.down("mobile")]: {
        display: "block",
      },
    },
    buttons1: {
      marginRight: "1%",
      width: "49%",
      [theme.breakpoints.down("mobile")]: {
        marginRight: "0%",
        width: "100%",
      },
    },
    buttons2: {
      marginLeft: "1%",
      width: "49%",
      [theme.breakpoints.down("mobile")]: {
        marginLeft: "0%",
        marginTop: "2%",
        width: "100%",
      },
    },
    sosIco: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  };
});

const ProductPart = ({ data }) => {
  const userDetail = JSON.parse(localStorage.getItem("userData"));

  const userDetailsCon = useAppSelector(
    (state) => state?.auth?.isUserDetailsData?.userDetail?.result?.userData
  );
  const [showFullParagraph, setShowFullParagraph] = useState(false);
  const toggleShowFullParagraph = () => {
    setShowFullParagraph(!showFullParagraph);
  };

  const [counter, setCounter] = useState(1);

  let decrementCounter = () => {
    setCounter(counter - 1);
  };

  const incrementCounter = () => {
    if (data?.stock > counter) {
      setCounter(counter + 1);
    }
  };
  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
  }

  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pinCode, setPinCode] = useState(null);

  const [imageValue, setImageValue] = useState({
    alwaysInPlace: true,
    overlayOpacity: 0.5,
    switchSides: false,
    fillAvailableSpace: true,
    Magnifier: "zoom-in",
  });

  const [cartListFromApi, setCartListFromApi] = useState("");
  const [wishlistData, setWishlistData] = useState("");

  const [slideimg, setSlideimg] = useState();
  const togglecolor = (img) => {
    setSlideimg(img);
  };

  const checkItem =
    cartListFromApi &&
    cartListFromApi?.filter(
      (item) => item?.get_product_details?.id === data?.id
    );

  useEffect(() => {
    setSlideimg(
      data?.get_all_image?.[0]?.image
        ? BaseURL +
            data?.get_all_image?.filter((item) => item?.is_default === "Y")?.[0]
              ?.image
        : def
    );
  }, [data]);

  useEffect(() => {
    const body = {
      params: {
        session_id: sessionStorage.getItem("sessionId"),
      },
    };
    if (userDetail) {
      dispatch(getCount());
    } else {
      dispatch(getCountTemp(body));
    }
  }, []);

  useEffect(() => {
    (async () => {
      let body2 = {
        params: {
          coupon_code: "",
          session_id: sessionStorage.getItem("sessionId"),
        },
      };
      const response = await dispatch(
        userDetail ? cartList() : cartListTemp(body2)
      );
      if (response) {
        setCartListFromApi(response?.payload?.cartList?.[0]?.get_cart_details);
      }
      const body = {
        params: {
          page_no: 1,
          per_page: "",
        },
      };
      if (userDetailsCon) {
        const response2 = await dispatch(getWishlist(body));
        setWishlistData(response2?.payload);
      }
    })();
  }, []);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlePinCheck = () => {
    if (pinCode?.length === 6) {
      let data = {
        params: {
          pincode: pinCode,
        },
      };
      dispatch(isLoader(true));
      ApiPost("available-pincode", data).then((res) => {
        setSuccess(res?.data?.status === "Y");
        setError(res?.data?.status === "N");

        if (res?.data?.status === "Y") {
          setError({
            msg: "This product is available for this pin code.",
            key: true,
          });
          // swal({
          //   title: "Success",
          //   text: "This product is available for this pin code.",
          //   icon: "success",
          // });
        } else if (res?.data?.status === "N") {
          setError({ msg: "We do not deliver in this pin code", key: false });
          // swal({
          //   title: "Error",
          //   text: "Sorry! This product is  not available for this pin code.",
          //   icon: "error",
          // });
        }
        dispatch(isLoader(false));
      });
    } else {
      // swal({
      //   title: "Warning",
      //   text: "Please enter a pin code for product availability check!",
      //   icon: "warning",
      // });
    }
  };

  const addToCartWishlist = async () => {
    if (wishlistData?.product_id?.filter((e) => +e === data?.id)?.[0]) {
      Swal.fire({
        title: "<strong>Warning</strong>",
        icon: "warning",
        html: "Are you sure you want to remove this product from wishlist?",
        showCancelButton: true,
        confirmButtonColor: "#BD3D3D",
        iconColor: "#BD3D3D",
        confirmButtonText: "Yes",
        cancelButtonColor: "#1A1B2F",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const body = {
            params: {
              product_id: data?.id,
              currency_code: "IN",
            },
          };
          const response = await dispatch(addToWishlist(body));
          if (response?.payload?.result?.status?.meaning) {
            // swal({
            //   title: "Success",
            //   text: response?.payload?.result?.status?.meaning,
            //   icon: "success",
            // });
            if (userDetail) {
              dispatch(getCount());
            }
            const body = {
              params: {
                page_no: 1,
                per_page: "",
                session_id: sessionStorage.getItem("sessionId"),
              },
            };
            if (userDetailsCon) {
              const response2 = await dispatch(getWishlist(body));
              setWishlistData(response2?.payload);
            }
          } else {
            swal({
              title: "Warning",
              text: response?.payload?.error?.meaning,
              icon: "warning",
            });
          }
        }
      });
    } else {
      const body = {
        params: {
          product_id: data?.id,
          currency_code: "IN",
        },
      };
      const response = await dispatch(addToWishlist(body));
      if (response?.payload?.result?.status?.meaning) {
        // swal({
        //   title: "Success",
        //   text: response?.payload?.result?.status?.meaning,
        //   icon: "success",
        // });
        if (userDetail) {
          dispatch(getCount());
        }
        const body = {
          params: {
            page_no: 1,
            per_page: "",
            session_id: sessionStorage.getItem("sessionId"),
          },
        };
        if (userDetailsCon) {
          const response2 = await dispatch(getWishlist(body));
          setWishlistData(response2?.payload);
        }
      } else {
        swal({
          title: "Warning",
          text: response?.payload?.error?.meaning,
          icon: "warning",
        });
      }
    }
  };

  const addToCartProduct = async () => {
    dispatch(isLoader(true));
    const body = {
      params: {
        product_id: data?.id,
        currency_code: "IN",
        quantity: counter,
      },
    };
    const removeBody = {
      params: {
        cart_details_id: checkItem?.[0]?.id,
      },
    };
    const response = await dispatch(addToCart(body));
    if (response?.payload?.result?.status?.meaning) {
      let body2 = {
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
      // });
      const response2 = await dispatch(cartList());
      if (response2) {
        setCartListFromApi(response2?.payload?.cartList?.[0]?.get_cart_details);
      }
      if (userDetail) {
        dispatch(getCount());
        dispatch(isLoader(false));
      }
    } else {
      dispatch(isLoader(false));
      // swal({
      //   title: "Warning",
      //   text: response?.payload?.error?.meaning,
      //   icon: "warning",
      // });
    }
  };

  const addToCartProductTemp = async () => {
    dispatch(isLoader(true));
    const body = {
      params: {
        product_id: data?.id,
        currency_code: "IN",
        quantity: 1,
        session_id: sessionStorage.getItem("sessionId"),
      },
    };
    const removeBody = {
      params: {
        cart_details_id: checkItem?.[0]?.id,
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
        dispatch(isLoader(false));
      }
      dispatch(isLoader(false));
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
    if (!pinCode) {
      setError({ msg: "" });
    }
  }, [pinCode]);
  return (
    <div>
      <Box className={classes.ProductPart}>
        <Grid
          container
          columns={{ xSmall: 12 }}
          className={classes.gridContainer}
        >
          <Grid
            item
            xSmall={12}
            tab={7}
            laptop={6}
            className={classes.ProductImage}
            // id="product-image"
          >
            <ProductSlider togglecolor={togglecolor} data={data} />
            <Box className={classes.productImages}>
              <div id="product-image">
                {slideimg && (
                  <SideBySideMagnifier
                    className="input-position overflow-hidden"
                    imageSrc={slideimg}
                    cursorStyle={imageValue?.Magnifier}
                    alwaysInPlace={imageValue?.alwaysInPlace}
                    overlayOpacity={imageValue?.overlayOpacity}
                    switchSides={imageValue?.switchSides}
                    zoomPosition="right"
                    inPlaceMinBreakpoint={100}
                    fillAvailableSpace={imageValue?.fillAvailableSpace}
                  />
                )}
              </div>
            </Box>
            <Box
              onClick={() =>
                userDetail ? addToCartWishlist() : navigate("/login")
              }
            >
              <svg
                className={`${classes.wishlistIcon} ${
                  wishlistData?.product_id?.filter((e) => +e === data?.id)?.[0]
                    ? classes.WishListSelect
                    : ""
                }`}
                width="25"
                height="25"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.235 2.03375C17.7881 1.58663 17.2575 1.23194 16.6734 0.989948C16.0894 0.747956 15.4634 0.623403 14.8313 0.623403C14.1991 0.623403 13.5731 0.747956 12.9891 0.989948C12.405 1.23194 11.8744 1.58663 11.4275 2.03375L10.5 2.96125L9.5725 2.03375C8.66977 1.13102 7.4454 0.623871 6.16875 0.623871C4.8921 0.623871 3.66773 1.13102 2.765 2.03375C1.86227 2.93648 1.35512 4.16085 1.35512 5.4375C1.35512 6.71415 1.86227 7.93852 2.765 8.84125L3.6925 9.76875L10.5 16.5762L17.3075 9.76875L18.235 8.84125C18.6821 8.39434 19.0368 7.86371 19.2788 7.27969C19.5208 6.69566 19.6453 6.06968 19.6453 5.4375C19.6453 4.80532 19.5208 4.17934 19.2788 3.59531C19.0368 3.01129 18.6821 2.48066 18.235 2.03375V2.03375Z"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Box>
          </Grid>
          <Grid
            item
            xSmall={12}
            tab={5}
            laptop={6}
            className={classes.productTxtCont}
          >
            <Box className={classes.ProductText}>
              <Typography component="h6" className={classes.headingProduct}>
                {data?.title}
              </Typography>
              <Box component="div" className={classes.reviewCon}>
                <Box component="div" className={classes.stars}>
                  <Rating
                    className={classes.starImage}
                    name="read-only"
                    value={data?.average_rating ? data?.average_rating : 0}
                    readOnly
                    precision={0.1}
                  />
                </Box>
                <Box component="div" className={classes.review}>
                  {/* <Typography component="p" className={classes.reviewNum}>
                    ({data?.average_rating})
                  </Typography> */}
                  <Typography component="p" className={classes.reviewText}>
                    {data?.total_reviews}{" "}
                    {data?.total_reviews <= 1 ? "Review" : "Reviews"}
                  </Typography>
                </Box>
              </Box>

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                className={classes.priceSocial}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  className={classes.priceText}
                >
                  <Typography component="p" className={classes.price}>
                    {`₹${
                      data?.get_product_ind_price?.after_discount_price
                        ? JSON.parse(
                            data?.get_product_ind_price?.after_discount_price
                          ).toFixed(2)
                        : 0.0
                    }/-`}
                  </Typography>
                  {data?.get_product_ind_price?.price !==
                    data?.get_product_ind_price?.after_discount_price &&
                    (data?.get_product_ind_price?.global_offer_applied ===
                      "Y" ||
                      data?.get_product_ind_price?.offer_applied === "Y") && (
                      <Typography component="p" className={classes.priceline}>
                        ₹
                        {data?.get_product_ind_price?.price
                          ? JSON.parse(
                              data?.get_product_ind_price?.price
                            ).toFixed(2)
                          : 0.0}
                      </Typography>
                    )}
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  className={classes.socialIcon}
                  sx={{
                    marginLeft: "0px !important",
                    marginTop: "4px !important",
                  }}
                >
                  {" "}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    className={classes.shareIcon}
                  >
                    <ShareOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#696969" }}
                    />

                    <Typography component="p" className={classes.textShare}>
                      Share :
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className={classes.socialImg}
                  >
                    <Typography component="p" className={classes.socialContent}>
                      <Box className={classes.sosIco} component="div">
                        <FacebookShareButton url={window.location.href}>
                          <BsFacebook
                            color="#3b5998"
                            size={22}
                            className="sos-ico"
                          />
                        </FacebookShareButton>
                        <TwitterShareButton url={window.location.href}>
                          <BsTwitter
                            color="#fff"
                            size={23}
                            className="sos-ico twitt"
                          />
                        </TwitterShareButton>
                        <PinterestShareButton url={window.location.href}>
                          <BsPinterest
                            color="#C8232C"
                            size={22}
                            className="sos-ico"
                          />
                        </PinterestShareButton>
                        <LinkedinShareButton url={window.location.href}>
                          <BsLinkedin
                            color="#0072B1"
                            size={22}
                            style={{ borderRadius: "50%" }}
                            className="sos-ico"
                          />
                        </LinkedinShareButton>
                      </Box>
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Typography component="h5" className={classes.specificationHead}>
                Specification:
              </Typography>
              <Typography component="p" className={classes.specificationPera}>
                {!showFullParagraph && data?.description.length > 135
                  ? data?.description?.substring(0, 135) + "..."
                  : data?.description}
                <button
                  className={classes.readBtn}
                  onClick={toggleShowFullParagraph}
                >
                  {data?.description.length > 201 && (
                    <Box component="span" sx={{ cursor: "pointer" }}>
                      {showFullParagraph ? "Read Less" : "Read More"}
                    </Box>
                  )}
                </button>
              </Typography>

              <Stack
                direction="row"
                alignItems="flex-start"
                spacing={1}
                className={classes.specificationContent}
              >
                <Typography
                  component="p"
                  className={classes.specificationWeight}
                >
                  Gross Weight(gm) :
                </Typography>
                <Typography
                  component="p"
                  className={classes.specificationWeight2}
                >
                  {data?.gross_weight}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                spacing={1}
                className={classes.specificationContent}
              >
                <Typography component="p" className={classes.specificationSize}>
                  Size(mm):
                </Typography>
                <Typography
                  component="p"
                  className={`${classes.specificationSize2} ${classes.specificationWeight2}`}
                >
                  {data?.size}
                </Typography>
                <Typography component="p" className={classes.specificationSize}>
                  | Units:
                </Typography>
                <Typography
                  component="p"
                  className={`${classes.specificationSize2} ${classes.specificationWeight2}`}
                >
                  {data?.stock}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-start"
                spacing={1}
                className={classes.specificationContent}
              >
                <Typography
                  component="p"
                  className={classes.specificationLength}
                >
                  Length(cm):
                </Typography>
                <Typography
                  component="p"
                  className={`${classes.specificationLength2} ${classes.specificationWeight2}`}
                >
                  {data?.length}
                </Typography>
                <Typography
                  component="p"
                  className={classes.specificationLength}
                >
                  | Breadth(cm):
                </Typography>
                <Typography
                  component="p"
                  className={`${classes.specificationLength2} ${classes.specificationWeight2}`}
                >
                  {data?.breadth}
                </Typography>
              </Stack>
              <Stack
                // direction="row"
                alignItems="flex-start"
                // spacing={2.3}
                className={classes.pinCodeBox}
                sx={(theme) => ({
                  paddingTop: "23px",
                  [theme.breakpoints.down("desktop")]: {
                    paddingTop: "13px",
                  },
                  [theme.breakpoints.down("xiph")]: {
                    flexDirection: "column",
                  },
                })}
              >
                <Box className={classes.box}>
                  <Counter
                    decrementCounter={decrementCounter}
                    incrementCounter={incrementCounter}
                    counter={counter}
                  />
                  <Box className={classes.boxCheck} marginLeft="10px">
                    <TextField
                      type="number"
                      id="outlined-helperText"
                      label="Enter Delivery Pincode"
                      size="small"
                      className={classes.textField}
                      helperText={
                        pinCode ? "" : "Enter pincode for product availability"
                      }
                      onChange={(e) => setPinCode(e.target.value)}
                      value={pinCode}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 6);
                      }}
                      min={0}
                    />

                    <Box
                      component={Link}
                      to="#"
                      className={classes.checkText}
                      onClick={handlePinCheck}
                    >
                      Check
                    </Box>
                  </Box>
                </Box>
                {pinCode && (
                  <Typography sx={{ color: `${error?.key ? "green" : "red"}` }}>
                    {error?.msg}
                  </Typography>
                )}
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                className={classes.pinCodeBox}
              >
                <Box className={classes.buttons}>
                  {data?.stock <= 0 ? (
                    <Box className={classes.buttons1}>
                      <StyledButton1
                        disabled={true}
                        text="Out of stock"
                        link="#"
                      />
                    </Box>
                  ) : (
                    <>
                      <Box
                        className={classes.buttons1}
                        onClick={() =>
                          userDetail
                            ? addToCartProduct()
                            : addToCartProductTemp()
                        }
                      >
                        <StyledButton1 text="Add to cart" link="#" />
                      </Box>
                      <Box
                        className={classes.buttons2}
                        onClick={() =>
                          userDetail
                            ? addToCartProduct()
                            : addToCartProductTemp()
                        }
                      >
                        <StyledButton2 text="Buy Now" />
                      </Box>
                    </>
                  )}
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductPart;
