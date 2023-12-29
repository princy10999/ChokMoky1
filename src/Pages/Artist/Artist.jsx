import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Container } from "@mui/material";
import Heading from "../../Components/Common/Heading";
import ArtistCard from "../../Components/ArtistCard";
import LoadButton from "../../Components/Common/LoadButton";
import artistLeaf from "../../Assests/images/artist-leaf.webp";
// import ArtistPopup from "../../Components/ArtistPopup";
import Aos from "aos";
import "aos/dist/aos.css";
import { ApiPost, BaseURL } from "../../Api/Api";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    artist: {
      marginTop: "110px",
      [theme.breakpoints.down("laptop")]: {
        marginTop: "90px",
      },
      [theme.breakpoints.down("iph")]: {
        marginTop: "47px",
      },
    },
    leaf: {
      position: "absolute",
      top: "504px",
      right: "0px",
      width: "243px",
      height: "277px",
      zIndex: -1,
      animation: "blow 10s infinite ease-in-out",
      "@keyframes blow": {
        "0%": {
          transform: "rotate(0deg)",
          transformOrigin: "bottom left",
        },
        "25%": {
          transform: "rotate(-3deg)",
          transformOrigin: "bottom left",
        },
        "50%": {
          transform: "rotate(-6deg)",
          transformOrigin: "bottom left",
        },
        "75%": {
          transform: "rotate(-3deg)",
          transformOrigin: "bottom left",
        },
        "100%": {
          transform: "rotate(0deg)",
          transformOrigin: "bottom left",
        },
      },
      [theme.breakpoints.down("laptop")]: {
        top: "582px",
      },
      [theme.breakpoints.down("tab")]: {
        width: "200px",
        height: "200px",
      },
      [theme.breakpoints.down("iph")]: {
        display: "none",
      },
    },
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
      },
    },
    cardCont: {
      marginTop: "17px",
    },
    loadbutcont: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "37px",
      marginBottom: "72px",
      [theme.breakpoints.down("mobile")]: {
        marginBottom: "20px",
        marginTop: "20px",
      },
    },
  };
});

function Artist({ seo }) {
  const { classes } = useStyles();
  // const [explore, SetExplore] = useState(false);
  const [load, SetLoad] = useState(false);
  const [artistList1, setArtistList1] = useState([]);
  const [artistList2, setArtistList2] = useState([]);
  const dispatch = useDispatch();
  // const handleExplore = (id) => {
  //   setArtistId(id);
  //   SetExplore(!explore);
  // };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    Aos.init({ duration: 2000 });
    dispatch(isLoader(true));
    ApiPost("artist-list").then((res) => {
      setArtistList2(res?.data?.artists.slice(5, res?.data?.artists.length));
      setArtistList1(res?.data?.artists.slice(0, 5));
      dispatch(isLoader(false));
    });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return (
    <Box>
      <SEOPart data={SeoData?.artist} seo={seo} />
      <Box component="div" disableGutters className={classes.artist}>
        <LazyLoad offset={200}>
          <Box
            component="img"
            src={artistLeaf}
            alt="leaf"
            className={classes.leaf}
          />
        </LazyLoad>
        <Container className={classes.cont}>
          <Heading
            title="Discover Artist"
            bgText="D"
            fontFamily="Playfair Display, serif"
            subTitle="Through original imagery and editorial perspectives, we bring you unique point new views."
            size="52px"
            tabsize="57px"
            iphsize="35px"
            h="120px"
            tabh="105px"
            iphh="84px"
            lapbott="65px"
            iphbott="71px"
            tabbott="75px"
          />
          <Box component="div" className={classes.cardCont}>
            {artistList1.map((item, index) => (
              <ArtistCard
                key={index}
                Pimage={BaseURL + item?.profile_pic}
                title={item?.name}
                desc={item?.bio}
                // handleExplore={handleExplore}
                artistslug={item?.slug}
                products={item?.get_three_artist_product}
              />
            ))}
            {load && (
              <>
                {artistList2 && artistList2.length > 0
                  ? artistList2.map((item, index) => (
                      <ArtistCard
                        key={index}
                        Pimage={BaseURL + item?.profile_pic}
                        title={item?.name}
                        desc={item?.bio}
                        // handleExplore={handleExplore}
                        artistslug={item?.slug}
                        products={item?.get_three_artist_product}
                      />
                    ))
                  : null}
              </>
            )}
          </Box>

          <Box
            component="div"
            className={classes.loadbutcont}
            data-aos="fade-up"
            onClick={() => SetLoad(!load)}
          >
            {artistList2?.length > 0 && <LoadButton load={load} />}
          </Box>
        </Container>
      </Box>
      {/* {explore && (
        <ArtistPopup handleExplore={handleExplore} artistId={artistId} />
      )} */}
    </Box>
  );
}

export default Artist;
