import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useLocation } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/system";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Grid, Stack, Tooltip, Typography } from "@mui/material";
import Counter from "./Counter";
import { BaseURL } from "../../Api/Api";
import { useEffect } from "react";

const useStyles = makeStyles()((theme) => {
  return {
    containerBox: {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
    tablerow: {
      backgroundColor: "#F8F8F8",
    },
    tableHeadName: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "22px",
      lineHeight: "39px",
      padding: "20px 10px 14px 10px",
      border: "none",
      color: "#3D3D47",
      whiteSpace: "nowrap",
      maxWidth: "100%",
      "&:first-child": {
        paddingLeft: "29px",
        width: "37%",
        [theme.breakpoints.down("tab")]: {
          paddingLeft: "15px",
        },
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "18px",
      },
    },
    tableHeadName2: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "17px",
      border: "none",
      color: "#3D3D47",
      whiteSpace: "nowrap",
      maxWidth: "100%",
    },
    productName: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "22px",
      lineHeight: "20.24px",
      border: "none",
      color: "#2F2F2D",
      marginTop: "5px",
      marginBottom: "12px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "300px",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "17px",
        lineHeight: "17px",
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
      fontSize: "19px",
      lineHeight: "17.48px",
      color: "#3D3D47",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("tab")]: {
        fontSize: "14px",
      },
    },
    prodCont: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
    table: {
      display: "block",
      [theme.breakpoints.down("iph")]: {
        display: "none",
      },
    },
    table2: {
      display: "none",
      [theme.breakpoints.down("iph")]: {
        display: "block",
      },
    },
  };
});

export default function ShoppingCartTable({
  removeFromCart,
  decrementCounter,
  incrementCounter,
  cartListFromApi,
  shippingCharge,
}) {
  const { classes } = useStyles();
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  return (
    <Container className={classes.containerBox}>
      <TableContainer className={classes.table}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow className={classes.tablerow}>
              <TableCell className={classes.tableHeadName}>Product</TableCell>
              <TableCell className={classes.tableHeadName} align="center">
                Price
              </TableCell>
              <TableCell className={classes.tableHeadName} align="center">
                Quantity
              </TableCell>
              <TableCell className={classes.tableHeadName} align="center">
                Subtotal
              </TableCell>
              {location.pathname === "/cart" && (
                <TableCell className={classes.tableHeadName} align="center">
                  Remove
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: "none", boxShadow: "none" }}>
            {cartListFromApi?.map((row) => {
              return (
                <TableRow key={row.name} sx={{ boxShadow: "none" }}>
                  <TableCell
                    scope="row"
                    sx={(theme) => ({
                      pl: "29px",
                      [theme.breakpoints.down("tab")]: { pl: "15px" },
                    })}
                  >
                    <Stack
                      direction="row"
                      spacing={{ xSmall: 1.9 }}
                      className={classes.orderDate}
                    >
                      <Box
                        component="img"
                        src={
                          BaseURL +
                          row?.get_product_details?.get_all_image[0]?.image
                        }
                        alt="product"
                        className={classes.Img}
                      />
                      <Box className={classes.prodCont}>
                        <Typography className={classes.productName}>
                          {row?.get_product_details?.title.length > 31
                            ? row?.get_product_details?.title.substr(0, 30) +
                              "..."
                            : row?.get_product_details?.title}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell className={classes.orderDate} align="center">
                    ₹{row?.get_product_details?.get_product_ind_price?.price}
                  </TableCell>
                  <TableCell className={classes.orderDate} align="center">
                    {location?.pathname === "/cart" ? (
                      <Counter
                        stock={row?.get_product_details?.stock}
                        decrementCounter={decrementCounter}
                        incrementCounter={incrementCounter}
                        counter={row?.qty}
                        id={row?.product_id}
                        cartid={row?.id}
                      />
                    ) : (
                      row.qty
                    )}
                  </TableCell>
                  <TableCell className={classes.orderDate} align="center">
                    ₹
                    {row?.get_product_details?.get_product_ind_price?.price *
                      row?.qty}
                  </TableCell>
                  {location?.pathname === "/cart" && (
                    <TableCell align="center">
                      <Tooltip
                        title="Remove"
                        onClick={() =>
                          Swal.fire({
                            title: "<strong>Warning</strong>",
                            icon: "warning",
                            html: `Are you sure you want to remove this product from cart?`,
                            showCancelButton: true,
                            cancelButtonColor: "#1A1B2F",
                            confirmButtonColor: "#BD3D3D",
                            confirmButtonText: "Yes",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              removeFromCart(row?.id);
                            }
                          })
                        }
                      >
                        <CloseIcon className={classes.dashIco} />
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer className={classes.table2}>
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
          {cartListFromApi?.map((row, index) => (
            <>
              <Grid item xSmall={5}>
                <Typography component="p" className={classes.tableHeadName2}>
                  Product:
                </Typography>
              </Grid>
              <Grid item xSmall={7}>
                <Box
                  component="img"
                  src={
                    BaseURL + row?.get_product_details?.get_all_image[0]?.image
                  }
                  alt="product"
                  className={classes.Img}
                />
                <Box className={classes.prodCont}>
                  <Typography className={classes.productName}>
                    {row?.get_product_details?.title.length > 31
                      ? row?.get_product_details?.title
                      : row?.get_product_details?.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xSmall={5}>
                <Typography component="p" className={classes.tableHeadName2}>
                  Price:
                </Typography>
              </Grid>
              <Grid item xSmall={7}>
                <Stack
                  direction="row"
                  spacing={{ xSmall: 1.9 }}
                  className={classes.orderDate}
                >
                  ₹{row?.get_product_details?.get_product_ind_price?.price}
                </Stack>
              </Grid>
              <Grid item xSmall={5}>
                <Typography component="p" className={classes.tableHeadName2}>
                  Quantity:
                </Typography>
              </Grid>
              <Grid item xSmall={7}>
                <Stack
                  direction="row"
                  spacing={{ xSmall: 1.9 }}
                  className={classes.orderDate}
                >
                  {location?.pathname === "/cart" ? (
                    <Counter
                      decrementCounter={decrementCounter}
                      incrementCounter={incrementCounter}
                      counter={row?.qty}
                      id={row?.product_id}
                      cartid={row?.id}
                    />
                  ) : (
                    row.qty
                  )}
                </Stack>
              </Grid>
              <Grid item xSmall={5}>
                <Typography component="p" className={classes.tableHeadName2}>
                  Subtotal:
                </Typography>
              </Grid>
              <Grid item xSmall={7}>
                <Stack
                  direction="row"
                  spacing={{ xSmall: 1.9 }}
                  className={classes.orderDate}
                >
                  ₹
                  {row?.get_product_details?.get_product_ind_price?.price *
                    row?.qty}
                </Stack>
              </Grid>
              <Grid item xSmall={5} borderBottom="1px solid black">
                {location?.pathname === "/cart" && (
                  <Typography
                    component="p"
                    className={classes.tableHeadName2}
                    mb="5px"
                  >
                    Remove:
                  </Typography>
                )}
              </Grid>
              <Grid item xSmall={7} borderBottom="1px solid black">
                <Stack
                  direction="row"
                  spacing={{ xSmall: 1.9 }}
                  className={classes.orderDate}
                >
                  {location?.pathname === "/cart" && (
                    <Tooltip
                      title="Remove"
                      onClick={
                        () =>
                          // Swal.fire({
                          //   title: "<strong>Warning</strong>",
                          //   icon: "warning",
                          //   html: `Are you sure you want to remove this product from cart?`,
                          //   showCancelButton: true,
                          //   cancelButtonColor: "#1A1B2F",
                          //   confirmButtonColor: "#BD3D3D",
                          //   confirmButtonText: "Yes",
                          // }).then(async (result) => {
                          //   if (result.isConfirmed) {
                          removeFromCart(row?.id)
                        // }
                        //   })
                      }
                    >
                      <CloseIcon className={classes.dashIco} />
                    </Tooltip>
                  )}
                </Stack>
              </Grid>
            </>
          ))}
        </Grid>
      </TableContainer>
    </Container>
  );
}
