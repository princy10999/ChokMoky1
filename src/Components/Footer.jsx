import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import fotLogo from "../Assests/images/top-logo.webp";
import fotph from "../Assests/images/foot-phone.webp";
import fotmail from "../Assests/images/foot-mail.webp";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { makeStyles } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import Aos from "aos";
import "aos/dist/aos.css";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    topFot: {
      borderBottom: "1px solid #D9D9D9",
      borderTop: "1px solid #D9D9D9",
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
    topFotIn: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "0px 0px 47px 0px",
      [theme.breakpoints.down("laptop")]: {
        padding: "0px 0px 25px 0px",
      },
      [theme.breakpoints.down("mobile")]: {
        padding: "0px",
      },
    },
    footLft: {
      paddingRight: "45px",
      marginRight: "37px",
      position: "relative",
      [theme.breakpoints.down("laptop")]: {
        paddingRight: "0px",
        marginRight: "0px",
      },
      "&::after": {
        position: "absolute",
        content: '""',
        height: "186px",
        width: "1px",
        background: " #D9D9D9",
        right: "0px",
        top: "69px",
        [theme.breakpoints.down("laptop")]: {
          display: "none",
        },
      },
    },
    footLogo: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      marginBottom: "9px",
      width: "146px",
      height: "125px",
      marginTop: "-13px",
      // [theme.breakpoints.down("iph")]: {
      //   width: "125px",
      //   height: "110px",
      // },
      [theme.breakpoints.down("iph")]: {
        // width: "125px",
        // height: "110px",
        display: "none",
      },
    },
    fotP: {
      marginBottom: "24px",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "25px",
      letterSpacing: "0.02em",
      color: "#61616A",
      [theme.breakpoints.down("iph")]: {
        marginBottom: "16px",
        marginTop: "16px",
      },
    },
    li: {
      transition: "all 0.5s ease-in-out",
      "&:hover": {
        listStyleType: "disclosure-closed",
        color: "#BD3D3D",
        transform: "translateX(10px)",
      },
    },
    footSosul: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    footSosli: {
      marginRight: "34px",
      "&:last-child": {
        marginRight: "0px",
      },
    },
    footSoslink: {
      color: "#1A1B2F",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "18px",
      height: "18px",
      "&:hover": {
        color: "#BD3D3D",
      },
    },
    footSosicon: {
      fontSize: "20px",
      transition: "transform 250ms",
      "&:hover": {
        transform: "translateY(-6px)",
      },
    },
    footMid: {
      paddingTop: "46px",
      [theme.breakpoints.down("laptop")]: {
        paddingTop: "30px",
      },
      [theme.breakpoints.down("iph")]: {
        paddingTop: "20px",
      },
    },
    footMidh4: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "20px",
      lineHeight: "27px",
      letterSpacing: "0.02em",
      color: "#35364F",
      marginBottom: "14px",
    },
    footMidin: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      [theme.breakpoints.down("mobile")]: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between",
      },
    },
    footMidina: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "17px",
      lineHeight: "39px",
      letterSpacing: "0.03em",
      color: "#5C5C63",
      "&:hover": {
        color: "#BD3D3D",
      },
      [theme.breakpoints.down("desktop")]: {
        fontSize: "16px",
      },
      [theme.breakpoints.down("iph")]: {
        lineHeight: "30px",
      },
    },
    footLast: {
      paddingTop: "44px",
      marginLeft: "-16px",
      [theme.breakpoints.down("laptop")]: {
        paddingTop: "30px",
      },
      [theme.breakpoints.down("iph")]: {
        paddingTop: "20px",
        marginLeft: "0px",
      },
    },
    footLastul: {
      marginTop: "15px",
    },
    footLastli: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: "19px",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "25px",
      letterSpacing: "0.00em",
      color: "#5C5C63",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "16px",
        lineHeight: "22px",
      },
      [theme.breakpoints.down("iph")]: {
        marginBottom: "8px",
      },
    },
    footLastimg: {
      display: "block",
      width: "20px",
      height: "20px",
      marginRight: "14px",
      [theme.breakpoints.down("desktop")]: {
        width: "16px",
        height: "16px",
      },
    },
    footLastlink: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "25px",
      letterSpacing: "0.00em",
      color: "#5C5C63",
      "&:hover": {
        color: "#BD3D3D",
      },
      [theme.breakpoints.down("desktop")]: {
        fontSize: "16px",
        lineHeight: "22px",
      },
    },
    copy: {
      padding: "22px 0px 22px 0px",
      [theme.breakpoints.down("tab")]: {
        padding: "15px 0px 15px 0px",
      },
    },
    copyInr: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("tab")]: {
        flexDirection: "column",
        justifyContent: "flex-start",
      },
    },
    copyInrP: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "25px",
      letterSpacing: "0.03em",
      color: "#61616A",
      [theme.breakpoints.down("desktop")]: {
        fontSize: "16px",
        lineHeight: "22px",
      },
      [theme.breakpoints.down("laptop")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.down("tab")]: {
        marginBottom: "10px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "14px",
      },
    },
    copyInra: {
      color: "#61616A",
      "&:hover": {
        color: "#BD3D3D",
      },
    },
    payCardul: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    payCardli: {
      marginLeft: "13px",
      [theme.breakpoints.down("iph")]: {
        marginLeft: "10px",
      },
      "&:first-child": {
        [theme.breakpoints.down("tab")]: {
          marginLeft: "0px",
        },
      },
    },
    payCardlink: {
      display: "block",
      transition: "transform 250ms",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    },
  };
});

function Footer({ onPageClick }) {
  const { classes } = useStyles();
  const d = new Date();
  let year = d.getFullYear();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const menuItemsLeft = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Products",
      link: "/search",
    },
    {
      text: "About Us",
      link: "/about-us",
    },
    {
      text: "Testimonial",
      link: "/testimonial",
    },
    {
      text: "Career",
      link: "/career",
    },
  ];
  const menuItemsRight = [
    {
      text: "Faq",
      link: "/faq",
    },
    {
      text: "Contact Us",
      link: "/contact-us",
    },
    {
      text: "Terms & Condition",
      link: "/terms-and-conditions",
    },
    {
      text: "Privacy Policy",
      link: "/privacy-policy",
    },
  ];
  const payCard = [
    {
      image: require("../Assests/images/mastercard.webp"),
    },
    {
      image: require("../Assests/images/visa.webp"),
    },
    {
      image: require("../Assests/images/american-express.webp"),
    },
    {
      image: require("../Assests/images/discover.webp"),
    },
    {
      image: require("../Assests/images/paypal.webp"),
    },
    {
      image: require("../Assests/images/amazon-pay.webp"),
    },
    {
      image: require("../Assests/images/2cc.webp"),
    },
  ];
  return (
    <Box>
      <Box component="footer" disableGutters>
        <Box component="div" disableGutters className={classes.topFot}>
          <Container disableGutters className={classes.cont}>
            <Box component="div" disableGutters className={classes.topFotIn}>
              <Grid container spacing={0}>
                <Grid item laptop={5} desktop={5}>
                  <Box
                    component="div"
                    disableGutters
                    className={classes.footLft}
                  >
                    <Box
                      component={Link}
                      to="/"
                      className={classes.footLogo}
                      data-aos="fade-up"
                    >
                      <LazyLoad offset={200}>
                        <Box
                          component="img"
                          src={fotLogo}
                          alt="logo"
                          sx={{
                            width: "auto",
                            height: "auto",
                            maxWidth: "100%",
                            maxHeight: "100%",
                          }}
                        />
                      </LazyLoad>
                    </Box>
                    <Box
                      component="p"
                      className={classes.fotP}
                      data-aos="fade-up"
                    >
                      In publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate the visual
                      form of a document or a typeface without relying on
                      meaningful content.
                    </Box>
                    <Box component="div" disableGutters>
                      <Box
                        component="ul"
                        className={classes.footSosul}
                        data-aos="fade-up"
                      >
                        <Box component="li" className={classes.footSosli}>
                          <Box
                            component={Link}
                            to="#"
                            target="_blank"
                            className={classes.footSoslink}
                          >
                            <FaFacebookF className={classes.footSosicon} />
                          </Box>
                        </Box>
                        <Box component="li" className={classes.footSosli}>
                          <Box
                            component={Link}
                            to="#"
                            target="_blank"
                            className={classes.footSoslink}
                          >
                            <AiOutlineTwitter className={classes.footSosicon} />
                          </Box>
                        </Box>
                        <Box component="li" className={classes.footSosli}>
                          <Box
                            component={Link}
                            to="#"
                            target="_blank"
                            className={classes.footSoslink}
                          >
                            <AiFillYoutube className={classes.footSosicon} />
                          </Box>
                        </Box>
                        <Box component="li" className={classes.footSosli}>
                          <Box
                            component={Link}
                            to="#"
                            target="_blank"
                            className={classes.footSoslink}
                          >
                            <FaPinterestP className={classes.footSosicon} />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xSmall={12}
                  small={12}
                  iph={7}
                  mobile={7}
                  tab={7}
                  laptop={4}
                  desktop={4}
                >
                  <Box
                    component="div"
                    disableGutters
                    className={classes.footMid}
                    data-aos="fade-up"
                  >
                    <Typography
                      variant="h4"
                      disableGutters
                      className={classes.footMidh4}
                    >
                      Quick Links
                    </Typography>
                    <Box
                      component="div"
                      disableGutters
                      className={classes.footMidin}
                    >
                      <Box
                        component="ul"
                        sx={(theme) => ({
                          marginRight: "5em !important",
                          [theme.breakpoints.down("desktop")]: {
                            marginRight: "3em !important",
                          },
                          [theme.breakpoints.down("mobile")]: {
                            marginRight: "0px !important",
                          },
                        })}
                      >
                        {menuItemsLeft.map((item, index) => (
                          <Box
                            className={classes.li}
                            component="li"
                            key={index}
                            onClick={onPageClick}
                          >
                            <Box
                              Links
                              component={Link}
                              to={item.link}
                              className={classes.footMidina}
                            >
                              {item.text}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      <Box component="ul">
                        {menuItemsRight.map((item, index) => (
                          <Box
                            className={classes.li}
                            component="li"
                            key={index}
                            onClick={onPageClick}
                          >
                            <Box
                              component={Link}
                              to={item.link}
                              className={classes.footMidina}
                            >
                              {item.text}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xSmall={12}
                  small={12}
                  iph={5}
                  mobile={5}
                  tab={5}
                  laptop={3}
                  desktop={3}
                >
                  <Box
                    component="div"
                    disableGutters
                    className={classes.footLast}
                    data-aos="fade-up"
                  >
                    <Typography
                      variant="h4"
                      disableGutters
                      className={classes.footMidh4}
                    >
                      Contact Info
                    </Typography>
                    <Box component="ul" className={classes.footLastul}>
                      <Box component="li" className={classes.footLastli}>
                        Plot No 24, Shop No 10, Neelratan Society, Sector 19,
                        Vashi, Navi Mumbai
                      </Box>
                      <Box component="li" className={classes.footLastli}>
                        <Box
                          component="img"
                          src={fotph}
                          alt="phone"
                          className={classes.footLastimg}
                        />
                        <Box
                          component="a"
                          href="tel:+91 9876543210"
                          className={classes.footLastlink}
                        >
                          +91 9876543210 /&nbsp;
                          <Box
                            component="a"
                            href="tel:(033) 2999-533"
                            className={classes.footLastlink}
                          >
                            (033) 2999-533
                          </Box>
                        </Box>
                      </Box>
                      <Box component="li" className={classes.footLastli}>
                        <Box
                          component="img"
                          src={fotmail}
                          alt="mail"
                          className={classes.footLastimg}
                        />
                        <Box
                          component="a"
                          href="mailto:support@gmail.com"
                          className={classes.footLastlink}
                        >
                          support@gmail.com
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Box component="div" disableGutters className={classes.copy}>
          <Container className={classes.cont}>
            <Box component="div" disableGutters className={classes.copyInr}>
              <Box component="p" className={classes.copyInrP}>
                Copyright © {year}{" "}
                <Box
                  component={Link}
                  to="/"
                  target="_blank"
                  className={classes.copyInra}
                >
                  Chokmoki.com
                </Box>{" "}
                All Rights Reserved.
              </Box>
              <Box component="div" disableGutters>
                <Box component="ul" className={classes.payCardul}>
                  {payCard.map((item, index) => (
                    <Box
                      component="li"
                      key={index}
                      className={classes.payCardli}
                    >
                      <Box
                        component={Link}
                        to="#"
                        className={classes.payCardlink}
                      >
                        <Box
                          component="img"
                          src={item.image}
                          alt="payment card"
                          sx={(theme) => ({
                            width:"2.5em",
                            height:"1.8em",
                            [theme.breakpoints.down("small")]: {
                              width: "auto",
                              height: "20px",
                            },
                          })}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
