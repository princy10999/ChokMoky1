import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Grid, Rating } from "@mui/material";
// import starActive from "../../Assests/images/Star-active.webp";
// import starAsh from "../../Assests/images/Star-ash.webp";
import { RiDeleteBinLine } from "react-icons/ri";
// import def from "../../Assests/images/default3.webp";
import noRecord from "../../Assests/images/no-record.webp";
import {
  addToWishlist,
  getCount,
  getWishlist,
  userDetails,
} from "../../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { BaseURL } from "../../Api/Api";
import { useAppSelector } from "../../Redux/app/hooks";
import { useEffect } from "react";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    cont: {
      ".WishListC": {
        display: "none",
      },
      "&:hover .WishListC": {
        display: "flex",
      },
    },
    cardLayout: {
      margin: "5rem 0rem 1rem 0rem",
      padding: "0rem  5rem",
      [theme.breakpoints.down("laptop")]: {
        margin: "3rem  0rem 1rem 0",
      },
      [theme.breakpoints.down("tab")]: {
        padding: "0rem  3rem",
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "0rem  1rem",
        margin: "1rem 0rem",
      },
    },
    imgContainer: {
      position: "relative",
      overflow: "hidden",
    },
    WishListSelect: {
      backgroundColor: "#BD3D3D !important",
      "svg path": {
        stroke: "#fff !important",
      },
      svg: {
        fill: "#BD3D3D !important",
      },
    },
    WishListC: {
      display: "none",
      position: "absolute",
      top: "0px",
      right: "0px",
      backgroundColor: "white",
      borderRadius: "20px",
      // display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "10px",
      padding: "10px",

      cursor: "pointer",
      [theme.breakpoints.down("iph")]: {
        padding: "7px",
        margin: "6px",
      },
      "&:hover": {
        backgroundColor: "#BD3D3D",
        "svg path": {
          stroke: "#fff",
        },
        svg: {
          fill: "#BD3D3D",
        },
      },
    },
    WishListD: {
      display: "none",
      position: "absolute",
      top: "0px",
      right: "0px",
      backgroundColor: "white",
      borderRadius: "20px",
      // display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "10px",
      padding: "10px",

      cursor: "pointer",
      [theme.breakpoints.down("iph")]: {
        padding: "7px",
        margin: "6px",
      },
      "&:hover": {
        backgroundColor: "#BD3D3D",
        "svg path": {
          stroke: "#fff",
        },
        svg: {
          fill: "#fff",
        },
      },
    },
    WishListD: {
      position: "absolute",
      top: "0px",
      right: "0px",
      backgroundColor: "white",
      borderRadius: "20px",
      // display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "10px",
      padding: "10px",

      cursor: "pointer",
      [theme.breakpoints.down("iph")]: {
        padding: "7px",
        margin: "6px",
      },
      "&:hover": {
        backgroundColor: "#BD3D3D",
        "svg path": {
          stroke: "#fff",
        },
        svg: {
          fill: "#fff",
        },
      },
    },
    displayNone: {
      display: "none",
    },

    saleC: {
      position: "absolute",
      left: "0px",
    },
    textContainer: {
      margin: "0.6rem 0rem 2rem 0rem",
      [theme.breakpoints.down("mobile")]: {
        margin: "8px 0px",
      },
      [theme.breakpoints.down("mobile")]: {
        margin: "0.2rem 0rem",
      },
    },
    stars: {
      display: "flex",
      padding: " 0px 7px 0px 0px",
    },
    review: {
      display: "flex",
      alignItems: "center",
      marginTop: "5px",
    },
    reviewCon: {
      fontFamily: "League Spartan, sans-serif",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      [theme.breakpoints.down("mobile")]: {
        flexWrap: "wrap",
      },
    },
    reviewText: {
      color: "#858A8C",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "25px",
      fontFamily: "Noto Sans",
      paddingLeft: "5px",
      whiteSpace: "nowrap",
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
      lineHeight: "25px",
      fontWeight: "600",
      fontFamily: "Noto Sans",

      [theme.breakpoints.down("tab")]: {
        fontSize: "12px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "11px",
      },
    },
    headingProduct: {
      fontFamily: "league spartan, sans-serif",
      // fontSize: "19px",
      // lineHeight:1,
      color: "#2F2F2D",
      fontWeight: "400",
      marginTop: "16px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "21px",
        lineHeight: "22px",
        marginTop: "8px",
      },
      [theme.breakpoints.down("laptop")]: {
        fontSize: "18px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "16px",
        lineHeight: "18px",
        marginTop: "7px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "14px",
      },
    },
    starImage: {
      marginTop: "5px",
      color: "#F87419",
      svg: {
        width: "18px",
        height: "18px",
      },
    },
    productText: {
      fontFamily: "Nunito, sans-serif",
      fontSize: "17px",
      lineHeight: "25px",
      color: "#858A8C",
      fontWeight: "400",
      marginTop: "11px",
      overflow: "hidden",
      // whiteSpace: "nowrap",
      // textOverflow: "ellipsis",
      [theme.breakpoints.down("desktop")]: {
        marginTop: "8px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "15px",
        lineHeight: "22px",
        marginTop: "5px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "13px",
        marginTop: "0px",
      },
    },
    priceText: {
      marginTop: "16px",
      fontWeight: "400",
      [theme.breakpoints.down("desktop")]: {
        marginTop: "8px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "15px",
        marginTop: "6px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "13px",
        marginTop: "0px",
      },
    },
    priceline: {
      color: "#787877",
      textDecoration: " line-through",
      fontSize: "17px",
      wordBreak: " break-all",
      lineHeight: "21.34px",
      fontFamily: "League Spartan",
      fontWeight: 400,
      [theme.breakpoints.down("tab")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "13px",
      },
    },
    price: {
      color: "#2F2F2D",
      fontSize: "17px",
      fontWeight: 600,
      wordBreak: " break-all",
      lineHeight: "21.34px",
      fontWeight: 600,
      fontFamily: "League Spartan",
      [theme.breakpoints.down("tab")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "13px",
      },
    },
    imgSpan: {
      width: "100%",
      height: "365px",
      background: "#f2eeee75",
      overflow: "hidden",
      display: "inline-block",
      [theme.breakpoints.down("desktop")]: {
        height: "240px",
      },
      // [theme.breakpoints.down("tab")]: {
      //   maxHeight: "266px",
      // },
      [theme.breakpoints.down("mobile")]: {
        height: "137px",
      },
    },
    cardImage: {
      transition: "all 0.5s ease-in-out",
      "&:hover": {
        transform: "scale(1.2)",
      },
      // maxHeight: '100%',
      // height: '100%',
      // maxWidth: '100%',
      width: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      margin: "auto",
      // maxHeight: "246px",
      // [theme.breakpoints.down("desktop")]: {
      //   maxHeight: "200px",
      // },
      // // [theme.breakpoints.down("tab")]: {
      // //   maxHeight: "266px",
      // // },
      // [theme.breakpoints.down("mobile")]: {
      //   maxHeight: "137px",
      // },
    },
    noRec: {
      width: "22em",
      height: "15em",
      margin: "10px auto",
      [theme.breakpoints.down("iph")]: {
        width: "15em",
        height: "10em",
        margin: "0px auto",
      },
    },
  };
});

const Collectioncard = ({
  cardData,
  fontSize,
  lineHeight,
  loader,
  type,
  updateData,
}) => {
  const userDetail = useAppSelector(
    (state) => state?.auth?.isUserDetailsData?.userDetail?.result?.userData
  );

  const { classes } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [wishlistData, setWishlistData] = useState("");

  const userDetailsCon = useAppSelector(
    (state) => state?.auth?.isUserDetailsData?.userDetail?.result?.userData
  );
  useEffect(() => {
    if (userDetailsCon) {
      dispatch(userDetails());
    }
  }, []);

  useEffect(() => {
    (async () => {
      const body = {
        params: {
          page_no: 1,
          per_page: "",
        },
      };
      if (userDetailsCon) {
        const response = await dispatch(getWishlist(body));
        setWishlistData(response?.payload);
      }
    })();
  }, []);

  const addRessto = async (item) => {
    const body = {
      params: {
        product_id: item?.id,
        currency_code: "IN",
      },
    };
    const response = await dispatch(addToWishlist(body));
    if (response?.payload?.result?.status?.meaning) {
      // swal({
      //   title: "Success",
      //   text: response?.payload?.result?.status
      //     ?.meaning,
      //   icon: "success",
      // });
      dispatch(getCount());
      const body = {
        params: {
          page_no: 1,
          per_page: 6,
        },
      };
      if (userDetailsCon) {
        const response2 = await dispatch(getWishlist(body));
        setWishlistData(response2?.payload);
        updateData(response2?.payload?.productDetails);
      }
    } else {
      swal({
        title: "Warning",
        text: response?.payload?.error?.meaning,
        icon: "warning",
      });
    }
  };

  const addToWishlistCart = async (item) => {
    const body = {
      params: {
        product_id: item?.id,
        currency_code: "IN",
      },
    };
    const response = await dispatch(addToWishlist(body));
    if (response?.payload?.result?.status?.meaning) {
      // swal({
      //   title: "Success",
      //   text: response?.payload?.result?.status
      //     ?.meaning,
      //   icon: "success",
      // });
      dispatch(getCount());
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
    } else {
      // swal({
      //   title: "Warning",
      //   text: response?.payload?.error?.meaning,
      //   icon: "warning",
      // });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  return (
    <>
      {cardData && cardData.length > 0 ? (
        <>
          {cardData?.map((item, index) => (
            <Grid item xSmall={2} mobile={4} laptop={4} key={index}>
              <Box
                disableGutters
                sx={{ cursor: "pointer" }}
                className={classes.cont}
              >
                <Box component="div" className={classes.imgContainer}>
                  <Box component={"span"} className={classes.imgSpan}>
                    {/* <Box
                      onClick={() => navigate(`/product-detail/` + item?.slug)}
                      className={classes.cardImage}
                      component="img"
                      src={
                        item?.get_defult_image?.image
                          ? BaseURL + item?.get_defult_image?.image
                          : null
                      }
                      alt="product"
                      sx={(theme) => ({
                        width: "100%",
                        maxWidth: "100%",
                      })}
                    /> */}
                    <LazyLoad offset={200}>
                      <Box
                        onClick={() =>
                          navigate(`/product-detail/` + item?.slug)
                        }
                        className={classes.cardImage}
                        component="img"
                        src={
                          item?.get_defult_image?.image
                            ? BaseURL + item?.get_defult_image?.image
                            : null
                        }
                        alt="product"
                        sx={(theme) => ({
                          width: "100%",
                          maxWidth: "100%",
                        })}
                      />
                    </LazyLoad>
                  </Box>
                  {/* {(location?.pathname === "/search" ||
                    location?.pathname.split("/")?.[1] === "category" ||
                    location?.pathname.split("/")?.[1] === "artist") && (
                      <Box
                        className={classes.saleC}
                        component="img"
                        src={sale}
                        alt="sale"
                        sx={(theme) => ({
                          width: "auto",
                          height: "auto",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          top: "1rem",
                          [theme.breakpoints.down("tab")]: {
                            width: "55px",
                            top: "12px",
                          },
                        })}
                      />
                    )} */}

                  {/* {(location?.pathname === "/search" ||
                    location?.pathname.split("/")?.[1] === "category" ||
                    location?.pathname.split("/")?.[1] === "artist") && (
                      <Box
                        component="div"
                        className={`${classes.WishListC} WishListC`}
                      >
                        <svg
                          width="21"
                          height="18"
                          viewBox="0 0 21 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.235 2.03375C17.7881 1.58663 17.2575 1.23194 16.6734 0.989948C16.0894 0.747956 15.4634 0.623403 14.8313 0.623403C14.1991 0.623403 13.5731 0.747956 12.9891 0.989948C12.405 1.23194 11.8744 1.58663 11.4275 2.03375L10.5 2.96125L9.5725 2.03375C8.66977 1.13102 7.4454 0.623871 6.16875 0.623871C4.8921 0.623871 3.66773 1.13102 2.765 2.03375C1.86227 2.93648 1.35512 4.16085 1.35512 5.4375C1.35512 6.71415 1.86227 7.93852 2.765 8.84125L3.6925 9.76875L10.5 16.5762L17.3075 9.76875L18.235 8.84125C18.6821 8.39434 19.0368 7.86371 19.2788 7.27969C19.5208 6.69566 19.6453 6.06968 19.6453 5.4375C19.6453 4.80532 19.5208 4.17934 19.2788 3.59531C19.0368 3.01129 18.6821 2.48066 18.235 2.03375V2.03375Z"
                            stroke="black"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Box>
                    )} */}

                  {(location?.pathname === "/search" ||
                    location?.pathname === "/" ||
                    location?.pathname.split("/")?.[1] === "category" ||
                    location?.pathname.split("/")?.[1] === "artist") && (
                    <Box
                      onClick={() =>
                        userDetail
                          ? addToWishlistCart(item)
                          : navigate("/login")
                      }
                      component="div"
                      className={`${classes.WishListC} WishListC ${
                        wishlistData?.product_id?.filter(
                          (e) => +e === item.id
                        )?.[0]
                          ? classes.WishListSelect
                          : ""
                      }`}
                    >
                      <svg
                        width="21"
                        height="18"
                        viewBox="0 0 21 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.235 2.03375C17.7881 1.58663 17.2575 1.23194 16.6734 0.989948C16.0894 0.747956 15.4634 0.623403 14.8313 0.623403C14.1991 0.623403 13.5731 0.747956 12.9891 0.989948C12.405 1.23194 11.8744 1.58663 11.4275 2.03375L10.5 2.96125L9.5725 2.03375C8.66977 1.13102 7.4454 0.623871 6.16875 0.623871C4.8921 0.623871 3.66773 1.13102 2.765 2.03375C1.86227 2.93648 1.35512 4.16085 1.35512 5.4375C1.35512 6.71415 1.86227 7.93852 2.765 8.84125L3.6925 9.76875L10.5 16.5762L17.3075 9.76875L18.235 8.84125C18.6821 8.39434 19.0368 7.86371 19.2788 7.27969C19.5208 6.69566 19.6453 6.06968 19.6453 5.4375C19.6453 4.80532 19.5208 4.17934 19.2788 3.59531C19.0368 3.01129 18.6821 2.48066 18.235 2.03375V2.03375Z"
                          stroke="black"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Box>
                  )}
                  {location?.pathname === "/wishlist" && (
                    <Box
                      component="div"
                      className={`${classes.WishListD} WishListC`}
                      onClick={() => addRessto(item)}
                    >
                      <RiDeleteBinLine size="19px" color="#787877" />
                    </Box>
                  )}
                </Box>

                <Box component="div" className={classes.textContainer}>
                  <Box component="div" className={classes.reviewCon}>
                    <Box component="div" className={classes.reviewCon}>
                      <Box component="div" className={classes.stars}>
                        <Rating
                          className={classes.starImage}
                          name="read-only"
                          value={
                            item?.average_rating ? item?.average_rating : 0
                          }
                          readOnly
                          precision={0.1}
                        />
                      </Box>
                      <Box component="div" className={classes.review}>
                        {/* <Typography component="p" className={classes.reviewNum}>
                          ({item?.average_rating})
                        </Typography> */}
                        <Typography
                          component="p"
                          className={classes.reviewText}
                        >
                          {item?.total_reviews}{" "}
                          {item?.total_reviews <= 1 ? "Review" : "Reviews"}
                        </Typography>
                      </Box>
                    </Box>
                    {/* <Box component="div" className={classes.stars}>
                      <Box
                        className={classes.starImage}
                        component="img"
                        src={starActive}
                        alt="rating"
                        sx={(theme) => ({
                          width: "auto",
                          height: "auto",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        })}
                      />

                      <Box
                        className={classes.starImage}
                        component="img"
                        src={starActive}
                        alt="rating"
                        sx={(theme) => ({
                          width: "auto",
                          height: "auto",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        })}
                      />

                      <Box
                        className={classes.starImage}
                        component="img"
                        src={starActive}
                        alt="rating"
                        sx={(theme) => ({
                          width: "auto",
                          height: "auto",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        })}
                      />
                      <Box
                        className={classes.starImage}
                        component="img"
                        src={starActive}
                        alt="rating"
                        sx={(theme) => ({
                          width: "auto",
                          height: "auto",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        })}
                      />
                      <Box
                        className={classes.starImage}
                        component="img"
                        src={starAsh}
                        alt="rating"
                        sx={(theme) => ({
                          width: "auto",
                          height: "auto",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        })}
                      />
                    </Box> */}
                    {/* <Box component="div" className={classes.review}>
                      <Typography component="p" className={classes.reviewNum}>
                        (4.0)
                      </Typography>
                      <Typography component="p" className={classes.reviewText}>
                      {data?.total_reviews} {data?.total_reviews <= 1 ? "Review" : "Reviews"}
                      </Typography>
                    </Box> */}
                  </Box>
                  <Box
                    onClick={() =>
                      type === "NewArrivalCard"
                        ? {}
                        : navigate(`/product-detail/` + item?.slug)
                    }
                  >
                    {" "}
                    <Typography
                      component="h6"
                      className={classes.headingProduct}
                      sx={{ fontSize: fontSize, lineHeight: lineHeight }}
                    >
                      {item?.title}
                    </Typography>
                  </Box>
                  <Typography component="p" className={classes.productText}>
                    {item?.description.substr(0, 32) + "..."}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    className={classes.priceText}
                  >
                    {item?.get_product_ind_price?.price !==
                      item?.get_product_ind_price?.after_discount_price &&
                      (item?.get_product_ind_price?.global_offer_applied ===
                        "Y" ||
                        item?.get_product_ind_price?.offer_applied === "Y") && (
                        <Typography component="p" className={classes.priceline}>
                          ₹
                          {parseFloat(
                            item?.get_product_ind_price?.price
                          ).toFixed(2)}
                        </Typography>
                      )}
                    <Typography component="p" className={classes.price}>
                      ₹
                      {parseFloat(
                        item?.get_product_ind_price?.after_discount_price
                      ).toFixed(2)}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </>
      ) : (
        <>
          {!loader && (
            <Box component="img" src={noRecord} className={classes.noRec} />
          )}
        </>
      )}
    </>
  );
};

export default Collectioncard;
