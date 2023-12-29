import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import collectionService from "../Assests/images/collectservice.webp";
import { BaseURL } from "../Api/Api";

const useStyles = makeStyles()((theme) => {
  return {
    ImageBox: {
      width: "auto",
      height: "100%",
      backgroundImage: `url(${collectionService})`,
      backgroundRepeat: "norepeat",
      backgroundSize: "cover",
      overFlow: "hidden",
      marginTop: "4.5rem",
      marginBottom: "-5px",
      [theme.breakpoints.down("mobile")]: {
        marginTop: "33px",
      },
    },
    dataMain: {
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "15px 30px",
      [theme.breakpoints.down("tab")]: {
        width: "100%",
        padding: "25px 30px",
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "10px 0",
      },
    },
    bannerText: {
      // padding: "15px 0px",
      ".MuiGrid-root:nth-child(1),.MuiGrid-root:nth-child(2)": {
        borderRight: "1px solid white",

        "&:hover ": {
          backgroundColor: "#BD3D3D",
        },
        "&:hover h6": {
          color: "white",
        },

        "&:hover p": {
          color: "white",
        },

        "&:hover .bannerTexth6": {
          backgroundColor: "rgba(217, 165, 152, 0.6)",
        },
        "&:hover .MuiBox-root:nth-child(1)": {
          transform: "scale(1.1)",
          border: "1px dashed #FFFFFF",
          color: "white",
          display: "none",
        },
        "&:hover .MuiBox-root:nth-child(2)": {
          transform: "scale(1.1)",
          border: "1px dashed #FFFFFF",
          color: "white",
          display: "block ",
        },
      },
      ".MuiGrid-root:nth-child(3)": {
        "&:hover ": {
          backgroundColor: "#BD3D3D",
        },
        "&:hover h6": {
          color: "white",
        },
        "&:hover p": {
          color: "white",
        },
        "&:hover .MuiBox-root:nth-child(1)": {
          transform: "scale(1.1)",
          border: "1px dashed #FFFFFF",
          color: "white",
          display: "none",
        },
        "&:hover .MuiBox-root:nth-child(2)": {
          transform: "scale(1.1)",
          border: "1px dashed #FFFFFF",
          color: "white",
          display: "block ",
        },
      },
      [theme.breakpoints.up("tab")]: {
        flexWrap: "nowrap",
      },
      [theme.breakpoints.down("tab")]: {
        flexWrap: "wrap",
        ".MuiGrid-root:nth-child(2),.MuiGrid-root:nth-child(3)": {
          borderTop: "1px solid white",
        },
        ".MuiGrid-root:nth-child(1),.MuiGrid-root:nth-child(2)": {
          borderRight: "0px ",
        },
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "0px",
      },
    },
    bannerTexth6: {
      fontFamily: "Playfair Display",
      fontStyle: "normal",
      fontSize: "30px",
      lineHeight: "40px",
      textAlign: "center",
      letterSpacing: "0.01em",
      marginBottom: "5px",
      backgroundColor: "rgba(217, 165, 152, 0.6)",
      // paddingLeft: "30px",
      // paddingRight: "30px",
    },

    bannerTexth1: {
      fontFamily: "Playfair Display",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "75px",
      lineHeight: "88px",
      textAlign: "center",
      letterSpacing: "0.02em",
      textTransform: "capitalize",
      color: "#FFFFFF",
      marginBottom: "35px",
    },
    nextImg: {
      border: "1px dashed #FFFFFF",
      borderRadius: "50%",
      padding: 15,
      transition: "all 0.5s ease-in-out",
      display: "none",
      width: "85px",
      height: "85px",
    },
    colImgimg: {
      width: "85px",
      height: "85px",
      border: "1px dashed #BD3D3D",
      borderRadius: "50%",
      padding: 15,
      transition: "all 0.5s ease-in-out",
    },
    text: {
      fontSize: "24px",
      fontWeight: "500",
      marginTop: "10px",
      fontFamily: "League Spartan",
      lineHeight: "22.08px",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "17px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "22px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "17px",
      },
    },
    subText: {
      fontSize: "17px",
      fontWeight: "500",
      fontFamily: "League Spartan",
      lineHeight: "23.19px",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "17px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "14px",
      },
    },
  };
});
// const data = [
//   {
//     image: Mask,
//     image2: group1,
//     text: "Payment & Delivery",
//     subText: "Free shipping for orders over ₹18,000",
//   },
//   {
//     image: Mask2,
//     image2: group2,
//     text: "Easy Return & Refund",
//     subText: "Free 100% money back guarantee",
//   },
//   {
//     image: Mask3,
//     image2: group3,
//     text: "Quality Support",
//     subText: "Always online feedback 24/7",
//   },
// ];
function CollectionPolicy({ data }) {
  const updateData = [
    {
      image:
        BaseURL + `storage/app/public/footer_image/` + data?.footer?.image1,
      image2:
        BaseURL + `storage/app/public/footer_image/` + data?.footer?.image1_hov,
      text: data?.footer?.heading_1,
      subText: data?.footer?.sub_heading_1,
    },
    {
      image:
        BaseURL + `storage/app/public/footer_image/` + data?.footer?.image2,
      image2:
        BaseURL + `storage/app/public/footer_image/` + data?.footer?.image2_hov,
      text: data?.footer?.heading_2,
      subText: data?.footer?.sub_heading_2,
    },
    {
      image:
        BaseURL + `storage/app/public/footer_image/` + data?.footer?.image3,
      image2:
        BaseURL + `storage/app/public/footer_image/` + data?.footer?.image3_hov,
      text: data?.footer?.heading_3,
      subText: data?.footer?.sub_heading_3,
    },
  ];

  const { classes } = useStyles();
  return (
    <>
      <Box component="div" disableGutters className={classes.ImageBox}>
        <Box component="div">
          <Box className={classes?.bannerTexth6}>
            <Grid container spacing={0} className={classes.bannerText}>
              {updateData?.map((e) => {
                return (
                  <Grid
                    item
                    laptop={5}
                    desktop={5}
                    tab={4}
                    className={classes.dataMain}
                  >
                    <Box
                      component="img"
                      className={classes.colImgimg}
                      src={e?.image}
                      alt={e?.text}
                    />

                    <Box
                      component="img"
                      className={classes.nextImg}
                      src={e?.image2}
                      alt={e?.text}
                    />

                    <Typography component="h6" className={classes.text}>
                      {e?.text}
                    </Typography>
                    <Typography component="p" className={classes.subText}>
                      {e?.subText}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default CollectionPolicy;
