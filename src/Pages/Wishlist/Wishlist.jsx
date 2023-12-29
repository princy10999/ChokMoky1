import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/material";
import SideBar from "../../Components/Common/SideBar";
import WishlistCart from "../../Components/WishlistCart";
import { ApiPost } from "../../Api/Api";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles()((theme) => {
  return {
    topColor: {
      backgroundColor: "#FCF8ED",
      height: "3.5rem",
    },
    mainBox: {
      display: "flex",
      margin: "-57px auto 0 auto",
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
      // display: "flex",
      // marginTop: "-57px",
      // padding: "0px 160px 0px 160px",
      // [theme.breakpoints.down("mLaptop")]: {
      //   padding: "0px 80px 0px 80px",
      // },
      // [theme.breakpoints.down("xDesktop")]: {
      //   padding: "0px 60px 0px 60px",
      // },
      // [theme.breakpoints.down("laptop")]: {
      //   padding: "0px 39px 0px 39px",
      // },
      // [theme.breakpoints.down("tab")]: {
      //   padding: "0px 30px 0px 30px",
      // },
      // [theme.breakpoints.down("stab")]: {
      //   padding: "0px 30px 0px 30px",
      // },
      // [theme.breakpoints.down("iph")]: {
      //   padding: "0px 10px 0px 10px",
      // },
    },
  };
});

const Wishlist = () => {
  const { classes } = useStyles();
  const [wishlist, setWishlist] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [limit, setLimit] = useState(6);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Wishlist - Chokmoki";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    getWishlist(6);
  }, []);

  const getWishlist = (pages) => {
    setLimit(pages);
    let data = {
      params: {
        per_page: pages,
        page_no: 1,
      },
    };
    dispatch(isLoader(true));
    setLoader(true);
    ApiPost("get-wishlist", data).then((res) => {
      setWishlist(res?.data?.productDetails);
      setProductCount(res?.data?.product_count);
      dispatch(isLoader(false));
      setLoader(false);
    });
  };

  return (
    <Box>
      <Box className={classes.page}>
        <Box className={classes.topColor}></Box>
        <Box className={classes.mainBox}>
          <SideBar />
          <WishlistCart
            data={wishlist}
            updateData={setWishlist}
            getWishlist={getWishlist}
            productCount={productCount}
            limit={limit}
            loader={loader}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Wishlist;
