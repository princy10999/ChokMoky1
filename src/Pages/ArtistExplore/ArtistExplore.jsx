import React, { useEffect, useState } from "react";
import {
  Box,
  // ClickAwayListener,
  Container,
  // Grid,
  // Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
// import { RxCross2 } from "react-icons/rx";
// import Heading from "../../Components/Common/Heading";
// import Collectioncard from "../../Components/Common/Collectioncard";
import { ApiPost, BaseURL } from "../../Api/Api";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CollectionData from "../../Components/CollectionData";
import def from "../../Assests/images/images 6.webp";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    // Overlay: {
    //   position: "fixed",
    //   top: 0,
    //   left: 0,
    //   background: "rgba(0,0,0,0.27)",
    //   zIndex: 99999,
    //   width: "100%",
    //   height: "100%",
    //   overflowY: "scroll",
    //   "&::-webkit-scrollbar": {
    //     width: "0px",
    //   },
    //   "-webkit-animation":
    //     "anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards",
    //   "@keyframes anvil": {
    //     "0%": {
    //       transform: "scale(1) translateY(0px)",
    //       opacity: 0,
    //       boxShadow: "0 0 0 rgba(241, 241, 241, 0)",
    //     },
    //     "1%": {
    //       transform: "scale(0.96) translateY(10px)",
    //       opacity: 0,
    //       boxShadow: "0 0 0 rgba(241, 241, 241, 0)",
    //     },
    //     "100%": {
    //       transform: "scale(1) translateY(0px)",
    //       opacity: 1,
    //       boxShadow: "0 0 500px rgba(241, 241, 241, 0)",
    //     },
    //   },
    // },
    // popup: {
    //   position: "relative",
    // },
    // paper: {
    //   position: "absolute",
    //   top: "32px",
    //   left: "200px",
    //   right: "200px",
    //   width: "calc(100% - 400px)",
    //   height: "1177px",
    //   backgroundColor: "#FFFFFF",
    //   border: "4px solid #BD3D3D",
    //   [theme.breakpoints.down("desktop")]: {
    //     left: "100px",
    //     right: "100px",
    //     width: "calc(100% - 200px)",
    //   },
    //   [theme.breakpoints.down("laptop")]: {
    //     left: "30px",
    //     right: "30px",
    //     width: "calc(100% - 60px)",
    //   },
    //   [theme.breakpoints.down("mobile")]: {
    //     left: "10px",
    //     right: "10px",
    //     width: "calc(100% - 20px)",
    //   },
    // },
    cont: {
      paddingLeft: "15px",
      paddingRight: "15px",
      height: "100%",
      maxWidth: "1200px",
      [theme.breakpoints.down("laptop")]: {
        maxWidth: "767px",
      },
      [theme.breakpoints.down("mobile")]: {
        maxWidth: "575px",
        paddingLeft: "0px",
        paddingRight: "0px",
      },
    },
    cross: {
      float: "right",
      margin: "10px",
      cursor: "pointer",
    },
    popCont: {
      padding: "47px 15px 40px",
      [theme.breakpoints.down("mobile")]: {
        padding: "47px 0px 40px",
      },
    },
    // mainGrid: {
    //   marginTop: "40px",
    //   padding: "0px 56px",
    // //   height: "909px",
    // //   overflowY: "auto",
    //   [theme.breakpoints.down("desktop")]: {
    //     padding: "0px 30px",
    //   },
    //   "&::-webkit-scrollbar": {
    //     width: "6px",
    //     borderRadius: "9px",
    //   },
    //   "&::-webkit-scrollbar-track": {
    //     background: "#F2F2F2",
    //   },
    //   "&::-webkit-scrollbar-thumb": {
    //     background: "#35364F",
    //     borderRadius: "9px",
    //   },
    // },
    profilePic: {
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      position: "relative",
      backgroundColor: "#edebeb",
      overflow: "hidden",
      [theme.breakpoints.down("laptop")]: {
        width: "180px",
        height: "180px",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "150px",
        height: "150px",
      },
      [theme.breakpoints.down("small")]: {
        width: "130px",
        height: "130px",
      },
    },
    ProfileImage: {
      position: "absolute",
      width: "auto",
      height: "auto",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
      maxHeight: "100%",
      maxWidth: "100%",
    },
    profileBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "30px",
      marginBottom: "60px",
      [theme.breakpoints.down("mobile")]: {
        marginTop: "12px",
        marginBottom: "40px",
      },
    },
    ProfileName: {
      fontSize: "45px",
      lineHeight: "50px",
      marginTop: "16px",
      fontWeight: "500",
      color: "#35364F",
      fontFamily: "League spartan",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "40px",
        lineHeight: "40px",
        marginTop: "12px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "34px",
        lineHeight: "34px",
        marginTop: "10px",
      },
      [theme.breakpoints.down("small")]: {
        fontSize: "30px",
        lineHeight: "30px",
      },
    },
    Profilebio: {
      fontSize: "20px",
      lineHeight: "24px",
      fontWeight: "500",
      color: "#818183",
      fontFamily: "League spartan",
      textAlign: "center",
      width: "90%",
      margin: "0 auto",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "16px",
        lineHeight: "20px",
      },
    },
  };
});

function ArtistExplore() {
  const { classes } = useStyles();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [artistColl, setArtistColl] = useState([]);
  const [count, setCount] = useState(1);
  const [productCount, setProductCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [artist, setArtist] = useState([]);

  const getCollection = () => {
    dispatch(isLoader(true));
    let data = {
      params: {
        artist_id: slug,
        page_no: page,
        per_page: 12,
      },
    };
    setLoader(true);
    ApiPost("artist-collection", data).then((res) => {
      setArtistColl(res?.data?.collection);
      setCount(+res?.data?.page_count);
      setArtist(res?.data?.Artist);
      setProductCount(res?.data?.product_count);
      dispatch(isLoader(false));
      setLoader(false);
    });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getCollection();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [page]);

  const onPageChange = (e, pageNumber) => {
    setPage(pageNumber);
    getCollection();
  };
  return (
    <Box>
      <Helmet>
        <title>
          {artist?.name ? artist?.name + " Collection" : "Artist Collection"} -
          Chokmoki
        </title>
        <meta name="description" content={`${artist?.bio} - Chokmoki`} />
        <meta
          property="og:title"
          content={`${artist?.name + " Collection"} - Chokmoki`}
        />
        <meta property="og:description" content={`${artist?.bio} - Chokmoki`} />
        <meta property="og:image" content={`${BaseURL}${artist.profile_pic}`} />
        <link rel="canonical" href={`${BaseURL}dev/artist/${artist?.slug}`} />
      </Helmet>
      <Box component="div" disableGutters className={classes.mainBox}>
        <Container className={classes.cont}>
          <Box component="div" className={classes.popCont}>
            <Box className={classes.profileBox}>
              <Box className={classes.profilePic}>
                <LazyLoad offset={200}>
                  <Box
                    component="img"
                    src={
                      artist?.profile_pic ? BaseURL + artist.profile_pic : def
                    }
                    alt="artist"
                    className={classes.ProfileImage}
                  />
                </LazyLoad>
              </Box>
              <Typography variant="h1" className={classes.ProfileName}>
                {artist?.name}
              </Typography>
              <Typography variant="p" className={classes.Profilebio}>
                {artist?.bio}
              </Typography>
            </Box>
            <CollectionData
              collection={artistColl}
              count={count}
              onPageChange={onPageChange}
              productCount={productCount}
              nomargin={true}
              loader={loader}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default ArtistExplore;
