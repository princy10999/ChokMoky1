import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import { BaseURL } from "../../Api/Api";

// import ring from "../../Assests/images/new4.webp";

const useStyles = makeStyles()((theme) => {
  return {
    boxIntrest: {
      overflowY: "scroll",
      overflowX: "hidden",
      height: "378px",
      "&::-webkit-scrollbar": {
        width: "6px",
        borderRadius: "9px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#F2F2F2",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#35364F",
        borderRadius: "9px",
      },
    },
    interest: {
      padding: "15px 18px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid rgba(214, 214, 214, 0.4)",
      [theme.breakpoints.down("mobile")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    inLeft: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    inimg: {
      width: "94px",
      height: "auto",
      maxHeight: "100%",
      maxWidth: "100%",
      [theme.breakpoints.down("tab")]: {
        width: "75px",
      },
    },
    priceText: {
      marginTop: "9px",
      [theme.breakpoints.down("tab")]: {
        marginTop: "0px",
      },
    },
    priceline: {
      color: "#787877",
      textDecoration: " line-through",
      fontSize: "18px",
      lineHeight: "17px",
      fontFamily: "League Spartan",
      fontWeight: 400,
      [theme.breakpoints.down("tab")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "13px",
      },
    },
    price: {
      color: "#2F2F2D",
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "17px",
      fontFamily: "League Spartan",
      [theme.breakpoints.down("tab")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "13px",
      },
    },
    textbox: {
      marginLeft: "16px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      [theme.breakpoints.down("tab")]: {
        marginLeft: "12px",
      },
    },
    txthead: {
      color: "#2F2F2D",
      fontSize: "22px",
      fontWeight: 400,
      lineHeight: "21px",
      fontFamily: "League Spartan",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: "400px",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "21px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "19px",
      },
      [theme.breakpoints.down("smallLaptop")]: {
        width: "300px",
      },
      // [theme.breakpoints.down("mTab")]: {
      //   width: "300px",
      // },
      // [theme.breakpoints.down("mobile")]: {
      //   width: "300px",
      // },
      [theme.breakpoints.down("xTab")]: {
        width: "250px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "200px",
      },
      [theme.breakpoints.down("small")]: {
        width: "177px",
      },
    },
    sizeText: {
      marginTop: "7px",
      color: "#818183",
      fontSize: "16.5px",
      fontWeight: 400,
      lineHeight: "23px",
      fontFamily: "League Spartan",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: "300px",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "16px",
      },

      [theme.breakpoints.down("mobile")]: {
        fontSize: "15px",
        marginTop: "0px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "15px",
        marginTop: "0px",
      },
      [theme.breakpoints.down("xTab")]: {
        width: "250px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "180px",
      },
      [theme.breakpoints.down("small")]: {
        width: "177px",
      },
    },
    cartButt: {
      color: "#141524",
      borderColor: "#141524",
      borderRadius: "0px",
      width: "134px",
      height: "40px",
      fontSize: "15px",
      fontWeight: 500,
      lineHeight: "20px",
      fontFamily: "League Spartan",
      [theme.breakpoints.down("mobile")]: {
        marginTop: "8px",
      },
      "&:hover": {
        color: "#FFF",
        borderColor: "#BD3D3D",
        backgroundColor: "#BD3D3D",
      },
    },
  };
});

function InterestBox({ interestedProduct, incrementCounter }) {
  const { classes } = useStyles();
  return (
    <Box className={classes.boxIntrest}>
      {interestedProduct?.map((row) => {
        return (
          row?.stock > 0 &&
          <Box component="div" className={classes.interest}>
            <Box component="div" className={classes.inLeft}>
              <Box
                component="img"
                className={classes.inimg}
                src={BaseURL + row?.get_all_image?.[0]?.image}
                alt="ring"
              />
              <Box className={classes.textbox}>
                <Typography variant="h3" className={classes.txthead}>
                  {" "}
                  {row?.title}
                </Typography>

                <Typography variant="p" className={classes.sizeText}>
                  Size: {row?.size}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  className={classes.priceText}
                >
                  {/* <Typography component="p" className={classes.priceline}>
                    {row?.get_product_ind_price?.get_currency?.symbol}
                    {row?.get_product_ind_price?.price}
                  </Typography> */}

                  {row?.get_product_ind_price?.price !==
                    row?.get_product_ind_price?.after_discount_price &&
                    (row?.get_product_ind_price?.global_offer_applied === "Y" ||
                      row?.get_product_ind_price?.offer_applied === "Y") && (
                      <Typography component="p" className={classes.priceline}>
                        ₹
                        {row?.get_product_ind_price?.price
                          ? JSON.parse(
                            row?.get_product_ind_price?.price
                          ).toFixed(2)
                          : 0.0}
                      </Typography>
                    )}

                  <Typography component="p" className={classes.price}>
                    {`₹${row?.get_product_ind_price?.after_discount_price
                        ? JSON.parse(
                          row?.get_product_ind_price?.after_discount_price
                        ).toFixed(2)
                        : 0.0
                      }/-`}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Button
              variant="outlined"
              className={classes.cartButt}
              onClick={
                () =>
                  // Swal.fire({
                  //   // title: "<strong>Warning</strong>",
                  //   // icon: "warning",
                  //   // html: `Are you sure you want to add this product to cart?`,
                  //   // confirmButtonColor: "#BD3D3D",
                  //   // confirmButtonText: "Yes",
                  //   // showCancelButton: true,
                  //   // cancelButtonColor: "#1A1B2F",
                  // }).then(async (result) => {
                  //   if (result.isConfirmed) {
                  incrementCounter(row?.id)
                //   }
                // })
              }
            >
              Add to cart
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}

export default InterestBox;
