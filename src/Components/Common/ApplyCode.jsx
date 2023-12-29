import React from "react";
import { makeStyles } from "tss-react/mui";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import coupon from "../../Assests/images/coupon.webp";
import { useState } from "react";
import { useEffect } from "react";

const useStyles = makeStyles()((theme) => {
  return {
    apply: {
      border: "1px solid #CACACA",
      display: "flex",
      alignItems: "center",
      padding: "17px 20px",
      width: "556px",
      height: "58px",
      [theme.breakpoints.down("tab")]: {
        width: "542px",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "448px",
        height: "48px",
        padding: "15px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "326px",
        height: "42px",
      },
      [theme.breakpoints.down("small")]: {
        width: "292px",
      },
    },
    coupimg: {
      width: "24px",
      height: "24px",
      [theme.breakpoints.down("mobile")]: {
        width: "20px",
        height: "20px",
      },
    },
    textPart: {
      fontFamily: "League Spartan",
      fontStyle: "Regular",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "17px",
      TextAlign: "Left",
      verticalAlign: "Top",
      letterSpacing: "3%",
      color: "#7E7F84",
      marginLeft: "18px",
      flex: 1,
      [theme.breakpoints.down("mobile")]: {
        fontSize: "16px",
        marginLeft: "12px",
      },
    },
    applybutt: {
      fontFamily: "League Spartan",
      fontStyle: "Regular",
      fontSize: "18px",
      lineHeight: "18px",
      fontWeight: 500,
      TextAlign: "Left",
      verticalAlign: "Top",
      letterSpacing: "7%",
      textTransform: "uppercase",
      color: "#35364F",
      paddingLeft: "23px",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "16px",
        paddingLeft: "15px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "15px",
      },
      "&:hover": {
        color: "#BD3D3D",
      },
    },
    botthead: {
      fontWeight: 400,
      lineHeight: "18px",
      fontFamily: "League Spartan",
      color: "#BD3D3D",
    },
  };
});

function ApplyCode({ coupanCodeFunction, couponCode }) {
  const [coupanCode, setCoupanCode] = useState();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const handleStationChange = (e) => {
    setCoupanCode(e.target.value);
  };
  const { classes } = useStyles();
  return (
    <>
      <Paper component="form" elevation={0} square className={classes.apply}>
        <IconButton disableRipple sx={{ p: 0 }}>
          <Box
            component="img"
            src={coupon}
            alt="coupon"
            className={classes.coupimg}
          />
        </IconButton>
        <InputBase
          value={coupanCode}
          onChange={handleStationChange}
          className={classes.textPart}
          placeholder="Coupon Code"
          inputProps={{ "aria-label": "Coupon Code" }}
        />
        <Divider sx={{ height: 25, color: "#CACACA" }} orientation="vertical" />
        <IconButton
          disableRipple
          className={classes.applybutt}
          sx={{ p: 0 }}
          onClick={() => coupanCodeFunction(coupanCode)}
        >
          Apply code
        </IconButton>
      </Paper>
      {couponCode?.coupon_details?.id && (
        <Box
          display={"flex"}
          justifyContent="space-between"
          width={"78%"}
          alignItems="center"
        >
          <Typography variant="h6" className={classes.botthead}>
            {couponCode?.message}
          </Typography>
          <Button
            variant="Cancel"
            className={classes.applybutt}
            onClick={() => {
              coupanCodeFunction("cancel");
              setCoupanCode("");
            }}
            sx={{ p: 2 }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </>
  );
}

export default ApplyCode;
