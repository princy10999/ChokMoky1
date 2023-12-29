import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import CommonSelect from "./Common/CommonSelect";
import Slider from "@mui/material/Slider";
import SelectStartAdornment from "./Common/SelectStartAdornment";
import { Animated } from "react-animated-css";

const useStyles = makeStyles()((theme) => {
  return {
    selectMain: {
      padding: "10px 0px 30px 0px",
      [theme.breakpoints.down("laptop")]: {
        padding: "0rem 3rem 2rem 3rem",
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "0rem 1rem 2rem 1rem",
      },
      "div div form div": {
        width: "100%",
      },
      "div div a": {
        height: "45px !important",
        [theme.breakpoints.down("tab")]: {
          marginTop: "10px",
        },
      },
    },
    selectStack: {
      flexWrap: "nowrap",
      [theme.breakpoints.down("tab")]: {
        flexWrap: "wrap",
      },
    },
    pricerange: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "18px",
      letterSpacing: "0.03em",
      color: "black",
      marginTop: "-10px",
      [theme.breakpoints.down("mobile")]: {
        marginTop: "10px",
      },
    },
    priceRangeMain: {
      display: "flex",
    },
    priceRangeMin: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "15px",
      letterSpacing: "0.03em",
      color: "#818183",
    },
    priceRangeCenter: {
      marginLeft: "5px",
      marginRight: "5px",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "15px",
      letterSpacing: "0.03em",
      color: "#818183",
    },
    priceRangeMax: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "15px",
      letterSpacing: "0.03em",
      color: "#818183",
    },
    slider: {
      width: "90% !important",
      margin: "0px 10px !important",
      [theme.breakpoints.down("xxlDesktop")]: {
        width: "94.4% !important",
      },
      [theme.breakpoints.down("xlDesktop")]: {
        width: "94% !important",
      },
      [theme.breakpoints.down("xDesktop")]: {
        width: "93% !important",
      },
    },
    textField: {
      width: "100%",
      div: {
        width: "100%",
        [theme.breakpoints.down("tab")]: {
          marginTop: "11px",
        },
      },
      input: {
        padding: "10.5px !important",
      },
      [`& fieldset`]: {
        borderRadius: 0,
      },
      label: {
        fontFamily: "League Spartan",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "17px",
        color: "#7E7F84",
        top: "-5px",
        [theme.breakpoints.down("tab")]: {
          top: "4px",
        },
      },
    },
    category: {
      [theme.breakpoints.down("tab")]: {
        marginTop: "10px",
      },
    },
    bannButto: {
      padding: "15px 20px 15px 17px",
      marginTop: "2px",
      backgroundColor: "#BD3D3D",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "0",
      height: "44px",
      width: "100%",
      color: "#FFFF",
      position: "relative",
      zIndex: "2",
      overflow: "hidden",
      "&:hover": {
        backgroundColor: "#1A1B2F !important",
      },
      "&::before": {
        content: '""',
        opacity: 0,
        position: "absolute",
        transition: "all 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        width: "0%",
        height: "100%",
        background: "#141524",
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
      "&:hover .css-kzg10w-buttStrong": {
        color: "#FFFF",
      },
      "&:hover .css-1avwszq-banbutspan": {
        backgroundColor: "#141524!important",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "100%",
        minWidth: "150px",
        height: "40px",
      },
    },
    buttStrong: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "18px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#FFFF",
      transition: "all 0.9s",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "14px",
      },
    },
    banbutspan: {
      display: "block !important",
      marginRight: "10px !important",
      width: "30px !important",
      height: "2px !important",
      transition: "all 0.9s",
      backgroundColor: "#fff !important",
      position: "relative !important",
      zIndex: 4,
      "&::before": {
        display: "none !important",
      },
    },
  };
});
const keyWord = [
  {
    name: "High to Low",
    value: "htl",
  },
  {
    name: "Low to High",
    value: "lth",
  },
  {
    name: "A-Z",
    value: "atz",
  },
  {
    name: "Z-A",
    value: "zta",
  },
];

const SelectSection = (props) => {
  const { classes } = useStyles();

  const handleChange2 = (event, newValue) => {
    props?.setValueRange(newValue);
  };
  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <Box
        className={classes.selectMain}
        sx={(theme) => ({
          margin: props?.m,
          borderBottom: props?.b,
          [theme.breakpoints.down("desktop")]: {
            margin: props?.desktopm,
          },
          [theme.breakpoints.down("laptop")]: {
            margin: props?.laptopm,
          },
        })}
      >
        <Grid
          container
          spacing={{ xSmall: 1, iph: 2, laptop: 2, xxlDesktop: 2 }}
          columns={{
            xSmall: 4,
            iph: 4,
            mobile: 12,
            laptop: 16,
            xxlDesktop: 16,
          }}
        >
          <Grid
            item
            xSmall={4}
            iph={4}
            mobile={4}
            laptop={props.categoryShow ? 5.3 : 3.2}
            xxlDesktop={props.categoryShow ? 5.3 : 3.2}
          >
            <TextField
              // spellCheck={true}
              className={classes.textField}
              id="Keywords"
              label="Keywords"
              value={props.keyword}
              onChange={(e) => props.setKeyword(e?.target?.value)}
              sx={(theme) => ({
                marginTop: "2px",
                width: "100%",
              })}
            />
          </Grid>
          {props.categoryShow && (
            <Grid
              item
              xSmall={4}
              iph={4}
              mobile={4}
              laptop={5.3}
              xxlDesktop={5.3}
            >
              <CommonSelect
                className={classes.textField}
                title="Category"
                name="category"
                options={props?.categoryListData}
                value={props?.category}
                inputValue={props?.inputValue}
                setValue={props?.setCategory}
                setInputValue={props?.setInputValue}
              />
            </Grid>
          )}
          {props.subCategoryShow && (
            <Grid
              item
              xSmall={4}
              iph={4}
              mobile={4}
              laptop={5.3}
              xxlDesktop={5.3}
            >
              <CommonSelect
                className={classes.textField}
                title="Sub category"
                name="Sub_category"
                subCateApi={props?.subCateApi}
                options={props?.subcategoryListData}
                value={props?.value2}
                inputValue={props?.inputValue2}
                setValue={props?.setValue2}
                setInputValue={props?.setInputValue2}
              />
            </Grid>
          )}
          <Grid
            item
            xSmall={4}
            iph={4}
            mobile={4}
            laptop={props.categoryShow ? 5.3 : 3.2}
            xxlDesktop={props.categoryShow ? 5.3 : 3.2}
          >
            <Typography variant="h6" className={classes.pricerange}>
              Price range
            </Typography>
            <Slider
              className={classes.slider}
              min={+props?.minPrice}
              max={+props?.maxPrice}
              getAriaLabel={() => "Temperature range"}
              value={props?.valueRange}
              onChange={handleChange2}
              valueLabelDisplay="auto"
            />
            <Box
              item
              xSmall={4}
              iph={4}
              mobile={2}
              stab={4}
              laptop={5.3}
              xlDesktop={2.3}
              className={classes.priceRangeMain}
            >
              <Typography variant="h6" className={classes.priceRangeMin}>
                ₹{props?.valueRange[0]}
              </Typography>
              <Typography variant="h6" className={classes.priceRangeCenter}>
                -
              </Typography>
              <Typography variant="h6" className={classes.priceRangeMax}>
                ₹{props?.valueRange[1]}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xSmall={4}
            iph={4}
            mobile={4}
            laptop={props.categoryShow ? 5.3 : 3.2}
            xxlDesktop={props.categoryShow ? 5.3 : 3.2}
          >
            <SelectStartAdornment
              className={classes.textField}
              inputAdornment="Sort By :"
              options={keyWord}
              value={props?.shortBy}
              inputValue={props?.inputValue2}
              setValue={props?.setShortBy}
              setInputValue={props?.setInputValue2}
            />
          </Grid>
          <Grid
            item
            xSmall={4}
            iph={4}
            stab={4}
            laptop={props.categoryShow ? 2.65 : 3.2}
            xxlDesktop={props.categoryShow ? 2.65 : 3.2}
          >
            <Button
              className={classes.bannButto}
              sx={(theme) => ({
                [theme.breakpoints.down("tab")]: {
                  marginTop: props.categoryShow ? "13px" : "0px",
                },
              })}
              variant="contained"
              fullWidth
              type="button"
              disableRipple
              onClick={() => {
                props.onClick("");
                props.handleOpen();
              }}
            >
              <Box component="span" className={classes.banbutspan}></Box>
              <Box component="strong" className={classes.buttStrong}>
                Search
              </Box>
            </Button>
          </Grid>
          <Grid
            item
            xSmall={4}
            iph={4}
            stab={4}
            laptop={props.categoryShow ? 2.65 : 3.2}
            xxlDesktop={props.categoryShow ? 2.65 : 3.2}
          >
            <Button
              className={classes.bannButto}
              variant="contained"
              fullWidth
              type="button"
              disableRipple
              onClick={() => {
                props.reset();
                props.handleOpen();
              }}
            >
              <Box component="span" className={classes.banbutspan}></Box>
              <Box component="strong" className={classes.buttStrong}>
                Reset
              </Box>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Animated>
  );
};
export default SelectSection;
