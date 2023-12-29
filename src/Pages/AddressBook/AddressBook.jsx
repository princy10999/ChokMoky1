import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Button, Grid, Typography } from "@mui/material";
import SideBar from "../../Components/Common/SideBar";
import { useEffect } from "react";
import { BiBookAdd } from "react-icons/bi";
import AddressBookBox from "../../Components/Common/AddressBookBox";
import { Link } from "react-router-dom";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import { ApiPost } from "../../Api/Api";
import noRecord from "../../Assests/images/no-record.webp";

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
    profileBox: {
      width: "100%",
      marginLeft: "16px",
      padding: "82px 0px 52px 36px!important",
      margin: "0px !important",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "9px",
        backgroundColor: "#F4F4F4",
        bottom: 0,
        left: "0px",
      },
      [theme.breakpoints.down("smallLaptop")]: {
        padding: "92px 0px 67px 26px !important",
      },
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
      marginBottom: "26px",
    },
    addButton: {
      textTransform: "none",
      display: "flex",
      borderRadius: "0px",
      height: "45px",
      justifyContent: "space-between",
      fontFamily: "League Spartan !important",
      fontWeight: "500 !important",
      fontSize: "18px !important",
      lineHeight: "20px",
    },
    noRec: {
      width: "22em",
      height: "15em",
      margin: "10px auto",
      [theme.breakpoints.down("iph")]: {
        width: "15em",
        height: "10em",
        margin: "0px auto",
      },
    },
  };
});

function AddressBook() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [addressList, setAddressList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "AddressBook - Chokmoki";
    dispatch(isLoader(true));
    setLoader(true);
    ApiPost("address-list").then((res) => {
      setAddressList(res?.data?.details);
      dispatch(isLoader(false));
      setLoader(false);
    });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  const AddressBookMain = () => {
    return (
      <Box className={classes.profileBox}>
        <Typography variant="h1" className={classes.profileHead}>
          Address Book
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            className={classes.addButton}
            startIcon={<BiBookAdd />}
            component={Link}
            to="/add-address"
          >
            Add Address
          </Button>
        </Box>
        <Box sx={{ pt: "20px" }}>
          <Box sx={{ flexGrow: 1 }}>
            {addressList && addressList.length > 0 ? (
              <Grid container columnSpacing={2}>
                {addressList.map((item, index) => {
                  return (
                    <Grid
                      item
                      xSmall={12}
                      small={12}
                      iph={6}
                      mobile={6}
                      laptop={6}
                      key={index}
                    >
                      <AddressBookBox
                        address={item}
                        setAddressList={setAddressList}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <>
                {!loader && (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box
                      component="img"
                      src={noRecord}
                      className={classes.noRec}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box className={classes.ProductPage}>
        <Box className={classes.topColor}></Box>
        <Box className={classes.mainBox}>
          <SideBar />
          <AddressBookMain />
        </Box>
      </Box>
    </Box>
  );
}

export default AddressBook;
