import { Box, Typography, Modal, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import CloseIcon from "@mui/icons-material/Close";
import { ApiPost } from "../../Api/Api";
// import swal from "sweetalert";
import StyledButton2 from "./StyledButton2";
import Rating from "@mui/material/Rating";
// import Swal from "sweetalert2";

const useStyles = makeStyles()((theme) => {
  return {
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 800,
      background: "white",
      borderRadius: "10px",
      boxShadow: 24,
      p: 4,
      [theme.breakpoints.down("tab")]: {
        width: "100%",
        height: "auto",
      },
      svg: {
        top: "24px",
        right: "19px",
      },
    },
    style2: {
      margin: "4px 20px 20px 20px",
      padding: "18px 5px 20px 5px",
      // boxShadow: "#80808073 1px 1px 11px 0px",
      // borderRadius: "10px",
      borderTop: "1px solid #ececec",
    },
    loginForm: {
      padding: "20px",
    },
    close: {
      position: "absolute",
      top: "10px",
      right: "10px",
      cursor: "pointer",
    },
    err: {
      color: "#EB222C",
      fontSize: "15px",
    },
    loginHead: {
      fontFamily: "League Spartan",
      fontWeight: "500",
      fontSize: "39px",
      lineHeight: "36px",
      color: "#35364F",
      marginBottom: "10px",
      [theme.breakpoints.down("iph")]: {
        fontSize: "30px",
      },
    },
    error: {
      padding: "10px",
      marginBottom: "10px",
    },
    rate: {
      label: {
        cursor: "inherit",
        paddingRight: "7px",
        fontSize: "2.4rem",
        // border: "1px solid rgba(0, 0, 0, 0.23)",
        // marginRight: "15px",
      },
    },
  };
});
const ModalCommonRating = ({
  getOrderDetails,
  open,
  handleClose,
  items,
  orderDetail,
}) => {
  const { classes } = useStyles();
  const [data, setData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e?.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const saveRating = () => {
    if (data?.rate) {
      const body = {
        params: {
          order_id: orderDetail?.id,
          order_details_id: items?.id,
          product_id: items?.get_product_details?.id,
          comment: data?.comment ? data?.comment : null,
          rating: data?.rate,
        },
      };
      ApiPost("post-review", body).then((res) => {
        if (res?.data?.result?.message === "Error") {
          // swal({
          //     title: "Warning",
          //     text: res?.data?.result?.meaning,
          //     icon: "warning",
          // })
          handleClose();
          setData({});
        } else {
          getOrderDetails();
          // swal({
          //     title: "Success",
          //     text: res?.data?.result?.meaning,
          //     icon: "success",
          // })
          handleClose();
          setData({});
          // getHistory()
        }
      });
    } else {
      // swal({
      //     title: "Error",
      //     text: 'Please select rating.',
      //     icon: "error",
      // });
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes?.style}>
        <Typography
          fontStyle="normal"
          // fontFamily="League Spartan"
          fontWeight="500"
          fontSize="36px"
          paddingLeft="25px"
          marginTop="15px"
          // letterSpacing="0.01em"
          textTransform="capitalize"
          color="#181818"
          letterSpacing="-0.01562em"
          fontFamily="League Spartan"
          marginBottom="10px"
        >
          Review
        </Typography>
        <Box className={classes?.style2}>
          <Grid
            container
            spacing={{
              xSmall: 1,
              laptop: 2,
              smallLaptop: 2,
              desktop: 2,
            }}
          >
            <Grid item mobile={12} xSmall={12}>
              <Typography
                fontStyle="normal"
                fontWeight="500"
                fontSize="23px"
                lineHeight="27px"
                letterSpacing="0.01em"
                textTransform="capitalize"
                color="#00000099"
                marginBottom="7px"
                paddingTop="3px"
                fontFamily="League Spartan"
              >
                Rating
              </Typography>
              <Rating
                defaultValue={0}
                className={classes?.rate}
                name="rate"
                size="large"
                max={5}
                value={data?.rate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item mobile={12} xSmall={12}>
              <Typography
                fontStyle="normal"
                fontSize="23px"
                lineHeight="27px"
                letterSpacing="0.01em"
                textTransform="capitalize"
                color="#00000099"
                fontWeight="500"
                marginBottom="7px"
                paddingTop="8px"
                fontFamily="League Spartan"
              >
                Comments
              </Typography>
              <Box width="100%">
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  label="comment"
                  name="comment"
                  multiline
                  maxRows={4}
                  rows="7"
                  value={data?.comment}
                  onChange={handleChange}
                />
              </Box>

              {/* <textarea name="comment" rows="10" cols="98" >
                            </textarea> */}
            </Grid>
          </Grid>

          <Box
            style={{ width: "150px", paddingTop: "16px", margin: "7px 0 0" }}
          >
            <StyledButton2 text="Save" onClick={() => saveRating()} />
          </Box>
        </Box>
        <CloseIcon className={classes.close} onClick={() => handleClose()} />
      </Box>
    </Modal>
  );
};
export default ModalCommonRating;
