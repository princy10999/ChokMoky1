import React from "react";
import { makeStyles } from "tss-react/mui";
import {
  Box,
  Typography,
  Grid,
  Autocomplete,
  TextField,
  FormControl,
  Button,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ShoppingCartTable from "./ShoppingCartTable";
import { MobileDatePicker } from "@mui/x-date-pickers";
import calendar from "../Assests/images/calendar.webp";
import { useEffect, useState } from "react";
import { isLoader } from "../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import { ApiPost } from "../Api/Api";
import noRecord from "../Assests/images/no-record.webp";
import dateFormat from "dateformat";

const useStyles = makeStyles()((theme) => {
  return {
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
    profileGrid: {
      borderBottom: "9px solid #F4F4F4",
      paddingBottom: "40px",
    },
    saveButton: {
      padding: "18px 15px 12px 15px",
      backgroundColor: "#141524",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "0",
      height: "59px",
      width: "100%",
      position: "relative",
      zIndex: "2",
      overflow: "hidden",
      "&:hover": {
        backgroundColor: "#BD3D3D !important",
      },
      "&::before": {
        content: '""',
        opacity: 0,
        position: "absolute",
        transition: "all 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        width: "0%",
        height: "100%",
        background: "#BD3D3D",
        zIndex: "-1",
        top: "-50px",
        "-webkit-transform": "rotate(35deg)",
        transform: "rotate(35deg)",
      },
      "&::after": {
        background: "#fff",
        content: '""',
        opacity: 0,
        position: "absolute",
        top: "-50px",
        "-webkit-transform": "rotate(35deg)",
        transform: "rotate(35deg)",
        transition: "all 3s cubic-bezier(0.19, 1, 0.22, 1)",
        height: "20rem",
        width: "8rem",
        left: "-100%",
      },
      "&:hover::before": {
        left: "120%",
        opacity: "0.5",
      },
      "&:hover::after": {
        left: "200%",
        opacity: "0.6",
      },
      "&:hover .css-1nd3ojk-MuiTypography-root-buttonText": {
        color: "#fff",
      },
      "&:hover .css-1sg9l6o-banbutspan": {
        backgroundColor: "#fff",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "100%",
        minWidth: "100px",
      },
      [theme.breakpoints.down("iph")]: {
        height: "40px",
      },
    },
    buttonText: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "18px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#FFF",
      transition: "all 0.9s",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "14px",
      },
    },
    textField: {
      [`& label`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "18px !important",
        color: "#7E7F84",
        lineHeight: "30px",
        [theme.breakpoints.down("iph")]: {
          fontSize: "17px !important",
        },
      },
      [`& fieldset`]: {
        borderRadius: 0,
        borderColor: "#7E7F84 !important",
      },
      [`& div`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400 !important",
        fontSize: "18px !important",
        color: "#7E7F84",
        borderRadius: "0px !important",
        [theme.breakpoints.down("iph")]: {
          fontSize: "15px !important",
        },
      },
      [`& .Mui-error`]: {
        color: "#7E7F84 !important",
        height: "59px",
      },
      [`& .Mui-focused`]: {
        color: "#BD3D3D !important",
      },
      [`& .Mui-focused .MuiOutlinedInput-notchedOutline`]: {
        borderColor: "#BD3D3D !important",
      },
    },
    cartCont: {
      marginTop: "43px",
      [theme.breakpoints.down("iph")]: {
        marginTop: "25px",
      },
    },
    root: {
      marginTop: "25px",
      [`& ul`]: {
        justifyContent: "center",
      },
      [`& button`]: {
        fontSize: "20px",
        lineHeight: "24px",
        fontWeight: 600,
        color: "#676767",
        fontFamily: "League spartan",
        "& .MuiPaginationItem-root:hover": {
          borderRadius: "0px !important",
        },
        [theme.breakpoints.down("mobile")]: {
          fontSize: "16px",
          lineHeight: "20px",
        },
        [theme.breakpoints.down("small")]: {
          fontSize: "14px",
        },
      },
      "& .Mui-selected": {
        width: "21px",
        height: "21px",
        color: "#000",
        [theme.breakpoints.down("mobile")]: {
          width: "17px",
          height: "17px",
        },
        [theme.breakpoints.down("small")]: {
          width: "15px",
          height: "15px",
        },
      },
    },
    selected: {
      backgroundColor: "transparent !important",
      color: "#1A1B2F",
      padding: "0px 4px",
      borderBottom: " 0.7px solid #1A1B2F",
      borderRadius: "0px !important",
      "&:hover": {
        borderRadius: "0px !important",
      },
      [theme.breakpoints.down("small")]: {
        fontSize: "0.6rem",
      },
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

const status = [
  {
    name: "Delivered",
  },
  {
    name: "Initiated",
  },
  {
    name: "Canceled",
  },
  {
    name: "Failed",
  },
];

const OrderHistoryMain = () => {
  const { classes } = useStyles();
  const [stat, setStat] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getHistory();
  }, [page]);

  const getHistory = () => {
    let data = {
      params: {
        status:
          stat === "Initiated"
            ? "I"
            : stat === "Delivered"
            ? "N"
            : stat === "Canceled"
            ? "C"
            : stat === "Failed"
            ? "F"
            : "",
        from_date: fromDate !== "" ? dateFormat(fromDate, "yyyy-mm-dd") : "",
        to_date: toDate !== "" ? dateFormat(toDate, "yyyy-mm-dd") : "",
        page_no: page,
      },
    };
    dispatch(isLoader(true));
    setLoader(true);
    ApiPost("order-history", data).then((res) => {
      setOrderList(res?.data?.orderlist);
      setCount(res?.data?.page_count);
      dispatch(isLoader(false));
      setLoader(false);
    });
  };

  const handleChange = (newValue) => {
    setFromDate(newValue);
  };
  const handleChange1 = (newValue) => {
    setToDate(newValue);
  };
  const onPageChange = (e, pageNumber) => {
    setPage(pageNumber);
    getHistory();
  };
  const handleReset = () => {
    setStat("");
    setFromDate("");
    setToDate("");
    let data = {
      params: {
        status: "",
        from_date: "",
        to_date: "",
        page_no: 1,
      },
    };
    dispatch(isLoader(true));
    setLoader(true);
    ApiPost("order-history", data).then((res) => {
      setOrderList(res?.data?.orderlist);
      setCount(res?.data?.page_count);
      dispatch(isLoader(false));
      setLoader(false);
    });
  };

  return (
    <Box className={classes.profileBox}>
      <Typography variant="h1" className={classes.profileHead}>
        Order History
      </Typography>
      <Grid container spacing={2.75}>
        <Grid
          item
          xSmall={12}
          small={12}
          iph={6}
          mobile={4}
          tab={2.8}
          laptop={4}
          desktop={2.8}
        >
          <Autocomplete
            options={status?.map((e) => e?.name)}
            className={classes.textField}
            name="status"
            value={stat}
            onChange={(e, newValue) => {
              setStat(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
        </Grid>
        <Grid
          item
          xSmall={12}
          small={12}
          iph={6}
          mobile={4}
          tab={2.8}
          laptop={4}
          desktop={2.8}
        >
          <FormControl
            fullWidth
            className={classes.textField}
            style={{ position: "relative" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="From Date"
                inputFormat="DD/MM/YYYY"
                value={fromDate}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <Box width={40} position="absolute" right="0px" top="20px">
                <img
                  src={calendar}
                  alt="calender"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid
          item
          xSmall={12}
          small={12}
          iph={6}
          mobile={4}
          tab={2.8}
          laptop={4}
          desktop={2.8}
        >
          <FormControl
            fullWidth
            className={classes.textField}
            style={{ position: "relative" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                className={classes.datepiker}
                label="To Date"
                inputFormat="DD/MM/YYYY"
                value={toDate}
                onChange={handleChange1}
                minDate={fromDate}
                renderInput={(params) => <TextField {...params} />}
              />
              <Box width={40} position="absolute" right="0px" top="20px">
                <img
                  src={calendar}
                  alt="calender"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid
          item
          xSmall={12}
          small={12}
          iph={3}
          mobile={4}
          tab={1.8}
          laptop={4}
          desktop={1.8}
        >
          <Button
            className={classes.saveButton}
            variant="contained"
            type="submit"
            disableRipple
            onClick={getHistory}
          >
            <Typography className={classes.buttonText}>Search</Typography>
          </Button>
        </Grid>
        <Grid
          item
          xSmall={12}
          small={12}
          iph={3}
          mobile={4}
          tab={1.8}
          laptop={4}
          desktop={1.8}
        >
          <Button
            className={classes.saveButton}
            variant="contained"
            type="button"
            disableRipple
            onClick={handleReset}
          >
            <Typography className={classes.buttonText}>Reset</Typography>
          </Button>
        </Grid>
      </Grid>
      <Box component="div" className={classes.cartCont}>
        {orderList && orderList.length > 0 ? (
          <ShoppingCartTable
            order={orderList}
            loader={loader}
            setOrder={setOrderList}
            getHistory={getHistory}
          />
        ) : (
          <>
            {!loader && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box component="img" src={noRecord} className={classes.noRec} />
              </Box>
            )}
          </>
        )}
      </Box>
      {orderList && orderList.length > 0 && (
        <>
          {count > 1 && (
            <Pagination
              count={count}
              onChange={onPageChange}
              className={classes.root}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  classes={{ selected: classes.selected }}
                />
              )}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default OrderHistoryMain;
