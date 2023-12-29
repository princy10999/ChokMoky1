import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import abt_ban from "../../Assests/images/abt_ban.webp";
import colbg from "../../Assests/images/collect-bg.webp";
import artistLeaf from "../../Assests/images/artist-leaf.webp";
import Heading from "../../Components/Common/Heading";
import CollectionPolicy from "../../Components/CollectionPolicy";
import Aos from "aos";
import "aos/dist/aos.css";
import { ApiPost, BaseURL } from "../../Api/Api";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";
import { getHomeContent } from "../../Redux/Actions/AuthUser";
import Heading2 from "../../Components/Common/Heading2";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
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
    abt: {
      position: "relative",
    },
    leaf: {
      position: "absolute",
      top: "1435px",
      right: "0px",
      width: "243px",
      height: "277px",
      zIndex: -1,
      animation: "blow 10s infinite ease-in-out",
      [theme.breakpoints.down("xlDesktop")]: {
        top: "1560px",
      },
      [theme.breakpoints.down("desktop")]: {
        top: "1300px",
      },
      [theme.breakpoints.down("smallLaptop")]: {
        top: "1292px",
      },
      [theme.breakpoints.down("laptop")]: {
        top: "1033px",
      },
      [theme.breakpoints.down("BigTab")]: {
        top: "1139px",
      },
      [theme.breakpoints.down("tab")]: {
        top: "1102px",
      },
      [theme.breakpoints.down("mTab")]: {
        top: "1175px",
      },

      [theme.breakpoints.down("mobile")]: {
        display: "none",
      },
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
    },
    ban: {
      position: "relative",
    },
    banimg: {
      width: "100%",
      height: "100%",
      position: "absolute",
      left: "0px",
      right: "0px",
      top: "0px",
      bottom: "0px",
      zIndex: "-1",
      objectFit: "cover",
      objectPosition: "top",
    },
    banTxt: {
      padding: "148px 744px 157px 79px",
      [theme.breakpoints.down("desktop")]: {
        padding: "110px 354px 125px 44px",
      },
      [theme.breakpoints.down("laptop")]: {
        padding: "70px 190px 70px 30px",
      },
      [theme.breakpoints.down("tab")]: {
        padding: "60px 78px 60px 22px",
      },
      [theme.breakpoints.down("iph")]: {
        padding: "36px 8px 30px 8px",
      },
    },
    bantxthead: {
      fontFamily: "Playfair Display",
      fontStyle: "normal",
      fontSize: "59px",
      fontWeight: 700,
      lineHeight: "70px",
      textAlign: "Left",
      verticalAlign: "Top",
      letterSpacing: "2%",
      color: "#FFFFFF",
      marginBottom: "26px",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "52px",
        lineHeight: "62px",
        marginBottom: "12px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "42px",
        lineHeight: "50px",
        marginBottom: "10px",
      },
      [theme.breakpoints.down("mobile")]: {
        lineHeight: "45px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "35px",
        lineHeight: "40px",
        marginBottom: "8px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "30px",
        lineHeight: "33px",
      },
    },
    bantxtp: {
      fontFamily: "League Spartan",
      fontStyle: "Regular",
      fontWeight: 400,
      fontSize: "23px",
      lineHeight: "36px",
      textAlign: "Left",
      verticalAlign: "Top",
      letterSpacing: "3%",
      color: "#FFFFFF",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "20px",
        lineHeight: "28px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "18px",
        lineHeight: "24px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "16px",
        lineHeight: "18px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "15px",
      },
    },
    story: {
      backgroundImage: `url(${colbg})`,
      backgroundPosition: "top center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%",
      backgroundColor: "#FFF8F6",
      padding: "125px 230px 169px",
      position: "relative",
      overflow: "hidden",
      [theme.breakpoints.down("desktop")]: {
        padding: "107px 77px 120px",
      },
      [theme.breakpoints.down("laptop")]: {
        padding: "90px 0px",
      },
      [theme.breakpoints.down("tab")]: {
        padding: "55px 0px",
      },
      [theme.breakpoints.down("iph")]: {
        padding: "42px 0px",
      },
      "&::before": {
        position: "absolute",
        top: 0,
        left: "-20px",
        content: '"Chokmoki"',
        fontFamily: "Playfair Display",
        fontStyle: "Medium",
        fontSize: "157px",
        lineHeight: "130px",
        textAlign: "center",
        verticalAlign: "Top",
        letterSpacing: "-1%",
        color: "rgba(239, 232, 228, 0.31)",
        [theme.breakpoints.down("desktop")]: {
          fontSize: "112px",
          lineHeight: "92px",
        },
        [theme.breakpoints.down("laptop")]: {
          fontSize: "90px",
          lineHeight: "72px",
        },
        [theme.breakpoints.down("tab")]: {
          fontSize: "65px",
          lineHeight: "50px",
        },
        [theme.breakpoints.down("iph")]: {
          fontSize: "45px",
          lineHeight: "35px",
        },
      },
      "&::after": {
        position: "absolute",
        bottom: 0,
        right: "-20px",
        content: '"Jewellery"',
        fontFamily: "Playfair Display",
        fontStyle: "Medium",
        fontSize: "157px",
        lineHeight: "205px",
        textAlign: "center",
        verticalAlign: "Top",
        letterSpacing: "-1%",
        color: "rgba(239, 232, 228, 0.31)",
        [theme.breakpoints.down("desktop")]: {
          fontSize: "112px",
          lineHeight: "135px",
        },
        [theme.breakpoints.down("laptop")]: {
          fontSize: "90px",
          lineHeight: "108px",
        },
        [theme.breakpoints.down("tab")]: {
          fontSize: "65px",
          lineHeight: "75px",
        },
        [theme.breakpoints.down("iph")]: {
          fontSize: "45px",
          lineHeight: "45px",
        },
      },
    },
    desc: {
      marginTop: "84px",
      marginBottom: "26px",
      [theme.breakpoints.down("desktop")]: {
        marginTop: "55px",
      },
    },
    descCont: {
      display: "flex",
      alignItems: "center",
      marginBottom: "95px",
      [theme.breakpoints.down("desktop")]: {
        marginTop: "65px",
      },
      [theme.breakpoints.down("laptop")]: {
        marginTop: "0px",
      },
      [theme.breakpoints.down("mobile")]: {
        flexDirection: "column",
      },
    },
    descimgCont: {
      position: "relative",
      zIndex: "2",
      "&::before": {
        position: "absolute",
        top: "50%",
        left: "50%",
        content: '""',
        width: "549px",
        height: "357px",
        backgroundColor: " rgba(189, 61, 61, 0.07)",
        zIndex: "-1",
        transform: "translate(-50%, -50%)",
        [theme.breakpoints.down("xlDesktop")]: {
          width: "435px",
          height: "334px",
        },
        [theme.breakpoints.down("desktop")]: {
          width: "315px",
          height: "277px",
        },
        [theme.breakpoints.down("laptop")]: {
          width: "270px",
          height: "220px",
        },
      },
    },
    descimg: {
      [theme.breakpoints.down("desktop")]: {
        height: "22em",
        width: "18em",
      },
      [theme.breakpoints.down("laptop")]: {
        height: "18em",
        width: "15em",
      },
    },
    desctext: {
      [theme.breakpoints.down("laptop")]: {
        marginTop: "25px",
      },
    },
  };
});

function AboutUs({ seo }) {
  const { classes } = useStyles();
  const [about, setAbout] = useState([]);
  const [allData, setAllData] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    Aos.init({ duration: 2000 });
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(isLoader(true));
    ApiPost("about-us").then((res) => {
      setAbout(res?.data?.result);
      dispatch(isLoader(false));
    });
    apiCall();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  const apiCall = async () => {
    dispatch(isLoader(true));
    const getData = await dispatch(getHomeContent());
    setAllData(getData?.payload?.result);
    dispatch(isLoader(false));
  };

  const Descbody = ({ data }) => {
    return (
      <>
        {data?.map((item, index) => (
          <Box
            component="div"
            className={classes.descCont}
            key={item.id}
            sx={{
              justifyContent: (index + 1) % 2 == 0 ? "flex-end" : "flex-start",
              flexDirection: (index + 1) % 2 == 0 ? "row-reverse" : "row",
            }}
          >
            <Box
              component="div"
              className={classes.descimgCont}
              data-aos="fade-up"
            >
              <LazyLoad offset={200}>
                <Box
                  component="img"
                  src={BaseURL + item?.file}
                  alt="about us"
                  className={classes.descimg}
                />
              </LazyLoad>
            </Box>
            <Box component="div" className={classes.desctext}>
              <Heading
                title={item?.title}
                subTitle={item?.description}
                bgText={item?.bg_word}
                fontFamily="Playfair Display"
                size="56px"
                deskSize="50px"
                fsizeP="18px"
                fontP="League Spartan, serif"
                lineP="29px"
                fWightP="400"
                alignT={(index + 1) % 2 == 0 ? "right" : "left"}
                alignI={(index + 1) % 2 == 0 ? "flex-end" : "flex-start"}
                alignIMob="flex-start"
                alignTM="left"
                marginLeft={(index + 1) % 2 == 0 ? "auto" : "122px"}
                deskmarginLeft={(index + 1) % 2 == 0 ? "auto" : "78px"}
                deskmarginRight={(index + 1) % 2 == 0 ? "78px" : "auto"}
                tabmarginLeft={(index + 1) % 2 == 0 ? "auto" : "35px"}
                tabmarginRight={(index + 1) % 2 == 0 ? "35px" : "auto"}
                marginRight={(index + 1) % 2 == 0 ? "122px" : "auto"}
                aWidth="78.7%"
                letWidth="100%"
                wrap="pre-wrap"
                dis="block"
                tWidth="100%"
                tabsize="31px"
                iphsize="25px"
                h="197px"
                iphh="97px"
                mobileh="128px"
                mobilebott="150px"
                iphbott="142px"
                smart="152px"
                laph="161px"
                lapSize="38px"
                tabbott="230px"
                stabbott="242px"
                xTabbott="253px"
                lapbott="245px"
                tabh="130px"
                bott="166px"
                smallbott="178px"
                deskbott="182px"
              />
            </Box>
          </Box>
        ))}
      </>
    );
  };
  return (
    <Box>
      <SEOPart data={SeoData?.about} seo={seo} />
      <Box component="div" className={classes.abt}>
        <LazyLoad offset={200}>
          <Box
            component="img"
            src={artistLeaf}
            alt="leaf"
            className={classes.leaf}
          />
        </LazyLoad>
        <Box component="div" className={classes.ban}>
          <LazyLoad offset={200}>
            <Box
              component="img"
              src={abt_ban}
              alt="banner"
              className={classes.banimg}
            />
          </LazyLoad>
          <Box component="div" className={classes.banTxt} data-aos="fade-up">
            <Typography variant="h1" className={classes.bantxthead}>
              {about?.page_heading?.page_heading}
            </Typography>
            <Typography variant="p" className={classes.bantxtp}>
              {about?.page_heading?.section}
            </Typography>
          </Box>
        </Box>
        <Box component="div" className={classes.story}>
          <Container className={classes.cont}>
            <Heading2
              title={about?.body?.page_heading}
              bgText={about?.body?.page_heading.charAt(0)}
              fontFamily="League Spartan, serif"
              fontP="Playfair Display"
              subTitle={about?.body?.section}
              size="42px"
              fsizeP="23px"
              fsizePxdesk="20px"
              fsizelap="19px"
              lineP="37px"
              linePlap="32px"
              fWightP="500"
              tabsize="40px"
              iphsize="25px"
              h="115px"
              tabh="104px"
              iphh="84px"
              tabbott="150px"
              lapbott="180px"
              iphbott="148px"
              smart="185px"
              smallbott="185px"
              bott="175px"
              linetab="25px"
            />
          </Container>
        </Box>
        <Box component="div" className={classes.desc}>
          <Container className={classes.cont}>
            <Descbody data={about?.about_us} />
          </Container>
        </Box>
        <CollectionPolicy data={allData} />
      </Box>
    </Box>
  );
}

export default AboutUs;
