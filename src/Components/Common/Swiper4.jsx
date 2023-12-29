import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import def from "../../Assests/images/default.webp";
import line from "../../Assests/images/line.webp";
import { makeStyles } from "tss-react/mui";
import Aos from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Link, useNavigate } from "react-router-dom";
import { BaseURL } from "../../Api/Api";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    item: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      height: "100%",
      paddingBottom: "18px",
    },
    collbox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    collImg: {
      width: "98%",
      height: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      transition: "all 0.5s ease-in-out",
      [theme.breakpoints.down("mobile")]: {
        height: "150px",
      },
    },
    colImgimg: {
      width: "100%",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      transition: "all 0.5s ease-in-out",
      "&:hover": {
        transform: "scale(1.2)",
      },
    },

    text: {
      fontFamily: "Playfair Display",
      color: "#494A5A",
      fontSize: "22px",
      fontWeight: 400,
      textAlign: "center",
      marginTop: "10px",
      [theme.breakpoints.down("xDesktop")]: {
        fontSize: "21px",
      },
      [theme.breakpoints.down("laptop")]: {
        fontSize: "16px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "17px",
      },
      // [theme.breakpoints.down("mobile")]: {
      //   fontSize: "1px",
      // },
    },
    price: {
      fontFamily: "nunito",
      color: "#9D9B9B",
      fontSize: "16px",
      lineHeight: "21.82px",
      fontWeight: 400,
      textAlign: "center",
      marginRight: 5,
      textDecorationLine: "line-through",
      [theme.breakpoints.down("tab")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "12px",
      },
    },
    paid_price: {
      fontFamily: "nunito",
      color: "#BD3D3D",
      lineHeight: "27.28px",
      fontSize: "20px",
      fontWeight: 600,
      textAlign: "center",
      [theme.breakpoints.down("tab")]: {
        fontSize: "18px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "14px",
      },
    },
    colImgimg2: {
      zIndex: "9999",
      position: "absolute",
      // bottom: "64px",
      top: "261px",
      [theme.breakpoints.down("laptop")]: {
        // bottom: "56px",
        top: "260px",
      },
      [theme.breakpoints.down("mobile")]: {
        // bottom: "58px",
        top: "110px",
      },
    },
    swiper: {
      padding: "22px 30px",
      paddingTop: "54px",
      ".swiper-button-next": {
        top: "45%",
        right: 0,
        color: "#BD3D3D",
        [theme.breakpoints.down("mobile")]: {
          "&::after": {
            fontSize: "25px !important",
          },
        },
      },
      ".swiper-button-prev": {
        top: "45%",
        left: 0,
        color: "#BD3D3D",
        [theme.breakpoints.down("mobile")]: {
          "&::after": {
            fontSize: "25px !important",
          },
        },
      },
      [theme.breakpoints.down("mobile")]: {
        padding: 10,
        paddingTop: "54px",
        ".swiper-button-next": {
          top: "40%",
          right: 11,
        },
        ".swiper-button-prev": {
          top: "40%",
          left: 11,
        },
      },
    },
    colbut: {
      marginTop: "20px",
    },
  };
});

const Swiper4 = ({ data }) => {
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Swiper
      breakpoints={{
        "@0": {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        "@1.00": {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        "@1.50": {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
      loop={true}
      speed={2000}
      // autoplay={{
      //   delay: 500,
      //   pauseOnMouseEnter: true,
      //   disableOnInteraction: false,
      // }}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className={classes?.swiper}
    >
      {data?.length !== 0 &&
        data?.map((item, index) => (
          <SwiperSlide>
            <Box
              component="div"
              className={cx(classes.item)}
              key={index}
              onClick={() => navigate(`/product-detail/` + item?.slug)}
            >
              <Box component={Link} to="#" className={classes.collbox}>
                <Box component="div" className={classes.collImg}>
                  <LazyLoad offset={200}>
                    <Box
                      component="img"
                      className={classes.colImgimg}
                      src={
                        item.get_all_image?.[0]?.image
                          ? BaseURL + item.get_all_image?.[0]?.image
                          : item?.get_defult_image?.image
                          ? BaseURL + item?.get_defult_image?.image
                          : def
                      }
                      alt="product"
                    />
                  </LazyLoad>
                  {/* <LazyLoad offset={200}> */}
                    <Box
                      component="img"
                      className={classes.colImgimg2}
                      src={line}
                      alt="line"
                    />
                  {/* </LazyLoad> */}
                </Box>
                <Box className={classes.colbut}>
                  {item?.text && (
                    <Typography className={classes.text}>
                      {item?.text?.substr(0, 20) + "..."}
                    </Typography>
                  )}
                  {item?.title && (
                    <Typography className={classes.text}>
                      {item?.title?.substr(0, 20) + "..."}
                    </Typography>
                  )}
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {item?.get_product_ind_price?.price !==
                      item?.get_product_ind_price?.after_discount_price &&
                      (item?.get_product_ind_price?.global_offer_applied ===
                        "Y" ||
                        item?.get_product_ind_price?.offer_applied === "Y") && (
                        <Typography component="p" className={classes.price}>
                          ₹
                          {item?.get_product_ind_price?.price
                            ? JSON.parse(
                                item?.get_product_ind_price?.price
                              ).toFixed(2)
                            : 0.0}
                        </Typography>
                      )}
                    <Typography className={classes.paid_price}>
                      {`₹${
                        item?.get_product_ind_price?.after_discount_price
                          ? JSON.parse(
                              item?.get_product_ind_price?.after_discount_price
                            ).toFixed(2)
                          : 0.0
                      } `}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Swiper4;
