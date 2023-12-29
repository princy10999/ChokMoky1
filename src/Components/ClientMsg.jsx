import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
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
import { BaseURL } from "../Api/Api";
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
    name: {
      fontFamily: "League Spartan",
      color: "#61616A",
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
  };
});

const ClientMsg = ({ data }) => {
  const { classes, cx } = useStyles();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <Box className={classes.main}>
      <Container className={classes.cont}>
        <Heading
          title="Happy Clients Say"
          bgText="H"
          type="client"
          fontFamily="League Spartan, serif"
          h="145px"
          tabh="105px"
          iphh="88px"
          lapbott="38px"
          tabbott="15px"
        />
        <Swiper
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.50": {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          loop={data?.clients_say?.length > 3 ? true : false}
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
          {data?.clients_say?.map((item, index) => (
            <SwiperSlide>
              <Box component="div" className={cx(classes.item)} key={index}>
                <Box component={Link} to="#" className={classes.collbox}>
                  <Box className={classes.colbut}>
                    {/* <Typography>
                      <StarIcon
                        style={{ fill: "#F87419" }}
                        className={classes.stars}
                      />
                      <StarIcon
                        style={{ fill: "#F87419" }}
                        className={classes.stars}
                      />
                      <StarIcon
                        style={{ fill: "#F87419" }}
                        className={classes.stars}
                      />
                      <StarIcon
                        style={{ fill: "#F87419" }}
                        className={classes.stars}
                      />
                      <StarIcon
                        style={{ fill: "#F87419" }}
                        className={classes.stars}
                      />
                    </Typography> */}
                    <Typography
                      className={classes.text}
                      sx={{ marginBottom: "12px" }}
                    >
                      {item?.product_name}
                    </Typography>
                    <Typography className={classes.subText}>
                      {item?.description?.substr(0, 50) + "..."}
                    </Typography>
                    <Box component="div" className={classes.collImg}>
                      <LazyLoad offset={200}>
                        <Box
                          component="img"
                          className={classes.colImgimg}
                          src={
                            item.image
                              ? BaseURL + data?.testimonial_image + item.image
                              : Tester
                          }
                          alt="client"
                        />
                      </LazyLoad>
                    </Box>
                    <Typography className={classes.name}>
                      {item?.user_name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default ClientMsg;
