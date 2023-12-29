import React, { useEffect } from "react";
import { Box, Container, Rating, Typography } from "@mui/material";
import Heading from "./Common/Heading";
import { makeStyles } from "tss-react/mui";
import Aos from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Link } from "react-router-dom";
import Tester from "../Assests/images/images 6.webp";
import { useState } from "react";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    cont: {
      padding: "25px",
      height: "100%",
      maxWidth: "1200px",
      [theme.breakpoints.down("laptop")]: {
        maxWidth: "767px",
      },
      [theme.breakpoints.down("mobile")]: {
        maxWidth: "575px",
      },
    },
    main: {
      paddingTop: "41px",
    },
    item: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      height: "100%",
      paddingBottom: "18px",
      padding: " 0 30px",
    },
    collbox: {
      textAlign: "center",
    },
    collImg: {
      margin: "15px 0 ",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      transition: "all 0.5s ease-in-out",
      [theme.breakpoints.down("mobile")]: {
        margin: "10px 0px",
      },
    },
    colImgimg: {
      borderRadius: "50%",
      width: "75px",
      height: "75px",
    },

    text: {
      fontFamily: "Playfair Display",
      color: "#494A5A",
      fontSize: "21px",
      lineHeight: "27.99px",
      fontWeight: 500,
      textAlign: "center",
      [theme.breakpoints.down("tab")]: {
        fontSize: "19px",
        marginBottom: "10px",
      },
      [theme.breakpoints.down("mobile")]: {
        marginBottom: "0px",
      },
    },
    subText: {
      fontFamily: "Nunito",
      color: "#9D9B9B",
      fontSize: "16px",
      fontWeight: 400,
      textAlign: "center",
      [theme.breakpoints.down("tab")]: {
        fontSize: "14px",
        marginBottom: "10px",
      },
      [theme.breakpoints.down("mobile")]: {
        marginBottom: "0px",
      },
    },
    textSub: {
      fontFamily: "Nunito",
      color: "#9D9B9B",
      fontSize: "16px",
      fontWeight: 400,
      textAlign: "center",
      [theme.breakpoints.down("tab")]: {
        fontSize: "14px",
        marginBottom: "15px",
      },
      [theme.breakpoints.down("mobile")]: {
        marginBottom: "0px",
      },
    },
    starImage: {
      color: "#F87419",
    },
    name: {
      fontFamily: "League Spartan",
      color: "#61616A",
      marginBottom: "8px",
      fontSize: "15px",
      lineHeight: "13.8px",
      fontWeight: 500,
      textAlign: "center",
      textTransform: "uppercase",
    },
    colbut: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    swiper: {
      padding: 30,
      ".swiper-button-next": {
        top: "40%",
        right: 0,
        color: "#BD3D3D",
        [theme.breakpoints.down("mobile")]: {
          "&::after": {
            fontSize: "25px !important",
          },
        },
      },
      ".swiper-button-prev": {
        top: "40%",
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
        ".swiper-button-next": {
          right: -3,
        },
        ".swiper-button-prev": {
          left: -3,
        },
      },
    },
    stars: {
      animation: "zoom-in-zoom-out2 2s ease infinite",
      "@keyframes zoom-in-zoom-out2": {
        "0%": {
          transform: "scale(1)",
        },
        "50%": {
          transform: "scale(0.7)",
        },
        "100%": {
          transform: "scale(1)",
        },
      },
      [theme.breakpoints.down("tab")]: {
        width: " 0.8em",
        height: " 0.8em",
      },
    },
    readBtn: {
      marginLeft: "10px",
      border: "none",
      background: "none",
      color: " #bd3d3d",
      fontWeight: "800",
    },
    noReview: {
      [theme.breakpoints.down("tab")]: {
        fontSize: "24px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "20px",
      },
    },
  };
});

const ProductRating = ({ review, image_path }) => {
  const { classes, cx } = useStyles();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const [showFullParagraph, setShowFullParagraph] = useState(false);
  const toggleShowFullParagraph = (id) => {
    setShowFullParagraph(showFullParagraph !== id ? id : 0);
  };
  return (
    <Box className={classes.main}>
      <Container className={classes.cont}>
        <Heading
          title="Review"
          bgText="R"
          type="client"
          fontFamily="League Spartan, serif"
          h="145px"
          tabh="105px"
          iphh="88px"
          lapbott="38px"
          tabbott="15px"
        />
        {review?.length > 0 ? (
          <Swiper
            breakpoints={{
              "@0.00": {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            loop={false}
            speed={2000}
            autoplay={{
              delay: 1500,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className={classes?.swiper}
          >
            {review.map((item, index) => (
              <SwiperSlide>
                <Box component="div" className={cx(classes.item)} key={index}>
                  <Box component={Link} to="#" className={classes.collbox}>
                    <Box className={classes.colbut}>
                      <Box component="div" className={classes.collImg}>
                        <LazyLoad offset={200}>
                          <Box
                            component="img"
                            className={classes.colImgimg}
                            src={
                              item?.customer_details?.profile_image
                                ? image_path +
                                  item?.customer_details?.profile_image
                                : Tester
                            }
                            alt="client"
                          />
                        </LazyLoad>
                      </Box>
                      <Typography className={classes.name}>
                        {item?.customer_details?.first_name}{" "}
                        {item?.customer_details?.last_name}
                      </Typography>
                      <Typography>
                        <Rating
                          className={classes?.starImage}
                          defaultValue={+item?.rating}
                          readOnly
                        />
                      </Typography>
                      <Typography className={classes.subText}>
                        {/* {item?.comment ? `"${item?.comment}"` : ""} */}

                        {showFullParagraph !== item?.id &&
                        item?.comment.length > 90
                          ? item?.comment?.substring(0, 90) + "..."
                          : item?.comment}
                        <button
                          className={classes.readBtn}
                          onClick={() => toggleShowFullParagraph(item?.id)}
                        >
                          {item?.comment.length > 100 && (
                            <Box component="span" sx={{ cursor: "pointer" }}>
                              {showFullParagraph === item?.id
                                ? "Read Less"
                                : "Read More"}
                            </Box>
                          )}
                        </button>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Typography
            textAlign={"center"}
            fontSize="36px"
            fontWeight={500}
            fontFamily="League Spartan"
            className={classes.noReview}
          >
            No Review Available
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default ProductRating;
