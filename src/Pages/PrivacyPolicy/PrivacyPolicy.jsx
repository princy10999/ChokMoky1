import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/material";
import Heading from "../../Components/Common/Heading";
import PrivacyCommon from "../../Components/Common/PrivacyCommon";
import { ApiPost } from "../../Api/Api";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";

const useStyles = makeStyles()((theme) => {
  return {
    privacyPage: {
      marginTop: "70px",
      [theme.breakpoints.down("mobile")]: {
        marginTop: "54px",
      },
    },
    head: {
      marginBottom: "80px",
      [theme.breakpoints.down("laptop")]: {
        marginBottom: "65px",
      },
      [theme.breakpoints.down("tab")]: {
        marginBottom: "52px",
      },
      [theme.breakpoints.down("xTab")]: {
        marginBottom: "45px",
      },
      [theme.breakpoints.down("xTab")]: {
        marginBottom: "35px",
      },
    },
  };
});
const PrivacyPolicy = ({ seo, key }) => {
  const { classes } = useStyles();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    dispatch(isLoader(true));
    ApiPost("privacy-policy").then((res) => {
      setData(
        res?.data?.result?.privacy_policy?.filter((e) => e?.status === "A")
      );
      dispatch(isLoader(false));
    });
  }, []);
  return (
    <Box key={key}>
      <SEOPart data={SeoData?.privacy} seo={seo} />
      <Box className={classes.privacyPage}>
        <Box component="div" className={classes.head}>
          <Heading
            title="Privacy & Policy"
            bgText="P"
            fontFamily="Jost"
            subTitle="Through original imagery and editorial perspectives, we bring you unique point newviews."
            size="52px"
            tabsize="40px"
            iphsize="25px"
            h="120px"
            tabh="104px"
            mobilebott="78px"
            iphh="84px"
            lapbott="65px"
            iphbott="71px"
            deskbott="65px"
          />
        </Box>
        <PrivacyCommon data={data} />
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
