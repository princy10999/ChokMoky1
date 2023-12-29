import { Container, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "tss-react/mui";
import Heading from "../../Components/Common/Heading";
import faqLine from "../../Assests/images/faqLine.webp";
import artistLeaf from "../../Assests/images/artist-leaf.webp";
import LoadButton from "../../Components/Common/LoadButton";
import Aos from "aos";
import "aos/dist/aos.css";
import { ApiPost } from "../../Api/Api";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useDispatch } from "react-redux";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";

const useStyles = makeStyles()((theme) => {
  return {
    faq: {
      marginTop: "111px",
      [theme.breakpoints.down("mobile")]: {
        marginTop: "70px",
      },
    },
    leaf: {
      position: "absolute",
      top: "905px",
      right: "0px",
      width: "243px",
      height: "277px",
      zIndex: -1,
      [theme.breakpoints.down("mobile")]: {
        display: "none",
      },
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
    jwlhead: {
      marginTop: "65px",
      position: "relative",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "32px",
      lineHeight: "57px",
      letterSpacing: "0.01em",
      color: "#35364F",
      [theme.breakpoints.down("tab")]: {
        marginTop: "0px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "30px",
        lineHeight: "55px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "26px",
        lineHeight: "45px",
      },
    },
    jwlimg: {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "93px",
      [theme.breakpoints.down("mobile")]: {
        width: "72px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "65px",
      },
    },
    faqdes: {
      marginTop: "32px",
      [theme.breakpoints.down("mobile")]: {
        marginTop: "22px",
      },
      [theme.breakpoints.down("iph")]: {
        marginTop: "15px",
      },
    },
    accor: {
      borderRadius: 0,
      borderBottom: "1px solid #EAEAEA",
      boxShadow: "none",
      "&::before": {
        content: "none",
      },
    },
    qs: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "21px",
      lineHeight: "30px",
      letterSpacing: "0.03em",
      color: "#35364F",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "18px",
        lineHeight: "24px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "16px",
        lineHeight: "24px",
      },
    },
    ans: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "17px",
      lineHeight: "26px",
      letterSpacing: "0.05em",
      color: "#858A8C",
      [theme.breakpoints.down("mobile")]: {
        fontSize: "16px",
        lineHeight: "22px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "15px",
        lineHeight: "20px",
      },
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
    loadbutcont1: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "25px",
      [theme.breakpoints.down("mobile")]: {
        marginBottom: "20px",
        marginTop: "20px",
      },
    },
  };
});

const Faq = ({ seo, key }) => {
  const { classes } = useStyles();
  const [jdata, setJdata] = useState([]);
  const [jdata1, setJdata1] = useState([]);
  const [pdata, setPdata] = useState([]);
  const [pdata1, setPdata1] = useState([]);
  const [rdata, setRdata] = useState([]);
  const [rdata1, setRdata1] = useState([]);
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    Aos.init({ duration: 2000 });
    dispatch(isLoader(true));
    ApiPost("faq-list").then((res) => {
      if (res?.data?.result) {
        if (res?.data?.result?.faq_oj) {
          setJdata1(
            res?.data?.result?.faq_oj.slice(
              5,
              res?.data?.result?.faq_oj?.length
            )
          );
          setJdata(res?.data?.result?.faq_oj.slice(0, 5));
        }
        if (res?.data?.result?.faq_ps) {
          setPdata1(
            res?.data?.result?.faq_ps.slice(
              5,
              res?.data?.result?.faq_ps?.length
            )
          );
          setPdata(res?.data?.result?.faq_ps.slice(0, 5));
        }
        if (res?.data?.result?.faq_oj) {
          setRdata1(
            res?.data?.result?.faq_re.slice(
              5,
              res?.data?.result?.faq_re?.length
            )
          );
          setRdata(res?.data?.result?.faq_re.slice(0, 5));
        }
      }
      dispatch(isLoader(false));
    });
  }, []);
  const CustomExpandIcon = () => {
    return (
      <Box
        sx={{
          ".Mui-expanded & > .collapsIconWrapper": {
            display: "none",
            transition: "all 0.4s ease",
          },
          ".expandIconWrapper": {
            display: "none",
            transition: "all 0.4s ease",
          },
          ".Mui-expanded & > .expandIconWrapper": {
            display: "block",
            transition: "all 0.4s ease",
          },
        }}
      >
        <div className="expandIconWrapper">
          <RemoveIcon />
        </div>
        <div className="collapsIconWrapper">
          <AddIcon />
        </div>
      </Box>
    );
  };
  const FaqBody = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    return (
      <Box
        component="div"
        sx={(theme) => ({
          marginTop: props.marginTop,
          [theme.breakpoints.down("mobile")]: {
            marginTop: props.mobilem,
          },
        })}
        key={key}
      >
        <Box component="div" className={classes.jwl}>
          <Box component="div" className={classes.jwlhead}>
            {props?.title}
            <Box
              component="img"
              src={faqLine}
              alt="line"
              className={classes.jwlimg}
            />
          </Box>

          <Box component="div" className={classes.faqdes}>
            {props.data
              ?.filter((faq) => faq.status === "A")
              .map((e, i) => {
                return (
                  <Accordion
                    key={i}
                    className={classes.accor}
                    expanded={expanded === e?.id}
                    onChange={handleChange(e?.id)}
                    TransitionProps={{
                      appear: true,
                      timeout: {
                        appear: 600,
                        enter: 700,
                        exit: 900,
                      },
                      timeout: 600,
                    }}
                  >
                    <AccordionSummary
                      sx={{ padding: "0px" }}
                      expandIcon={<CustomExpandIcon />}
                      aria-controls={i}
                      id={i}
                    >
                      <Typography className={classes.qs}>
                        {e?.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ paddingLeft: "0px" }}>
                      <Typography className={classes.ans}>
                        {e?.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            {props?.load && (
              <>
                {props.data1
                  ?.filter((faq) => faq.status === "A")
                  .map((e, i) => {
                    return (
                      <Accordion
                        key={i}
                        className={classes.accor}
                        expanded={expanded === e?.id}
                        onChange={handleChange(e?.id)}
                        TransitionProps={{
                          appear: true,
                          timeout: {
                            appear: 600,
                            enter: 700,
                            exit: 900,
                          },
                          timeout: 600,
                        }}
                      >
                        <AccordionSummary
                          sx={{ padding: "0px" }}
                          expandIcon={<CustomExpandIcon />}
                          aria-controls={i}
                          id={i}
                        >
                          <Typography className={classes.qs}>
                            {e?.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ paddingLeft: "0px" }}>
                          <Typography className={classes.ans}>
                            {e?.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
              </>
            )}
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <Box>
      <SEOPart data={SeoData?.faq} seo={seo} />
      <Box component="div" className={classes.faq} data-aos="fade-up">
        <Box
          component="img"
          src={artistLeaf}
          alt="leaf"
          className={classes.leaf}
        />
        <Container className={classes.cont}>
          <Heading
            title="Frequently asked questions"
            bgText="F"
            fontFamily="Playfair Display, serif"
            subTitle="Through original imagery and editorial perspectives, we bring you unique point newviews."
            size="52px"
            tabsize="36px"
            iphsize="28px"
            h="120px"
            tabh="105px"
            iphh="84px"
            tabbott="84px"
            mobilebott="95px"
            lapbott="67px"
            iphbott="72px"
            smallbott="74px"
            smallsize="24px"
          />
          {jdata && (
            <>
              <FaqBody
                title="Our Jewelry"
                data={jdata}
                data1={jdata1}
                marginTop="98px"
                mobilem="60px"
                load={load1}
              />
              <Box
                component="div"
                className={classes.loadbutcont1}
                data-aos="fade-up"
                onClick={() => setLoad1(!load1)}
              >
                {jdata1?.length > 0 && <LoadButton load={load1} />}
              </Box>
            </>
          )}
          {pdata && (
            <>
              <FaqBody
                title="Payment & Shipping"
                data={pdata}
                data1={pdata1}
                marginTop="45px"
                mobilem="50px"
                load={load2}
              />
              <Box
                component="div"
                className={classes.loadbutcont1}
                data-aos="fade-up"
                onClick={() => setLoad2(!load2)}
              >
                {pdata1?.length > 0 && <LoadButton load={load2} />}
              </Box>
            </>
          )}
          {rdata && (
            <>
              <FaqBody
                title="Returns & Exchanges"
                data={rdata}
                data1={rdata1}
                marginTop="45px"
                mobilem="50px"
                load={load3}
              />
              <Box
                component="div"
                className={classes.loadbutcont}
                data-aos="fade-up"
                onClick={() => setLoad3(!load3)}
              >
                {rdata1?.length > 0 && <LoadButton load={load3} />}
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Faq;
