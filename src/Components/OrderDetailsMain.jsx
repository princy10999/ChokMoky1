import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import { ApiPost, BaseURL } from "../Api/Api";
import ModalCommonRating from "./Common/ModalRating";
import swal from "sweetalert";
// import swal from "sweetalert";

const useStyles = makeStyles()((theme) => {
  return {
    profileBox: {
      width: "100%",
      marginLeft: "16px",
      padding: "92px 0px 67px 36px!important",
      margin: "0px !important",
      [theme.breakpoints.down("laptop")]: {
        padding: "92px 0px 67px 0px !important",
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "74px 0px 32px 0px !important",
      },
      [theme.breakpoints.down("iph")]: {
        padding: "74px 12px 32px 12px !important",
      },
    },
    profileHead: {
      fontFamily: "League Spartan",
      fontSize: "25px",
      lineHeight: "23px",
      fontWeight: "500",
      marginBottom: "25px",
    },
    boxImg: {
      border: "1px solid #F4F4F4",
      padding: "12px 10px 12px 13px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
    },
    oderBox: {
      border: "1px solid #F4F4F4",
      padding: "14px 104px 0px 24px ",
      marginBottom: "20px",
      [theme.breakpoints.down("smallLaptop")]: {
        padding: "14px 24px 0px 24px",
      },
      [theme.breakpoints.down("laptop")]: {
        padding: "14px 80px 0px 20px ",
      },
      [theme.breakpoints.down("tab")]: {
        padding: "14px 20px 0px 20px ",
      },
    },
    head2: {
      fontFamily: "League Spartan",
      fontSize: "21px",
      lineHeight: "19.32px",
      fontWeight: "500",
      color: "#505152",
      marginBottom: "12px",
    },
    stackBox2: {
      marginBottom: "21px",
    },
    label1: {
      fontFamily: "League Spartan",
      fontSize: "18px",
      lineHeight: "32px",
      fontWeight: "400",
      color: "#3D3D47",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("xlDesktop")]: {
        fontSize: "17px",
        lineHeight: "20px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "16px",
      },
    },
    mb: {
      marginBottom: "8px",
      [theme.breakpoints.down("xlDesktop")]: {
        marginBottom: "16px",
      },
    },
    label11: {
      width: "116px",
      [theme.breakpoints.down("xlDesktop")]: {
        width: "105px",
      },
      [theme.breakpoints.down("small")]: {
        width: "78px",
        whiteSpace: "pre-wrap",
      },
    },
    label22: {
      width: "calc(100% - 116px)",
      [theme.breakpoints.down("xlDesktop")]: {
        width: "calc(100% - 105px)",
      },
      [theme.breakpoints.down("small")]: {
        width: "calc(100% - 54px)",
      },
    },
    label33: {
      width: "136.5px",
      [theme.breakpoints.down("xlDesktop")]: {
        width: "123px",
      },
      [theme.breakpoints.down("small")]: {
        width: "91px",
        whiteSpace: "pre-wrap",
      },
    },
    label44: {
      width: "calc(100% - 136.5px)",
      [theme.breakpoints.down("xlDesktop")]: {
        width: "calc(100% - 123px)",
      },
      [theme.breakpoints.down("small")]: {
        width: "calc(100% - 79px)",
      },
    },
    label55: {
      width: "179px",
      [theme.breakpoints.down("xlDesktop")]: {
        width: "155px",
      },
      [theme.breakpoints.down("small")]: {
        width: "104px",
        whiteSpace: "pre-wrap",
      },
    },
    label66: {
      width: "calc(100% - 179px)",
      [theme.breakpoints.down("xlDesktop")]: {
        width: "calc(100% - 155px)",
      },
      [theme.breakpoints.down("smallLaptop")]: {
        lineBreak:"anywhere",
      },
      [theme.breakpoints.down("laptop")]: {
        lineBreak:"auto",
      },
      [theme.breakpoints.down("tab")]: {
        lineBreak:"anywhere",
      },

      [theme.breakpoints.down("small")]: {
        width: "calc(100% - 76px)",
      },
    },
    label2: {
      fontFamily: "League Spartan",
      fontSize: "18px",
      lineHeight: "32px",
      fontWeight: "500",
      color: "#1A1C1D",
      [theme.breakpoints.down("xlDesktop")]: {
        fontSize: "17px",
        lineHeight: "20px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "16px",
      },
    },
    textBox: {
      display: "flex",
      flexDirection: "column",
    },
    titleText: {
      fontFamily: "League Spartan",
      fontSize: "21px",
      lineHeight: "19.32px",
      fontWeight: "400",
      marginTop: "2px",
      color: "#2F2F2D",
      [theme.breakpoints.down("tab")]: {
        fontSize: "18px",
      },
    },
    numText: {
      fontFamily: "League Spartan",
      fontSize: "19px",
      lineHeight: "17.48px",
      fontWeight: "400",
      marginTop: "11px",
      color: "#3D3D47",
      [theme.breakpoints.down("tab")]: {
        fontSize: "17px",
      },
    },
    gridBox1: {
      marginBottom: "20px",
    },
    numText2: {
      fontFamily: "League Spartan",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "500",
      marginTop: "6px",
      color: "#717475",
      [theme.breakpoints.down("tab")]: {
        fontSize: "14px",
      },
    },
    labelH: {
      fontFamily: "League Spartan",
      fontSize: "21px",
      lineHeight: "24px",
      fontWeight: "500",
      marginTop: "6px",
      marginBottom: "12px",
      color: "#505152",
    },
    orderL: {
      border: "1px solid #F2F2F2",
      padding: "14px",
    },
  };
});

const OrderDetailsMain = ({ order, orderDetail, orders, getOrderDetails }) => {
  const { classes } = useStyles();
  const [open2, setOpen2] = useState(false);
  const [items, setItems] = useState("");
  const handleOpen2 = (item) => {
    const body = {
      params: {
        product_id: item?.product_id,
        order_details_id: item?.id,
      },
    };
    ApiPost("get-review", body)
      .then((res) => {
        if (res?.data?.result?.message === "Error") {
          setOpen2(true);
          setItems(item);
        } else if (res?.data?.result?.message === "Success") {
          swal({
            title: "Warning",
            text: "You have already given the review",
            icon: "warning",
          });
        }
      })
      .catch((err) => {});
  };
  const handleClose2 = () => setOpen2(false);

  return (
    <Box className={classes.profileBox}>
      <Typography variant="h1" className={classes.profileHead}>
        Order Details
      </Typography>
      <Typography className={classes.head2}>Order Information</Typography>
      <Box className={classes.oderBox}>
        <Stack
          direction={{ mobile: "row", xSmall: "column" }}
          justifyContent="space-between"
          spacing={{ xSmall: 3, xTab: 0.8, mobile: 1 }}
          className={classes.stackBox}
        >
          <Box className={classes.oderLeftBox}>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label33}`}>
                Order Id :
              </Typography>
              <Typography className={`${classes.label2} ${classes.label44}`}>
                {orderDetail?.order_number}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label33}`}>
                Order date :
              </Typography>
              <Typography className={`${classes.label2} ${classes.label44}`}>
                {moment(orderDetail?.order_date).format("DD-MM-YYYY")}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label33}`}>
                Delivery date :
              </Typography>
              <Typography className={`${classes.label2} ${classes.label44}`}>
                {orderDetail.delivery_date
                  ? moment(orderDetail.delivery_date).format("DD-MM-YYYY")
                  : "-"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label33}`}>
                Payment method :
              </Typography>
              <Typography className={`${classes.label2} ${classes.label44}`}>
                {orderDetail?.payment_method === "D"
                  ? "Direct bank transfer"
                  : orderDetail?.payment_method === "C"
                  ? "Cash on delivery"
                  : orderDetail?.payment_method === "O"
                  ? "Online UPI"
                  : null}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label33}`}>
                Coupon Applied :
              </Typography>
              <Typography className={`${classes.label2} ${classes.label44}`}>
                {order?.coupon_applied === "Y"
                  ? "Yes"
                  : order?.coupon_applied === "N"
                  ? "No"
                  : null}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label33}`}>
                Status :
              </Typography>
              <Typography
                className={`${classes.label2} ${classes.label44}`}
                sx={{
                  color:
                    orderDetail?.status === "I"
                      ? "#0F72B5 !important"
                      : orderDetail?.status === "N"
                      ? "#2F8108 !important"
                      : "#BD3D3D !important",
                }}
              >
                {orderDetail?.status === "I"
                  ? "Initiated"
                  : orderDetail?.status === "N"
                  ? "Delivered"
                  : orderDetail.status === "C"
                  ? "Canceled"
                  : "Failed"}
              </Typography>
            </Stack>
          </Box>
          <Box className={classes.oderRightBox}>
          <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label55}`}>
              Transaction ID :
              </Typography>
              <Typography maxWidth={"175px"} className={`${classes.label2} ${classes.label66}`}>
                {orderDetail?.payments_details?.tran_id}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label55}`}>
                No. of Item :
              </Typography>
              <Typography className={`${classes.label2} ${classes.label66}`}>
                {orderDetail?.total_item}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label55}`}>
                Order subtotal :
              </Typography>
              <Typography className={`${classes.label2} ${classes.label66}`}>
                {" "}
                ₹{orderDetail?.total_before_discount}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label55}`}>
                Shipping Amount :
              </Typography>
              <Typography className={`${classes.label2} ${classes.label66}`}>
                {" "}
                ₹{orderDetail?.shipping_fees ? orderDetail?.shipping_fees : 0}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label55}`}>
                Discount price:
              </Typography>
              <Typography className={`${classes.label2} ${classes.label66}`}>
                ₹{order?.discount_amount?.toFixed(2)}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              className={classes.mb}
              spacing={{ xSmall: 1, mobile: 1 }}
            >
              <Typography className={`${classes.label1} ${classes.label55}`}>
                Total payable amount:
              </Typography>
              <Typography className={`${classes.label2} ${classes.label66}`}>
                ₹{orderDetail?.total_amount}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Grid
        container
        spacing={2}
        columns={{ xSmall: 4, stab: 12 }}
        className={classes.gridBox1}
      >
        {orders?.map((item, index) => {
          return (
            <Grid item stab={6} xSmall={4} key={index}>
              <Box className={classes.boxImg}>
                <Stack
                  direction="row"
                  spacing={{ xSmall: 1.8 }}
                  className={classes.stackBoxImg}
                >
                  <Box
                    className={classes.cardImage}
                    component="img"
                    src={
                      BaseURL +
                      item?.get_product_details?.get_defult_image?.image
                    }
                    alt="fff"
                    sx={(theme) => ({
                      width: "73px",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    })}
                  />
                  <Box className={classes.textBox}>
                    <Typography variant="p" className={classes.titleText}>
                      {item?.get_product_details?.title}
                    </Typography>
                    <Typography variant="p" className={classes.numText}>
                      ₹{item?.total_price}
                    </Typography>
                    <Typography variant="p" className={classes.numText2}>
                      x {item?.qty}
                    </Typography>
                  </Box>
                </Stack>
                {item?.product_order_status === "OD" && (
                  <Button
                    sx={{
                      color: "#2F8108",
                      cursor: "pointer",
                      padding: "0px",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleOpen2(item)}
                  >
                    Review
                  </Button>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Grid
        container
        spacing={2}
        columns={{
          xSmall: 4,
          tab: 12,
          laptop: 12,
          smallLaptop: 12,
          xlDesktop: 12,
        }}
      >
        <Grid item xlDesktop={6} smallLaptop={6} laptop={12} tab={6} xSmall={4}>
          <Box>
            <Typography className={classes.labelH}>
              Billing Information:
            </Typography>
            <Box className={classes.orderL}>
              <Stack
                direction="row"
                className={classes.mb}
                spacing={{ xSmall: 1, mobile: 1 }}
              >
                <Typography className={`${classes.label1} ${classes.label11}`}>
                  Name :
                </Typography>
                <Typography className={`${classes.label2} ${classes.label22}`}>
                  {orderDetail?.billing_fname +
                    " " +
                    orderDetail?.billing_lname}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                className={classes.mb}
                spacing={{ xSmall: 1, mobile: 1 }}
              >
                <Typography className={`${classes.label1} ${classes.label11}`}>
                  Email Address :
                </Typography>
                <Typography className={`${classes.label2} ${classes.label22}`}>
                  {orderDetail?.billing_email}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                className={classes.mb}
                spacing={{ xSmall: 1, mobile: 1 }}
              >
                <Typography className={`${classes.label1} ${classes.label11}`}>
                  Phone No. :
                </Typography>
                <Typography className={`${classes.label2} ${classes.label22}`}>
                  +91 {orderDetail?.billing_phone}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                className={classes.mb}
                spacing={{ xSmall: 1, mobile: 1 }}
              >
                <Typography className={`${classes.label1} ${classes.label11}`}>
                  Address :
                </Typography>
                <Typography className={`${classes.label2} ${classes.label22}`}>
                  {orderDetail?.billing_street_address},{" "}
                  {orderDetail?.billing_city}, {orderDetail?.billing_state},
                  {orderDetail?.billing_postcode}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item xlDesktop={6} smallLaptop={6} laptop={12} tab={6} xSmall={4}>
          <Box>
            <Typography className={classes.labelH}>
              Shipping Information:
            </Typography>
            <Box className={classes.orderL}>
              <Stack
                direction="row"
                className={classes.mb}
                spacing={{ xSmall: 1, mobile: 1 }}
              >
                <Typography className={`${classes.label1} ${classes.label11}`}>
                  Name :
                </Typography>
                <Typography className={`${classes.label2} ${classes.label22}`}>
                  {orderDetail?.default_shipping_address === "Y"
                    ? orderDetail?.billing_fname +
                      " " +
                      orderDetail?.billing_lname
                    : orderDetail?.shipping_fname +
                      " " +
                      orderDetail?.shipping_lname}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                className={classes.mb}
                spacing={{ xSmall: 1, mobile: 1 }}
              >
                <Typography className={`${classes.label1} ${classes.label11}`}>
                  Email Address :
                </Typography>
                <Typography className={`${classes.label2} ${classes.label22}`}>
                  {orderDetail?.default_shipping_address === "Y"
                    ? orderDetail?.billing_email
                    : orderDetail?.shipping_email}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                className={classes.mb}
                spacing={{ xSmall: 1, mobile: 1 }}
              >
                <Typography className={`${classes.label1} ${classes.label11}`}>
                  Phone No. :
                </Typography>
                <Typography className={`${classes.label2} ${classes.label22}`}>
                  +91{" "}
                  {orderDetail?.default_shipping_address === "Y"
                    ? orderDetail?.billing_phone
                    : orderDetail?.shipping_phone}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                className={classes.mb}
                spacing={{ xSmall: 1, mobile: 1 }}
              >
                <Typography className={`${classes.label1} ${classes.label11}`}>
                  Address :
                </Typography>
                <Typography className={`${classes.label2} ${classes.label22}`}>
                  {orderDetail?.default_shipping_address === "Y"
                    ? `${orderDetail?.billing_street_address},
                  ${orderDetail?.billing_city}, ${orderDetail?.billing_state},
                  ${orderDetail?.billing_postcode}`
                    : `${orderDetail?.shipping_street_address},
                  ${orderDetail?.shipping_city}, ${orderDetail?.shipping_state},
                  ${orderDetail?.shipping_postcode}`}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ModalCommonRating
        open={open2}
        handleClose={handleClose2}
        handleOpen={handleOpen2}
        items={items}
        orderDetail={orderDetail}
        getOrderDetails={getOrderDetails}
        // getHistory={getHistory}
      />
    </Box>
  );
};

export default OrderDetailsMain;
