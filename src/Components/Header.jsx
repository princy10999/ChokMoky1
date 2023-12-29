import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import logo from "../Assests/images/top-logo.webp";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "../Redux/app/hooks";
import { styled, useTheme } from "@mui/material/styles";
import SearchBox from "./SearchBox";
import { useLocation } from "react-router-dom";
import Fade from "@mui/material/Fade";
import {
  AppBar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { RxPieChart } from "react-icons/rx";
import { TfiHeart } from "react-icons/tfi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegAddressBook } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbLogin } from "react-icons/tb";
import Tester from "../Assests/images/images 6.webp";
import { useDispatch } from "react-redux";
import { getCount, getCountTemp, MoveMaster } from "../Redux/Actions/AuthUser";
// import { logoutUser } from "../Redux/Auth/AuthSlice";
import HeaderLogo from "./Common/HeaderLogo";
import axios from "axios";
import Swal from "sweetalert2";

const useStyles = makeStyles()((theme) => {
  return {
    appBar: {
      // position: "relative",
      width: "100%",
      display: "block",
      backgroundColor: "#FFFFFF",
      transition: "top 0.3s",
    },
    // headTop: {
    //   width: "100%",
    //   backgroundColor: theme.palette.primary.main,
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   height: "32px",
    //   padding: "6px",
    // },
    // headTopP: {
    //   fontFamily: "Nunito",
    //   fontStyle: "normal",
    //   fontWeight: "700",
    //   fontSize: "15px",
    //   lineHeight: "20px",
    //   textAlign: "center",
    //   letterSpacing: "0.03em",
    //   color: theme.palette.secondary.main,
    //   [theme.breakpoints.down("iph")]: {
    //     fontSize: "13px",
    //   },
    // },
    // headtoplink: {
    //   color: "white",
    //   textDecoration: "underline",
    //   "&:hover": {
    //     color: "#f8ddcfcc",
    //     textDecoration: "underline",
    //   },
    // },
    avatar: {
      marginTop: "-4px",
      [theme.breakpoints.down("small")]: {
        width: "35px",
        height: "35px",
      },
    },
    botHead: {
      width: "100%",
      height: "78px",
      position: "relative",
      borderBottom: "1px solid #E3E3E3",
      [theme.breakpoints.down("laptop")]: {
        height: "fit-content",
      },
    },
    cont: {
      paddingLeft: "15px",
      paddingRight: "15px",
      height: "100%",
      maxWidth: "calc(100% - 80px)",
      [theme.breakpoints.down("laptop")]: {
        maxWidth: "767px",
      },
      [theme.breakpoints.down("mobile")]: {
        maxWidth: "575px",
      },
    },
    navMain: {
      display: "flex",
      justifyContent: "space-between",
      height: "100%",
      alignItems: "center",
    },
    navLeft: {
      display: "flex",
    },
    navImg: {
      width: "36px",
      height: "36px",
      "&:hover": {
        filter:
          "invert(38%) sepia(56%) saturate(938%) hue-rotate(327deg) brightness(110%) contrast(57%)",
      },
      [theme.breakpoints.down("laptop")]: {
        filter:
          "invert(38%) sepia(56%) saturate(938%) hue-rotate(327deg) brightness(110%) contrast(57%)",
      },
    },
    navImg1: {
      width: "30px",
      height: "30px",
      filter:
        "invert(38%) sepia(56%) saturate(938%) hue-rotate(327deg) brightness(110%) contrast(57%)",
    },
    navItem: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      "&:hover .css-1857cx5-ItemTtl": {
        color: theme.palette.primary.main,
        transition: "0.3s",
        fontSize: "14px",
        lineHeight: "10px",
      },
      "&:hover .css-1wt20si-count": {
        backgroundColor: "#BD3D3D",
      },
    },
    ItemTtl: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "0px",
      lineHeight: "0px",
      letterSpacing: "0.01em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "0.3s",
      position: "absolute",
      top: "54px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "max-content",
    },
    navicon: {
      padding: "14px",
      position: "relative",
      [theme.breakpoints.down("desktop")]: {
        paddingLeft: "10px",
        paddingRight: "10px",
      },
      [theme.breakpoints.down("iph")]: {
        paddingLeft: "0px",
        paddingRight: "3px",
      },
      [theme.breakpoints.down("small")]: {
        paddingBottom: "2px",
      },
    },
    menuPop: {
      top: "19px",
    },
    wlogo: {
      position: " absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: "-17px",
      width: "211px",
      height: "148px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      marginRight: "0px",
      paddingBottom: "0px",
      "&::before": {
        position: " absolute",
        content: '""',
        top: "17px",
        height: "calc(100% - 17px)",
        width: "100%",
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 54.17%, #FFFFFF 100%)",
        borderRadius: "0px 0px 100px 100px",
      },
      [theme.breakpoints.down("laptop")]: {
        width: "180px",
        height: "135px",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "122px",
        height: "126px",
        fontSize: "6rem",
        paddingRight: "20px",
      },
      [theme.breakpoints.down("small")]: {
        width: "100px",
        height: "108px",
        paddingRight: "40px",
      },
    },
    listItemText: {
      fontWeight: "400",
      fontFamily: "League Spartan",
      fontSize: "18.5px",
      LineHeight: "51px",
      color: "#65676B",
    },
    wlogo1: {
      position: " absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: "-11px",
      width: "211px",
      height: "148px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      marginRight: "0px",
      paddingBottom: "0px",
      "&::before": {
        position: " absolute",
        content: '""',
        top: "11px",
        height: "calc(100% - 17px)",
        width: "100%",
        background: "#FFFFFF",
        boxShadow: "0px 4px 44px rgb(0 0 0 / 4%)",
        borderRadius: "0px 0px 100px 100px",
      },
      [theme.breakpoints.down("laptop")]: {
        width: "180px",
        height: "135px",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "140px",
        height: "127px",
        paddingRight: "40px",
      },
      [theme.breakpoints.down("small")]: {
        width: "100px",
        height: "101px",
        paddingRight: "25px",
      },
    },
    avatarButton: {
      "&:hover ": {
        backgroundColor: "transparent",
      },
    },

    menuItem: {
      "&:hover ": {
        backgroundColor: "transparent",
      },
      "&:hover span": {
        color: "#BD3D3D",
        backgroundColor: "transparent",
      },
      "&:hover svg": {
        color: "#BD3D3D",
        backgroundColor: "transparent",
      },
      "&:active": {
        color: "#BD3D3D",
        backgroundColor: "transparent",
      },
    },
    active: {
      color: "#BD3D3D",
      backgroundColor: "transparent",
    },
    list: {
      "&:last-child": {
        borderTop: "1px solid #E1E2E3",
      },
    },
    count: {
      position: "absolute",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "#3D3836",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      fontFamily: "league spartan",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "13px",
      lineHeight: "17px",
      color: "#FFFFFF",
      top: "12px",
      right: "15px",
    },
    drawList: {
      height: "40px",
      color: theme.palette.primary.main,
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "17px",
      lineHeight: "22px",
    },
    lestItem: {
      borderTop: "1px solid #E1E2E3",
      "&:hover ": {
        backgroundColor: "transparent",
      },
      "&:hover span": {
        color: "#BD3D3D",
        backgroundColor: "transparent",
      },
      "&:hover svg": {
        color: "#BD3D3D",
        backgroundColor: "transparent",
      },
    },
  };
});

function Header() {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  const logout = async () => {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BD3D3D",
      iconColor: "#BD3D3D",
    }).then((res) => {
      if (res?.isConfirmed) {
        localStorage.clear();
        let body = {
          params: {
            coupon_code: "",
            session_id: sessionStorage.getItem("sessionId"),
          },
        };
        navigate("/login");
        dispatch(getCountTemp(body));
      }
    });
  };
  // const logout = async () => {

  //   await  localStorage.clear();
  //   const res = await dispatch(logoutUser());
  //   let body = {
  //     params: {
  //       coupon_code: "",
  //       session_id: sessionStorage.getItem("sessionId")
  //     }
  //   }
  //   await navigate("/login");
  //   const res2 = await dispatch(getCountTemp(body))
  // };

  const getUserData = localStorage.getItem("userData");
  const userData = JSON.parse(getUserData);

  const navigate = useNavigate();

  const location = useLocation();
  const [isopen, setIsopen] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const navConfig = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <RxPieChart size={25} />,
      visible: true,
    },
    {
      title: " Edit Profile ",
      path: "/edit-profile",
      icon: <BsPerson size={25} />,
      visible: true,
    },
    {
      title: "Order History",
      path: "/order-history",
      icon: <AiOutlineClockCircle size={25} />,
      visible: true,
    },
    {
      title: "Payment History",
      path: "/payment-history",
      icon: <RiSecurePaymentLine size={25} />,
      visible: true,
    },
    {
      title: "Address Book",
      path: "/address-book",
      icon: <FaRegAddressBook size={25} />,
      visible: true,
    },
    {
      title: "Wishlist",
      path: "/wishlist",
      icon: <TfiHeart size={25} />,
      visible: true,
    },
    {
      title: "Change password",
      path: "/change-password",
      icon: <FiLock size={25} />,
      visible: userData?.signup_with === "E" ? true : false,
    },
    {
      title: "Logout",
      icon: <TbLogin size={25} />,
      onClick: logout,
      className: classes.lestItem,
      visible: true,
    },
  ];
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 50) {
  //       setHfix(true);
  //     } else if (window.scrollY === 0) {
  //       setHfix(false);
  //     }
  //   });
  // }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const True = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openSearch = (type) => {
    if (type) {
      setIsopen(false);
    } else {
      setIsopen(!isopen);
    }
  };
  const keyFuction = (event) => {
    if (event.key === "Escape") {
      setIsopen(false);
    }
  };
  document.addEventListener("keydown", keyFuction);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleMenuItemClick = (e, i) => {
    setOpen(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getCountFromReducer = useAppSelector(
    (state) => state?.auth?.isGetCountData?.getCountStatus
  );

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));
  const menuItemsLeft = [
    {
      image: require("../Assests/images/home.webp"),
      text: "Home",
      link: "/",
    },
    {
      image: require("../Assests/images/jewellery.webp"),
      text: "Jewellery",
      link: "/search",
    },
    {
      image: require("../Assests/images/info.webp"),
      text: "About Us",
      link: "/about-us",
    },
    {
      image: require("../Assests/images/testimonial.webp"),
      text: "Testimonial",
      link: "/testimonial",
    },
    // {
    //   image: require("../Assests/images/best Selling.webp"),
    //   text: "Artist Collection",
    //   link: "/artist-collection",
    // },
  ];

  const menuItemsRight = [
    {
      image: require("../Assests/images/search.webp"),
      text: "Search",
      link: "#",
      search: true,
    },
    // {
    //   image: require("../Assests/images/profile.webp"),
    //   text: "Login",
    //   link: "/login",
    //   login: !userData ? false : true,
    // },
    {
      image: require("../Assests/images/contact.webp"),
      text: "Contact Us",
      link: "/contact-us",
    },
    {
      image: require("../Assests/images/wishlist.webp"),
      text: "Wishlist",
      link: "/wishlist",
      countNumber:
        getCountFromReducer?.product_count && userData
          ? getCountFromReducer?.product_count
          : 0,
      count: true,
    },
    {
      image: require("../Assests/images/cart.webp"),
      text: "Cart",
      countNumber: getCountFromReducer?.cart_count
        ? getCountFromReducer?.cart_count
        : 0,
      link: "/cart",
      count: true,
    },
    {
      image: require("../Assests/images/profile.webp"),
      text: "Login",
      link: "/login",
      login: !userData ? false : true,
    },
  ];

  const menuItemsRight1 = [
    {
      image: require("../Assests/images/cart.webp"),
      text: "Cart",
      countNumber: getCountFromReducer?.cart_count
        ? getCountFromReducer?.cart_count
        : 0,
      link: "/cart",
      count: true,
    },
  ];
  const account = {
    displayName: "Admin",
    email: "admin@gmail.com",
    photoURL: Tester,
  };
  const userDetails = useAppSelector(
    (state) => state?.auth?.isUserDetailsData?.userDetail?.result?.userData
  );

  const checkIp = localStorage.getItem("IP4");
  const checkSession = sessionStorage.getItem("sessionId");
  const [ip, setIP] = useState("");
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
    localStorage.setItem("IP4", res.data.IPv4);
    sessionStorage.setItem("sessionId", parseInt(Math.random() * 10000000000));
  };
  useEffect(() => {
    (async () => {
      if (!checkIp || !(await sessionStorage.getItem("sessionId"))) {
        getData();
      }
    })();
  }, [checkIp, location?.pathname]);

  useEffect(() => {
    const body = {
      params: {
        session_id: sessionStorage.getItem("sessionId"),
      },
    };
    if (userDetails) {
      dispatch(getCount());
    } else {
      dispatch(getCountTemp(body));
    }
  }, []);

  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (currentScrollPos > 100) {
        if (prevScrollpos > currentScrollPos) {
          setIsTrue(true);
        } else {
          setIsTrue(false);
        }
      } else {
        setIsTrue(false);
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  return (
    <>
      {!isTrue && <HeaderLogo />}
      <AppBar
        disableGutters
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
          paddingRight: "0px !important",
          position: `${isTrue ? "fixed" : "relative"}`,
          marginTop: `${
            isTrue &&
            (location.pathname === "/" ||
              location.pathname?.split("/")?.[1] === "product-detail")
              ? "32px"
              : "0px"
          }`,
        }}
        className={classes.appBar}
      >
        <Box component="div" className={classes.botHead} disableGutters>
          <Container disableGutters className={classes.cont}>
            <Box
              component="div"
              sx={(theme) => ({
                [theme.breakpoints.up("laptop")]: {
                  display: "none",
                },
              })}
            >
              <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                  },
                }}
              >
                <DrawerHeader
                  sx={{
                    justifyContent: "space-between",
                    backgroundColor: "#FFFF",
                    padding: "10px",
                  }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt="logo"
                    sx={{ width: "5em", height: "auto" }}
                  />
                  <ClearIcon onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                      <ChevronLeftIcon sx={{ color: "#BD3D3D" }} />
                    ) : (
                      <ChevronRightIcon sx={{ color: "#BD3D3D" }} />
                    )}
                  </ClearIcon>
                </DrawerHeader>
                <Divider sx={{ borderColor: "#BD3D3D" }} />
                <List
                  sx={{ backgroundColor: "#FFFF", flex: "1" }}
                  className={classes.list}
                >
                  {menuItemsLeft.map((item, i) => (
                    <ListItem
                      key={i}
                      onClick={(event) => {
                        handleMenuItemClick(event, i);
                      }}
                      disablePadding
                      component={Link}
                      to={item.link}
                      className={classes.drawList}
                    >
                      <ListItemButton component={Link} to={item.link}>
                        <ListItemIcon>
                          <Box
                            component="img"
                            disableGutters
                            src={item.image}
                            alt={item.text}
                            className={classes.navImg1}
                          />
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {menuItemsRight.map((item, i) => (
                    <>
                      {!item.search && !item.login && (
                        <ListItem
                          key={i}
                          onClick={(event) => {
                            handleMenuItemClick(event, i);
                          }}
                          disablePadding
                          component={Link}
                          to={item.link}
                          className={classes.drawList}
                        >
                          <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>
                              <Box
                                component="img"
                                disableGutters
                                src={item.image}
                                alt={item.text}
                                className={classes.navImg1}
                              />
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                            <ListItemText primary={item.name} />
                          </ListItemButton>
                        </ListItem>
                      )}
                    </>
                  ))}
                </List>
              </SwipeableDrawer>
            </Box>
            <Box
              component="div"
              disableGutters
              sx={(theme) => ({
                display: "flex",
                justifyContent: "space-between",
                [theme.breakpoints.up("laptop")]: {
                  display: "none",
                },
              })}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleDrawerOpen}
                disableRipple
                sx={{ padding: "5px" }}
              >
                <MenuIcon
                  sx={{
                    width: "2rem",
                    height: "2rem",
                    color: "#BD3D3D",
                  }}
                />
              </IconButton>
              <Box component="div">
                <IconButton
                  disableGutters
                  disableRipple
                  className={classes.navicon}
                >
                  <Box
                    component="img"
                    disableGutters
                    src={menuItemsRight[0]?.image}
                    alt={menuItemsRight[0]?.text}
                    className={classes.navImg}
                    onClick={() => openSearch()}
                  />

                  {menuItemsRight1.map((item, index) => (
                    <>
                      {item.text && !item.login && (
                        <Box
                          component={Link}
                          to={item.link}
                          disableGutters
                          key={index}
                          className={classes.navItem}
                        >
                          <IconButton
                            disableGutters
                            disableRipple
                            className={classes.navicon}
                          >
                            <Box
                              component="img"
                              disableGutters
                              src={item.image}
                              alt={item.text}
                              className={classes.navImg}
                            />
                            {item?.count && (
                              <Box
                                component="span"
                                disableGutters
                                className={classes.count}
                              >
                                {item?.countNumber}
                              </Box>
                            )}
                          </IconButton>
                          <Box component="span" className={classes.ItemTtl}>
                            {item.text}
                          </Box>
                        </Box>
                      )}
                    </>
                  ))}
                </IconButton>

                {userData && (
                  <IconButton
                    disableGutters
                    disableRipple
                    className={classes.navicon}
                  >
                    <>
                      <Button
                        id="basic-button"
                        className={classes.avatarButton}
                        aria-controls={True ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={True ? "true" : undefined}
                        onClick={handleClick}
                        disableRipple
                        disableFocusRipple
                        sx={{ padding: 0, minWidth: "fit-content" }}
                      >
                        <Avatar
                          src={
                            userDetails?.profile_image
                              ? userDetails?.image_path +
                                userDetails?.profile_image
                              : account.photoURL
                          }
                          className={classes?.avatar}
                          alt="photoURL"
                          disableRipple
                        />
                      </Button>
                    </>
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              component={Link}
              to="/"
              disableRipple
              className={
                location.pathname === "/" ? classes.wlogo : classes.wlogo1
              }
            >
              <Box
                component="img"
                disableGutters
                src={logo}
                alt="Website logo"
                sx={{
                  width: "9rem",
                  height:"auto",
                  top: "10px",
                  position: "relative",
                  [theme.breakpoints.down("laptop")]: {
                    width: "8rem",
                  },
                  [theme.breakpoints.down("mobile")]: {
                    width: "6rem",
                    top: "15px",
                    // paddingRight:"20px",
                  },
                  [theme.breakpoints.down("small")]: {
                    width: "5rem",
                  },
                }}
              />
            </Box>
            <Box
              component="div"
              className={classes.navMain}
              disableGutters
              sx={(theme) => ({
                [theme.breakpoints.down("laptop")]: {
                  display: "none",
                },
              })}
            >
              <Box component="div" disableGutters className={classes.navLeft}>
                {menuItemsLeft.map((item, index) => (
                  <Box
                    component={Link}
                    to={item.link}
                    disableGutters
                    key={index}
                    className={classes.navItem}
                    onClick={() => openSearch("type")}
                  >
                    <IconButton
                      disableGutters
                      disableRipple
                      className={classes.navicon}
                    >
                      <Box
                        component="img"
                        disableGutters
                        src={item.image}
                        alt={item.text}
                        className={classes.navImg}
                      />
                    </IconButton>
                    <Box component="span" className={classes.ItemTtl}>
                      {item.text}
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box component="div" disableGutters className={classes.navLeft}>
                {menuItemsRight.map((item, index) => (
                  <>
                    {item.text && !item.login && (
                      <Box
                        component={Link}
                        to={item.link}
                        disableGutters
                        key={index}
                        className={classes.navItem}
                        onClick={() =>
                          openSearch(item?.text === "Search" ? "" : "type")
                        }
                      >
                        <IconButton
                          disableGutters
                          disableRipple
                          className={classes.navicon}
                          {...(item.search
                            ? {
                                onClick: () => {
                                  openSearch();
                                },
                              }
                            : {})}
                        >
                          <Box
                            component="img"
                            disableGutters
                            src={item.image}
                            alt={item.text}
                            className={classes.navImg}
                          />
                          {item?.count && (
                            <Box
                              component="span"
                              disableGutters
                              className={classes.count}
                            >
                              {item?.countNumber}
                            </Box>
                          )}
                        </IconButton>
                        <Box component="span" className={classes.ItemTtl}>
                          {item.text}
                        </Box>
                      </Box>
                    )}
                  </>
                ))}
                <Box>
                  {userData && (
                    <IconButton
                      disableGutters
                      disableRipple
                      className={classes.navicon}
                    >
                      <>
                        <Button
                          id="basic-button"
                          aria-controls={True ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={True ? "true" : undefined}
                          onClick={handleClick}
                          disableRipple
                          disableFocusRipple
                          sx={(theme) => ({
                            padding: 0,
                            minWidth: "fit-content",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          })}
                        >
                          <Avatar
                            src={
                              userDetails?.profile_image
                                ? userDetails?.image_path +
                                  userDetails?.profile_image
                                : account.photoURL
                            }
                            className={classes?.avatar}
                            alt="photoURL"
                          />
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={True}
                          onClose={handleClose}
                          TransitionComponent={Fade}
                          sx={{ position: "absolute !important" }}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))",
                              "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 15,
                                height: 15,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                          className={classes?.menuPop}
                        >
                          <MenuList className={classes?.menulist}>
                            {navConfig
                              .filter((menu) => menu.visible === true)
                              .map((item) => (
                                <Link to={item.path} style={{ color: "black" }}>
                                  <MenuItem
                                    onClick={() => {
                                      handleClose();
                                      item.onClick();
                                    }}
                                    className={`${
                                      item?.className
                                        ? item?.className
                                        : classes?.menuItem
                                    } ${
                                      item.path === location.pathname &&
                                      classes?.active
                                    }`}
                                  >
                                    <ListItemIcon>
                                      <ListItemIcon
                                        className={`${
                                          item.path === location.pathname &&
                                          classes?.active
                                        }`}
                                      >
                                        {item?.icon}
                                      </ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText
                                      className={`${
                                        item.path === location.pathname
                                          ? classes?.active
                                          : classes?.listItemText
                                      }`}
                                    >
                                      {item?.title}
                                    </ListItemText>
                                  </MenuItem>
                                </Link>
                              ))}
                          </MenuList>
                        </Menu>
                      </>
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        {isopen && (
          <SearchBox
            openSearch={openSearch}
            isopen={isopen}
            keyFuction={keyFuction}
          />
        )}
      </AppBar>
    </>
  );
}

export default Header;
