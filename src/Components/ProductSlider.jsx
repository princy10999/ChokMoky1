import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "tss-react/mui";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Box } from "@mui/material";
import { BaseURL } from "../Api/Api";
import def from "../Assests/images/default.webp";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    swiper: {
      height: "100%",
      ".swiper-button-next": {
        width: "30px",
        height: "30px",
        top: "98.6%",
        left: "38%",
        transform: "rotate(90deg)",
        color: "#FFFFFF",
        backgroundColor: "rgba(54, 55, 57, 0.44)",
        "&::after": {
          fontSize: "15px",
        },
        "&:hover": {
          color: "#BD3D3D",
        },
        [theme.breakpoints.down("mobile")]: {
          width: "24px",
          height: "26px",
          top: "99%",
        },
      },
      ".swiper-button-prev": {
        width: "30px",
        height: "30px",
        top: "3.7%",
        left: "38%",
        transform: "rotate(90deg)",
        color: "#FFFFFF",
        [theme.breakpoints.down("tab")]: {
          top: "5%",
        },
        [theme.breakpoints.down("mobile")]: {
          width: "24px",
          height: "26px",
        },
        [theme.breakpoints.down("iph")]: {
          top: "7%",
        },
        [theme.breakpoints.down("small")]: {
          top: "8%",
        },
        backgroundColor: "rgba(54, 55, 57, 0.44)",
        "&::after": {
          fontSize: "15px",
        },
        "&:hover": {
          color: "#BD3D3D",
        },
      },
      width: "120px",
      [theme.breakpoints.down("mobile")]: {
        width: "90px",
      },
      ".swiper-wrapper .swiper-slide": {
        background: "#f2eeee75",
        display: "flex",
        justifyContent: "center !important",
        alignItems: "center !important",
      },
    },
    sliderBox: {
      height: "100%",
    },
    sideImg: {
      width: "100%",
      maxHeight: "100%",
    },
  };
});
export default function App({ togglecolor, data }) {
  const { classes } = useStyles();
  return (
    <>
      <Box width="auto" className={classes?.sliderBox}>
        {data && data?.get_all_image && data?.get_all_image.length !== 0 && (
          <Swiper
            direction={"vertical"}
            breakpoints={{
              "@0.50": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@0.75": {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            navigation={true}
            className={classes?.swiper}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {data?.get_all_image?.map((e) => {
              return (
                <SwiperSlide>
                  <LazyLoad offset={200}>
                    <Box
                      className={classes.sideImg}
                      component="img"
                      onClick={() => togglecolor(BaseURL + e?.image)}
                      src={e?.image ? BaseURL + e?.image : def}
                      alt="product"
                    />
                  </LazyLoad>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Box>
    </>
  );
}
