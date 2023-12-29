import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/material";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import { ApiPost } from "../../Api/Api";
import Swal from "sweetalert2";
import { useEffect } from "react";

const useStyles = makeStyles()((theme) => {
  return {
    dashbox: {
      float: "left",

      width: "100%",

      borderRadius: "2px",

      border: "1px solid #BD3D3D",

      backgroundColor: "#f9e6e6",

      minHeight: "120px",

      marginBottom: "22px",

      boxShadow: "none",
      cursor: "pointer",
    },
    dashbox1: {
      float: "left",

      width: "100%",

      borderRadius: "2px",

      border: "1px solid #BD3D3D",

      backgroundColor: "#fff",

      minHeight: "120px",

      marginBottom: "22px",

      boxShadow: "none",
      cursor: "pointer",
    },
    dashbox_head: {
      [`& ul`]: {
        float: "right",

        width: "auto",

        margin: "12px 12px 0px 0px",
        [`& li`]: {
          float: "left",

          marginLeft: "14px",
          [`& a`]: {
            color: "rgba(0, 0, 0, 0.6)",
            "&:hover": {
              color: "#BD3D3D",
            },
          },
        },
      },
    },
    dashbox_body: {
      float: "left",

      width: "100%",

      padding: "2px 18px 12px 18px",
      [`& p`]: {
        color: "#3D3D47",

        fontSize: "15px",

        fontWeight: 400,

        fontFamily: "League Spartan",

        marginBottom: "6px",

        display: "block",

        overflow: "hidden",
        [`& strong`]: {
          fontWeight: 600,

          float: "left",

          width: "80px",

          color: "#2F2F2D",
        },
        [`& span`]: {
          float: "left",

          width: "calc(100% - 80px)",
        },
      },
    },
  };
});

function AddressBookBox({
  address,
  setAddressList,
  notShow,
  setAddressBookId,
  addressBookId,
  setAddressBookIdShip,
  addressBookIdShip,
  shipType,
}) {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      // window.scrollTo(0, 0);
    }, 0);
  }, []);
  const deleteAddress = (id) => {
    Swal.fire({
      title: "<strong>Warning</strong>",
      icon: "warning",
      html: "Are you sure you want to delete this address?",
      showCancelButton: true,
      confirmButtonColor: "#BD3D3D",
      iconColor: "#BD3D3D",
      confirmButtonText: "Yes",
      cancelButtonColor: "#1A1B2F",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var data = {
          params: {
            address_id: id,
          },
        };
        dispatch(isLoader(true));
        ApiPost("address-delete", data).then((res) => {
          if (res.data.result) {
            setAddressList(res?.data?.result?.address);
          } else if (res.data.error) {
          }

          dispatch(isLoader(false));
        });
      }
    });
  };
  const handleClick = () => {
    if (notShow) {
      if (shipType === "S") {
        setAddressBookIdShip(address.id);
      } else if (shipType === "B") {
        setAddressBookId(address.id);
      }
    }
  };
  return (
    <Box
      className={
        !notShow
          ? `${classes.dashbox}`
          : (addressBookIdShip || addressBookId) === address.id
          ? `${classes.dashbox}`
          : `${classes.dashbox1}`
      }
      onClick={handleClick}
    >
      <Box className={classes.dashbox_head}>
        <Box component="ul">
          {!notShow && (
            <>
              <Box component="li">
                <Tooltip title="Edit Address">
                  <Box component={Link} to={`/edit-address/${address.id}`}>
                    <AiFillEdit size={24} />
                  </Box>
                </Tooltip>
              </Box>
              <Box component="li">
                <Tooltip title="Delete Address">
                  <Box
                    component={Link}
                    to="#"
                    onClick={() => deleteAddress(address.id)}
                  >
                    <MdDeleteForever size={24} />
                  </Box>
                </Tooltip>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Box className={classes.dashbox_body}>
        <Box component="p">
          <Box component="strong"> Name </Box>{" "}
          <Box component="span">
            {address.first_name + " " + address.last_name}
          </Box>
        </Box>
        <Box component="p">
          <Box component="strong"> Address </Box>{" "}
          <Box component="span">
            {address?.address}, {address?.city}, {address.state} ,{" "}
            {address.country} - {address.postcode}
          </Box>
        </Box>
        <Box component="p">
          <Box component="strong"> Phone </Box>{" "}
          <Box component="span">{address.mobile}</Box>
        </Box>
        <Box component="p">
          <Box component="strong"> Email </Box>{" "}
          <Box component="span" style={{ wordBreak: "break-all" }}>
            {address.email}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddressBookBox;
