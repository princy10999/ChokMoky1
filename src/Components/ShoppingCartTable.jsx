import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "tss-react/mui";
import def from "../Assests/images/default.webp";
import { Box } from "@mui/system";
// import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Container, Grid, Stack, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import noRecord from "../Assests/images/no-record.webp";
import { BaseURL } from "../Api/Api";
import moment from "moment";
import { isLoader } from "../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import { ApiPost } from "../Api/Api";
import ModalCommonRating from "./Common/ModalRating";

const useStyles = makeStyles()((theme) => {
  return {
    containerBox: {
      paddingLeft: "0px",
      paddingRight: "0px",
      overflow: "auto",
      width: "100%",
    },
    tableMain: {
      [theme.breakpoints.down("iph")]: {
        display: "none",
      },
      "&::-webkit-scrollbar": {
        width: "6px",
        borderRadius: "9px",
        height: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#F2F2F2",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#35364F",
        borderRadius: "9px",
      },
    },
    tablerow: {
      borderBottom: "1px solid #D6D6D6",
    },
    tableHeadName: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "20px",
      lineHeight: "39px",
      padding: "0px 10px 0px 10px",
      border: "none",
      color: "#3D3D47",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("tab")]: {
        fontSize: "18px",
      },
    },
    productName: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "19px",
      lineHeight: "17.48px",
      border: "none",
      color: "#2F2F2D",
      marginTop: "5px",
      marginBottom: "12px",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "17px",
        lineHeight: "17px",
        whiteSpace: "pre-wrap",
      },
      [theme.breakpoints.down("tab")]: {
        whiteSpace: "wrap",
      },
    },
    productPrice: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "19px",
      lineHeight: "17.48px",
      color: "#3D3D47",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "18px",
        lineHeight: "18px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "17px",
        lineHeight: "17px",
      },
    },
    orderDate: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "14.72px",
      color: "#3D3D47",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("tab")]: {
        fontSize: "14px",
      },
    },
    status: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "24px",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("tab")]: {
        fontSize: "16px",
      },
    },
    Img: {
      height: "84px",
      width: "81px",
    },
    dashIco: {
      color: "#858A8C",
      cursor: "pointer",
      "&:hover": {
        color: "#BD3D3D",
      },
    },
    noRec: {
      width: "16em",
      height: "10em",
      margin: "28px auto",
      [theme.breakpoints.down("iph")]: {
        width: "14em",
        height: "10em",
        margin: "8px auto",
      },
    },
    tableMain2: {
      display: "none",
      [theme.breakpoints.down("iph")]: {
        display: "block",
      },
    },
  };
});

export default function ShoppingCartTable({
  getHistory,
  order,
  loader,
  setOrder,
  setLastOrder,
}) {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open2, setOpen2] = useState(false);
  const [items, setItems] = useState("");
  const handleOpen2 = (item) => {
    setOpen2(true);
    setItems(item);
  };
  const handleClose2 = () => setOpen2(false);

  const CancelOrder = (id) => {
    // Swal.fire({
    //   // title: "<strong>Warning</strong>",
    //   // icon: "warning",
    //   // html: "Are you sure you want to cancel this order?",
    //   // showCancelButton: true,
    //   // confirmButtonColor: "#BD3D3D",
    //   // iconColor: "#BD3D3D",
    //   // confirmButtonText: "Yes",
    //   // cancelButtonColor: "#1A1B2F",
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    var data = {
      params: {
        order_master_id: id,
      },
    };
    dispatch(isLoader(true));
    ApiPost("cancel-order", data).then((res) => {
      if (res.data.success) {
        if (setLastOrder) {
          ApiPost("dashboard").then((res) => {
            setLastOrder(res?.data?.last_order);
          });
        }
        // swal({
        //   // title: "Success",
        //   // text: res.data.success,
        //   // icon: "success",
        // }).then(function () {
        setOrder(res?.data?.orderlist);

        // });
      } else if (res.data.error) {
        // swal({
        //   title: "Error",
        //   text: res.data.error,
        //   icon: "error",
        // });
      }

      dispatch(isLoader(false));
    });
  };
  //   });
  // };
  // const openModal3 = () => {

  // };
  return (
    <Container className={classes.containerBox}>
      {order && order.length > 0 ? (
        <>
          <TableContainer className={classes.tableMain}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow className={classes.tablerow}>
                  <TableCell className={classes.tableHeadName}>
                    Product
                  </TableCell>
                  <TableCell className={classes.tableHeadName} align="center">
                    Order Date
                  </TableCell>
                  <TableCell className={classes.tableHeadName} align="center">
                    Delivery Date
                  </TableCell>
                  <TableCell className={classes.tableHeadName} align="center">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ border: "none", boxShadow: "none" }}>
                {order.map((item, index) => (
                  <TableRow sx={{ boxShadow: "none" }} key={index}>
                    <TableCell component="th" scope="row" sx={{ pl: 0 }}>
                      <Stack
                        direction="row"
                        spacing={{ xSmall: 1.9 }}
                        className={classes.imgBox}
                      >
                        <Box
                          component="img"
                          src={
                            item?.get_order_details?.[0]?.get_product_details
                              ?.get_all_image?.[0]?.image
                              ? BaseURL +
                                item?.get_order_details?.[0]
                                  ?.get_product_details?.get_all_image?.[0]
                                  ?.image
                              : def
                          }
                          alt="product"
                          className={classes.Img}
                        />
                        <Box>
                          <Typography className={classes.productName}>
                            {item?.get_order_details?.[0]?.get_product_details
                              ?.title.length > 31
                              ? item?.get_order_details?.[0]?.get_product_details?.title.substr(
                                  0,
                                  30
                                ) + "..."
                              : item?.get_order_details?.[0]
                                  ?.get_product_details?.title}
                          </Typography>
                          <Typography className={classes.productPrice}>
                            ₹{item?.get_order_details?.[0]?.total_price}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell className={classes.orderDate} align="center">
                      {moment(item.order_date).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className={classes.orderDate} align="center">
                      {item.delivery_date
                        ? moment(item.delivery_date).format("DD-MM-YYYY")
                        : "-"}
                    </TableCell>
                    <TableCell
                      className={classes.status}
                      align="center"
                      sx={{
                        color:
                          item.status === "I"
                            ? "#0F72B5"
                            : item.status === "N"
                            ? "#2F8108"
                            : "#BD3D3D",
                      }}
                    >
                      {item.status === "I"
                        ? "Initiated"
                        : item.status === "N"
                        ? "Delivered"
                        : item.status === "C"
                        ? "Canceled"
                        : "Failed"}
                    </TableCell>
                    <TableCell sx={{ pr: 0 }}>
                      <Stack
                        direction="row"
                        spacing={{ xSmall: 1.9 }}
                        className={classes.imgBox}
                      >
                        <Tooltip title="View Order Details">
                          <RemoveRedEyeOutlinedIcon
                            className={classes.dashIco}
                            onClick={() =>
                              navigate(
                                `/order-details/${item?.get_order_details?.[0]?.order_master_id}`
                              )
                            }
                          />
                        </Tooltip>
                        {/* {item.status !== "C" && (
                          <Tooltip title="Cancel">
                            <CloseIcon
                              className={classes.dashIco}
                              onClick={() =>
                                CancelOrder(
                                  item?.get_order_details?.[0]?.order_master_id
                                )
                              }
                            />
                          </Tooltip>
                        )} */}
                      </Stack>
                    </TableCell>
                    {/* {item.status === "N" ? <TableCell
                      align="center">
                      <Button sx={{
                        color: "#2F8108",
                        cursor: "pointer",
                        textTransform: "capitalize"
                      }} onClick={() => handleOpen2(item)}
                        disabled={item?.review_status === "Y" ? true : false}
                      >
                        {item.status === "N"
                          ? "Review"
                          : ""}
                      </Button>
                    </TableCell> : null} */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer className={classes.tableMain2}>
            <Stack
              direction="row"
              alignItems="flex-start"
              spacing={1}
              className={classes.specificationContent}
            >
              <Grid
                container
                className={classes.specificationWeight2}
                spacing={{
                  xSmall: 1,
                  laptop: 2,
                  smallLaptop: 2,
                  desktop: 2,
                }}
                columns={{ xSmall: 12, mobile: 12, tab: 12, laptop: 12 }}
              >
                {order.map((item, index) => (
                  <>
                    <Grid item xSmall={5}>
                      <Typography
                        component="p"
                        className={classes.specificationWeight}
                      >
                        Product:
                      </Typography>
                    </Grid>
                    <Grid item xSmall={7}>
                      <Box
                        component="img"
                        src={
                          item?.get_order_details?.[0]?.get_product_details
                            ?.get_all_image?.[0]?.image
                            ? BaseURL +
                              item?.get_order_details?.[0]?.get_product_details
                                ?.get_all_image?.[0]?.image
                            : def
                        }
                        alt="product"
                        className={classes.Img}
                      />
                      <Box>
                        <Typography className={classes.productName}>
                          {item?.get_order_details?.[0]?.get_product_details
                            ?.title.length > 31
                            ? item?.get_order_details?.[0]?.get_product_details
                                ?.title
                            : item?.get_order_details?.[0]?.get_product_details
                                ?.title}
                        </Typography>
                        <Typography className={classes.productPrice}>
                          ₹{item?.get_order_details?.[0]?.total_price}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xSmall={5}>
                      <Typography
                        component="p"
                        className={classes.specificationWeight}
                      >
                        Order Date:
                      </Typography>
                    </Grid>
                    <Grid item xSmall={7}>
                      <Stack
                        direction="row"
                        spacing={{ xSmall: 1.9 }}
                        className={classes.imgBox}
                      >
                        {moment(item.order_date).format("DD-MM-YYYY")}
                      </Stack>
                    </Grid>
                    <Grid item xSmall={5}>
                      <Typography
                        component="p"
                        className={classes.specificationWeight}
                      >
                        Delivery Date:
                      </Typography>
                    </Grid>
                    <Grid item xSmall={7}>
                      <Stack
                        direction="row"
                        spacing={{ xSmall: 1.9 }}
                        className={classes.imgBox}
                      >
                        {item.delivery_date
                          ? moment(item.delivery_date).format("DD-MM-YYYY")
                          : "-"}
                      </Stack>
                    </Grid>
                    <Grid item xSmall={5}>
                      <Typography
                        component="p"
                        className={classes.specificationWeight}
                      >
                        Status:
                      </Typography>
                    </Grid>
                    <Grid item xSmall={7}>
                      <Stack
                        direction="row"
                        spacing={{ xSmall: 1.9 }}
                        className={classes.imgBox}
                      >
                        <Typography
                          className={classes.status}
                          align="center"
                          sx={{
                            color:
                              item.status === "I"
                                ? "#0F72B5"
                                : item.status === "N"
                                ? "#2F8108"
                                : "#BD3D3D",
                          }}
                        >
                          {item.status === "I"
                            ? "Initiated"
                            : item.status === "N"
                            ? "Delivered"
                            : item.status === "C"
                            ? "Canceled"
                            : "Failed"}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xSmall={5} borderBottom="1px solid black">
                      <Typography
                        component="p"
                        className={classes.specificationWeight}
                        mb="5px"
                      >
                        Action:
                      </Typography>
                    </Grid>
                    <Grid item xSmall={7} borderBottom="1px solid black">
                      <Stack
                        direction="row"
                        spacing={{ xSmall: 1.9 }}
                        className={classes.imgBox}
                      >
                        <Tooltip title="View Order Details">
                          <RemoveRedEyeOutlinedIcon
                            className={classes.dashIco}
                            onClick={() =>
                              navigate(
                                `/order-details/${item?.get_order_details?.[0]?.order_master_id}`
                              )
                            }
                          />
                        </Tooltip>
                      </Stack>
                    </Grid>
                    {/* <Grid item xSmall={5} borderBottom='1px solid black'>
                      <Typography
                        component="p"
                        className={classes.specificationWeight}
                        mb='5px'
                       style={{padding:"0px"}}
                      >
                        Review:
                      </Typography>
                    </Grid>
                    <Grid item xSmall={7} borderBottom='1px solid black'>
                      <Stack
                        direction="row"
                        spacing={{ xSmall: 1.9 }}
                        className={classes.imgBox}
                        style={{padding:"0px"}}
                      >
                        {item.status === "N" ? <TableCell
                          align="center">
                          <Button sx={{
                            color: "#2F8108",
                            cursor: "pointer",
                            padding:"0px",
                            textTransform: "capitalize"
                          }} onClick={() => handleOpen2(item)}
                            disabled={item?.review_status === "Y" ? true : false}
                          >
                            {item.status === "N"
                              ? "Review"
                              : ""}
                          </Button>
                        </TableCell> : null}
                      </Stack>
                    </Grid> */}
                  </>
                ))}
              </Grid>
            </Stack>
          </TableContainer>
        </>
      ) : (
        <>
          {!loader && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box component="img" src={noRecord} className={classes.noRec} />
            </Box>
          )}
        </>
      )}
      <ModalCommonRating
        open={open2}
        handleClose={handleClose2}
        handleOpen={handleOpen2}
        items={items}
        getHistory={getHistory}
      />
    </Container>
  );
}
