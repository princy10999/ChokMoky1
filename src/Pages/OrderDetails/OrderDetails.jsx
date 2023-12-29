import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/material";
import SideBar from "../../Components/Common/SideBar";
import OrderDetailsMain from "../../Components/OrderDetailsMain";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ApiPost } from "../../Api/Api";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useState } from "react";

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
const OrderDetails = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [order, setOrder] = useState({});
  const [orderDetail, setOrderDetail] = useState([]);
  const [orders, setOrders] = useState([]);

  const getOrderDetails = () => {
    let data = {
      params: {
        order_master_id: id,
      },
    };
    dispatch(isLoader(true));
    ApiPost("get-order-details", data).then((res) => {
      setOrderDetail(res?.data?.orderDetails?.[0]);
      setOrder(res?.data);
      setOrders(res?.data?.orderDetails?.[0]?.get_order_details);
      dispatch(isLoader(false));
    });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Order Detail - Chokmoki";
    getOrderDetails();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return (
    <Box>
      <Box className={classes.page}>
        <Box className={classes.topColor}></Box>
        <Box className={classes.mainBox}>
          <SideBar />
          <OrderDetailsMain
            order={order}
            orderDetail={orderDetail}
            orders={orders}
            getOrderDetails={getOrderDetails}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetails;
