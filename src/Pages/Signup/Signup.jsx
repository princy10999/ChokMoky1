import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/material";
import { LoginLayout } from "../../Components/Common/LoginLayout";
import BottomLoginButton from "../../Components/Common/BottomLoginButton";
import SignupButton from "../../Components/Common/SignuoButton";
import { useDispatch } from "react-redux";
import { socialLogin } from "../../Redux/Actions/AuthUser";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useNavigate } from "react-router-dom";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";

const useStyles = makeStyles()((theme) => {
  return {
    signup: {
      paddingTop: "33px",
      width: "467px",
      [theme.breakpoints.down("laptop")]: {
        width: "97%",
        margin: "0 auto",
      },
    },
  };
});

function Signup() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  const responseFacebook = async (response) => {
    if (response?.data) {
      dispatch(isLoader(true));
      const body = {
        params: {
          social_id: response?.data?.userID,
          type: "F",
          first_name: response?.data?.first_name,
          last_name: response?.data?.last_name,
          email: response?.data?.email,
          action_type: "S",
        },
      };
      if (sessionStorage.getItem("sessionId")) {
        body.params.session_id = sessionStorage.getItem("sessionId")
          ? sessionStorage.getItem("sessionId")
          : null;
      }
      const data = await dispatch(socialLogin(body));
      dispatch(isLoader(false));
      if (data?.payload?.result) {
        // swal({
        //   title: "Success",
        //   text: "Registration Successfully",
        //   icon: "success",
        // });
        navigate("/login");
      } else {
        // swal({
        //   // title: "Warning",
        //   // text: data?.payload?.error?.meaning,
        //   // icon: "warning",
        // }).then(
        //   (resp) =>
        //     resp &&
        navigate("/signup-with-google", {
          state: {
            data: response,
            type: "F",
            action_type: "S",
          },
        });
        // );
      }
    }
  };
  const responseGoogle = async (res) => {
    if (res?.googleId) {
      dispatch(isLoader(true));
      const body = {
        params: {
          social_id: res?.googleId,
          type: "G",
          first_name: res?.profileObj?.givenName,
          last_name: res?.profileObj?.familyName,
          email: res?.profileObj?.email,
          action_type: "S",
          phone: null,
        },
      };
      if (sessionStorage.getItem("sessionId")) {
        body.params.session_id = sessionStorage.getItem("sessionId")
          ? sessionStorage.getItem("sessionId")
          : null;
      }
      const data = await dispatch(socialLogin(body));
      dispatch(isLoader(false));
      if (data?.payload?.result) {
        // swal({
        //   title: "Success",
        //   text: "Registration Successfully",
        //   icon: "success",
        // });
        navigate("/login");
      } else {
        // swal({
        //   // title: "Warning",
        //   // text: data?.payload?.error?.meaning,
        //   // icon: "warning",
        // }).then(
        //   (resp) =>
        //     resp &&
        navigate("/signup-with-google", {
          state: {
            data: res,
            type: "G",
            action_type: "S",
          },
        });
        // );
      }
    }
  };
  return (
    <Box>
      <SEOPart data={SeoData?.signup} />
      <LoginLayout
        text="Please choose one option to signup on Chokmoki"
        title="Sign Up"
        option="Login"
        link="/login"
        margin="-120px"
        hight="auto"
        padding="58px 66px 53px 56px"
      >
        <Box component="div" disableGutters className={classes.signup}>
          <SignupButton text="Signup with Email Id" link="/signup-with-email" />
          <SignupButton
            text="Signup with Mobile Number"
            link="/signup-with-mobile"
          />
        </Box>
        <BottomLoginButton
          responseGoogle={responseGoogle}
          responseFacebook={responseFacebook}
        />
      </LoginLayout>
    </Box>
  );
}

export default Signup;
