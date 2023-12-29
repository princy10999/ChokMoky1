import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Link, Typography, Avatar } from "@mui/material";
import dashboardActive from "../../Assests/images/dashbord_active.svg";
import editActive from "../../Assests/images/edit_active.svg";
import orderActive from "../../Assests/images/clock_active.svg";
import wishlistActive from "../../Assests/images/hart_active.svg";
import lockActive from "../../Assests/images/lock_active.svg";
import sideLine from "../../Assests/images/sideLine.webp";
import Tester from "../../Assests/images/images 6.webp";
import NavSection from "../Common/NavSection";
import { makeStyles } from "tss-react/mui";
import { useAppSelector } from "../../Redux/app/hooks";
import { useDispatch } from "react-redux";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { getCountTemp, userDetails } from "../../Redux/Actions/AuthUser";
import { useEffect } from "react";
import { RxPieChart } from "react-icons/rx";
import { TfiHeart } from "react-icons/tfi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { FaRegAddressBook } from "react-icons/fa";
import { TbLogin } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import Swal from "sweetalert2";

const useStyles = makeStyles()((theme) => {
  return {
    nanvbox: {
      borderRight: "solid 1.9px #DDDDDD",
      [theme.breakpoints.down("laptop")]: {
        display: "none",
      },
      minWidth: "300px",
    },
    navMainBox: {
      marginTop: "3rem",
      "& .simplebar-content": {
        display: "flex",
        flexDirection: "column",
      },
    },
    avatar: {
      width: "74px",
      height: "74px",
    },
    avatarBox: {
      display: "flex",
      alignItems: "center",
    },
    avatarName: {
      fontFamily: "League Spartan",
      fontSize: "21px",
      lineHeight: "19.32px",
      fontWeight: "500",
      letterSpacing: "3%",
    },
    avatarEmail: {
      fontFamily: "Nunito",
      fontSize: "14px",
      lineHeight: "19.1px",
      fontWeight: "400",
      letterSpacing: "3%",
      lineBreak: "anywhere",
    },
    imgLine: {
      width: "100%",
    },
  };
});
const account = {
  displayName: "Admin",
  email: "admin@gmail.com",
  photoURL: Tester,
};

export default function SideBar({ isOpenSidebar, onCloseSidebar }) {
  const navigate = useNavigate();
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
  const dispatch = useDispatch();
  const userDetail = useAppSelector(
    (state) => state?.auth?.isUserDetailsData?.userDetail?.result?.userData
  );
  useEffect(() => {
    if (userDetails) {
      dispatch(userDetails());
    }
    dispatch(isLoader(true));
    dispatch(isLoader(false));
  }, []);
  const navConfig = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <RxPieChart size={25} />,
      icon2: dashboardActive,
      visible: true,
    },
    {
      title: " Edit Profile ",
      path: "/edit-profile",
      icon: <BsPerson size={25} />,
      icon2: editActive,
      visible: true,
    },
    {
      title: "Order History",
      path: "/order-history",
      icon: <AiOutlineClockCircle size={25} />,
      icon2: orderActive,
      visible: true,
    },
    {
      title: "Payment History",
      path: "/payment-history",
      icon: <RiSecurePaymentLine size={25} />,
      visible: true,
    },
    // {
    //   title: "Order Detail",
    //   path: "/order-details",
    //   icon: <FiCheckCircle size={25} />,
    //   icon2: checkCircleActive,
    //   visible: true,
    // },
    {
      title: "Address Book",
      path: "/address-book",
      icon: <FaRegAddressBook size={25} />,
      visible: true,
    },
    {
      title: "wishlist",
      path: "/wishlist",
      icon: <TfiHeart size={25} />,
      icon2: wishlistActive,
      visible: true,
    },
    {
      title: "Change password",
      path: "/change-password",
      icon: <FiLock size={25} />,
      icon2: lockActive,
      visible: userDetail?.signup_with === "E" ? true : false,
    },
    {
      title: "Logout",
      icon: <TbLogin size={25} />,
      onClick: logout,
      visible: true,
    },
  ];
  const { classes } = useStyles();
  const renderContent = (
    <Box className={classes?.navMainBox}>
      <Box sx={{ mb: 1, mx: 2.5 }}>
        <Link
          underline="none"
          component={RouterLink}
          to="#"
          className={classes?.avatarBox}
        >
          <Avatar
            src={
              userDetail?.profile_image
                ? userDetail?.image_path + userDetail?.profile_image
                : account.photoURL
            }
            className={classes?.avatar}
            alt="photoURL"
          />
          <Box sx={{ ml: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.primary" }}
              className={classes?.avatarName}
            >
              {userDetail?.first_name}&nbsp;{userDetail?.last_name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              className={classes?.avatarEmail}
            >
              {userDetail?.email}
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box>
        <Box
          component="img"
          src={sideLine}
          alt="sidebarborder"
          className={classes.imgLine}
        />
      </Box>
      <NavSection
        navConfig={navConfig.filter((menu) => menu.visible === true)}
      />
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
  return (
    <>
      <Box className={classes?.nanvbox}>{renderContent}</Box>
    </>
  );
}
