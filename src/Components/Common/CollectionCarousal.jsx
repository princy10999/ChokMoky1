import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import Aos from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import StyledButton1 from "./StyledButton1";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { categoryList } from "../../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
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
      cursor: "pointer",
    },
    collbox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    collImg: {
      width: "100%",
      height: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      transition: "all 0.5s ease-in-out",
      "> img:last-of-type": {
        opacity: "1",
        transition: "opacity 0.5s ease-in-out",
      },
      "&:hover > img:last-of-type": {
        opacity: "0",
      },
    },
    colImgimg: {
      width: "240px",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      position: "absolute",
    },
    colImgimg2: {
      width: "150px",
      height: "150px",
      maxWidth: "100%",
      maxHeight: "100%",
      position: "absolute",
    },
    colbut: {
      margin: "-25px 10px 0px 10px",
    },
    swiper: {
      padding: "127px 20px 0px",
      ".swiper-slide-next .collImg,.swiper-slide-next + .swiper-slide .collImg":
        {
          height: "335px !important",
        },
      ".swiper-slide-next .collImg img,.swiper-slide-next + .swiper-slide .collImg img":
        {
          margin: "0 10px !important",
        },
      [theme.breakpoints.down("smallLaptop")]: {
        ".swiper-slide-next + .swiper-slide .collImg": {
          height: "300px !important",
        },
      },
      [theme.breakpoints.down("tab")]: {
        ".swiper-slide-next .collImg": {
          height: "300px !important",
        },
      },
      ".swiper-wrapper": {
        alignItems: "baseline",
      },
      ".swiper-button-next": {
        right: 0,
        top: "60%",
        color: "#BD3D3D",
        [theme.breakpoints.down("mobile")]: {
          "&::after": {
            fontSize: "25px !important",
          },
        },
      },
      ".swiper-button-prev": {
        left: 0,
        top: "60%",
        color: "#BD3D3D",
        [theme.breakpoints.down("mobile")]: {
          "&::after": {
            fontSize: "25px !important",
          },
        },
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "5px",
        paddingTop: "110px",
        ".swiper-button-next": {
          top: "40%",
        },
        ".swiper-button-prev": {
          top: "40%",
        },
      },
    },
  };
});
function CollectionCarousal() {
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryListData, setCategoryListData] = useState([]);
  const selectCategoryFunction = async () => {
    dispatch(isLoader(true));
    const data = await dispatch(categoryList());
    setCategoryListData(data?.payload?.result?.category_list);
    dispatch(isLoader(false));
  };
  useEffect(() => {
    Aos.init({ duration: 2000 });
    selectCategoryFunction();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  return (
    <Swiper
      breakpoints={{
        "@0.85": {
          slidesPerView: 2,
        },
        "@1.065": {
          slidesPerView: 3,
          spaceBetween: 50,
        },
        "@1.50": {
          slidesPerView: 4,
        },
      }}
      slidesPerView={1}
      loop={true}
      speed={2000}
      autoplay={{
        delay: 500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className={`${classes?.swiper} swiper`}
    >
      {categoryListData.map((item, index) => (
        <SwiperSlide>
          <Box
            component="div"
            className={classes.item}
            key={index}
            onClick={() =>
              navigate(`/category/${item?.slug}`, {
                state: {
                  data: item,
                },
              })
            }
          >
            <Box className={classes.collbox}>
              <LazyLoad offset={200}>
                <Box component="div" className={`${classes.collImg} collImg`}>
                  <Box
                    component="img"
                    className={`${classes.colImgimg} ${classes.colImgimg2}`}
                    src={BaseURL + item.image}
                    alt={item.name}
                  />
                  <Box
                    component="img"
                    className={classes.colImgimg}
                    src={BaseURL + item.image}
                    alt={item.name}
                  />
                </Box>
              </LazyLoad>
              <Box component="div" className={classes.colbut}>
                <StyledButton1 text={item.name} />
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default CollectionCarousal;
