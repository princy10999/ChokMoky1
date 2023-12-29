import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/material";
import SideBar from "../../Components/Common/SideBar";
import DashboardMain from "../../Components/DashboardMain";
import {
  getCount,
  getCountTemp,
  MoveMaster,
} from "../../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { ApiPost } from "../../Api/Api";

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
const Dashboard = () => {
  const userDetail = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [lastLogin, setLastLogin] = useState("");
  const [lastOrder, setLastOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState("");
  const [wishlist, setWishlist] = useState("");
  const [loader, setLoader] = useState(false);

  const api = async () => {
    if (await sessionStorage.getItem("sessionId")) {
      const body = {
        params: {
          session_id: await sessionStorage.getItem("sessionId"),
        },
      };
      await dispatch(MoveMaster(body));
      await dispatch(getCount());
      sessionStorage?.removeItem("sessionId");
    }
  };

  useEffect(() => {
    api();
    const body = {
      params: {
        session_id: sessionStorage.getItem("sessionId"),
      },
    };
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    document.title = "Dashboard - Chokmoki";
    dispatch(isLoader(true));
    setLoader(true);
    ApiPost("dashboard").then((res) => {
      setLastLogin(res?.data?.last_login_date);
      setLastOrder(res?.data?.last_order);
      setTotalOrder(res?.data?.total_order);
      setWishlist(res?.data?.wishlist);
      dispatch(isLoader(false));
      setLoader(false);
    });
    if (userDetail) {
      dispatch(getCount());
    } else {
      dispatch(getCountTemp(body));
    }
  }, []);

  return (
    <Box>
      <Box className={classes.page}>
        <Box className={classes.topColor}></Box>
        <Box className={classes.mainBox}>
          <SideBar />
          <DashboardMain
            lastLogin={lastLogin}
            lastOrder={lastOrder}
            setLastOrder={setLastOrder}
            totalOrder={totalOrder}
            wishlist={wishlist}
            loader={loader}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
