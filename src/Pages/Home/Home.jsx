import { Box, Divider } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useDispatch } from "react-redux";
import ArtistCollection from "../../Components/ArtistCollection";
import BannerPart from "../../Components/BannerPart";
import BestSelling from "../../Components/BestSelling";
import ClientMsg from "../../Components/ClientMsg";
import CollectionPart from "../../Components/CollectionPart";
import CollectionPolicy from "../../Components/CollectionPolicy";
import GetInTouch from "../../Components/GetInTouch";
import NewArrivals from "../../Components/NewArrivals";
import StyleSection from "../../Components/StyleSection";
import { getCount, getCountTemp, getHomeContent, MoveMaster } from "../../Redux/Actions/AuthUser";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { SeoData } from "../../Assests/SEOData/SeoData";
import SEOPart from "../../Components/SEOPart";
import sessionStorage from "redux-persist/es/storage/session";
// import axios from "axios";
import HeaderIcon from "../../Components/HeadarIcon";
import { useAppSelector } from "../../Redux/app/hooks";
// import SVGComponent from "../../Components/Common/SVGComponent";


const useStyles = makeStyles()((theme) => {
  return {
    body: {
      padding: " 0px!important",
      margin: "0px!important",
      animation: "mymove 2s!important",
      animationDelay: "6s!important",


      "@keyframes mymove ": {
        "15 %": {
          opacity: "0.5",
        },

        "  30 % ": {
          opacity: " 0.6",
        },

        " 45 %": {
          opacity: " 0.7",
        },

        " 60 %": {
          opacity: "0.8",
        },

        " 75 %": {
          opacity: "0.9",
        },

        " 90 % ": {
          opacity: " 0.9",
        },

        "100 % ": {
          opacity: "1",
        },
      }
    }
  }

})

function Home({ seo, key }) {
  const userDetail = useAppSelector(
    (state) => state?.auth?.isUserDetailsData?.userDetail?.result?.userData
  );


  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState({});
  const [bannerPath, setBannerPath] = useState();
  const [productPath, setProductPath] = useState();
  // const [svg, setSvg] = useState(true);
  const api = async () => {
    if (await sessionStorage.getItem("sessionId")) {
      const body = {
        params: {
          session_id: await sessionStorage.getItem("sessionId")
        }
      }
      await dispatch(MoveMaster(body))
      if (userDetail) {
        await dispatch(getCount());
      } else {
        await dispatch(getCountTemp(body));
      }
      sessionStorage?.removeItem("sessionId")
    }
  }

  const apiCall = async () => {
    dispatch(isLoader(true));
    // const body = {
    //   params: {
    //     session_id:await sessionStorage.getItem("sessionId")
    //   }
    // }
    // const getUser = await dispatch(MoveMaster(body))

    // setMaster(getUser?.payload?.result?.status)

    const getData = await dispatch(getHomeContent());
    setData(getData?.payload?.result?.banner);
    setAllData(getData?.payload?.result);
    setBannerPath(getData?.payload?.result?.image);
    setProductPath(getData?.payload?.result?.product_image);
    dispatch(isLoader(false));
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    apiCall();
    api()
  }, []);
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* {svg && <SVGComponent />}
      {!svg && ( */}
      <Box className={classes.body} key={key}>
        <HeaderIcon />
        <SEOPart data={SeoData?.home} seo={seo} />
        <BannerPart
          handleClick={handleClick}
          data={data}
          bannerPath={bannerPath}
          productPath={productPath}
        />
        <div ref={ref}></div>
        <CollectionPart ref={ref} />
        <NewArrivals />
        <StyleSection data={allData?.stand_out} />
        <ArtistCollection data={allData?.artist_collection} />
        <BestSelling />
        <ClientMsg data={allData} />
        <Divider />
        <GetInTouch data={allData?.have_a_doubt} />
        <CollectionPolicy data={allData} />
      </Box>
     {/* )} */}
    </>
  );
}
export default Home;