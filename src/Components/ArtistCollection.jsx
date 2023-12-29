// import React, { useEffect } from "react";
// import Box from "@mui/material/Box";
// import { makeStyles } from "tss-react/mui";
// import Typography from "@mui/material/Typography";
// import Aos from "aos";
// import "aos/dist/aos.css";
// import StyledButton2 from "./Common/StyledButton2";
// import can1 from "../Assests/images/can1.webp";
// import can2 from "../Assests/images/can2.webp";
// import newr from "../Assests/images/newr.webp";
// import pencilRing from "../Assests/images/pencil ring.webp";
// import { useNavigate } from "react-router-dom";

// const useStyles = makeStyles()((theme) => {
//   return {
//     colctHeading: {
//       textAlign: "center",
//       position: "relative",
//       PaddingBottom: "80px",
//       [theme.breakpoints.down("mobile")]: {
//         PaddingBottom: "20px",
//       },
//     },
//     collH4: {
//       fontFamily: "Playfair Display",
//       fontStyle: "normal",
//       fontWeight: "500",
//       fontSize: "176px",
//       lineHeight: "151px",
//       textAlign: "center",
//       letterSpacing: "0.05em",
//       textTransform: "capitalize",
//       background:
//         "linear-gradient(179.11deg, rgba(189, 122, 61, 0) 0.76%, rgba(189, 61, 61, 0.15) 19.27%, rgba(176, 37, 37, 0.41) 36.54%, rgba(173, 31, 31, 0.48) 59.98%)",
//       "-webkit-background-clip": "text",
//       "-webkit-text-fill-color": "transparent",
//       backgroundClip: "text",
//       color: "transparent",
//       [theme.breakpoints.down("desktop")]: {
//         fontSize: "140px",
//       },
//       [theme.breakpoints.down("laptop")]: {
//         fontSize: "110px",
//       },
//       [theme.breakpoints.down("tab")]: {
//         fontSize: "80px",
//       },
//       [theme.breakpoints.down("mobile")]: {
//         fontSize: "45px",
//         lineHeight: "50px",
//       },
//     },
//     collH2: {
//       fontFamily: "Playfair Display",
//       fontStyle: "normal",
//       fontWeight: "500",
//       fontSize: "220px",
//       lineHeight: "189px",
//       textAlign: "center",
//       letterSpacing: "0.02em",
//       textTransform: "capitalize",
//       color: " rgba(248, 221, 207, 0.8)",
//       marginTop: "-22px",
//       marginLeft: "19px",
//       display: "flex",
//       justifyContent: "center",
//       [theme.breakpoints.down("desktop")]: {
//         fontSize: "180px",
//         lineHeight: "139px",
//       },
//       [theme.breakpoints.down("laptop")]: {
//         fontSize: "140px",
//       },
//       [theme.breakpoints.down("tab")]: {
//         fontSize: "100px",
//       },
//       [theme.breakpoints.down("mobile")]: {
//         fontSize: "54px",
//       },
//     },
//     collRing: {
//       position: "absolute",
//       top: "0px",
//       margin: "0 auto",
//       width: "100%",
//       height: "580px",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       overflow: "hidden",
//       zIndex: "11",
//       [theme.breakpoints.down("mobile")]: {
//         height: "500px",
//       },
//       [theme.breakpoints.down("iph")]: {
//         height: "445px",
//       },
//     },
//     collRingimg: {
//       width: "auto",
//       height: "auto",
//       maxWidth: "100%",
//       maxHeight: "100%",
//       boxShadow: "0px, 4px, 72px rgba(0,0,0,0.11)",
//     },
//     collRingimg1: {
//       width: "70px",
//       height: "90px",
//       marginTop: "90px",
//       marginLeft: "10px",
//       maxWidth: "100%",
//       maxHeight: "100%",
//       zIndex: "999999999999999",
//       boxShadow: "0px, 4px, 72px rgba(0,0,0,0.11)",
//       [theme.breakpoints.down("mobile")]: {
//         marginLeft: "0px",
//       },
//       [theme.breakpoints.down("iph")]: {
//         width: "60px",
//         height: "80px",
//         marginTop: "84px",
//       },
//     },
//     collRingimg3: {
//       width: "140px",
//       height: "150px",
//       marginTop: "0px",
//       marginLeft: "60px",
//       maxWidth: "100%",
//       maxHeight: "100%",
//       zIndex: "999999999999999",
//       boxShadow: "0px, 4px, 72px rgba(0,0,0,0.11)",
//       [theme.breakpoints.down("mobile")]: {
//         marginLeft: "0px",
//       },
//       [theme.breakpoints.down("iph")]: {
//         width: "60px",
//         height: "80px",
//         marginTop: "84px",
//       },
//     },
//     collRingimg2: {
//       width: "90px",
//       height: "110px",
//       marginTop: "50px",
//       marginLeft: "-40px",
//       maxWidth: "100%",
//       maxHeight: "100%",
//       boxShadow: "0px, 4px, 72px rgba(0,0,0,0.11)",
//       [theme.breakpoints.down("iph")]: {
//         width: "78px",
//         height: "95px",
//         marginTop: "45px",
//       },
//     },
//     peraText: {
//       fontSize: "26px",
//       color: "#656570",
//       lineHeight: "38px",
//       fontWeight: "400",
//       fontFamily: "League Spartan",
//       marginBottom: "2rem",
//       marginTop: "1.5rem",
//       padding: "0px 3rem",
//       [theme.breakpoints.down("desktop")]: {
//         fontSize: "24px",
//       },
//       [theme.breakpoints.down("tab")]: {
//         fontSize: "23px",
//       },
//       [theme.breakpoints.down("iph")]: {
//         fontSize: "20px",
//         padding: "15px 0.8rem",
//         lineHeight: "24px",
//         marginBottom: "1rem",
//       },
//     },
//     content: {
//       textAlign: "center",
//       marginTop: "-148px",
//       [theme.breakpoints.down("tab")]: {
//         marginTop: "-238px",
//       },
//       [theme.breakpoints.down("mobile")]: {
//         marginTop: "-144px",
//       },
//       [theme.breakpoints.down("iph")]: {
//         marginTop: "-37px",
//       },
//     },
//     collection: {
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "top center",
//       backgroundSize: "100% 677px",
//       paddingTop: "150px",
//       height: "51rem",
//       position: "relative",
//       [theme.breakpoints.down("tab")]: {
//         paddingTop: "30px",
//       },
//       [theme.breakpoints.down("mobile")]: {
//         height: "40rem",
//         paddingTop: "36px",
//       },
//       [theme.breakpoints.down("iph")]: {
//         height: "28rem",
//       },
//       [theme.breakpoints.down("small")]: {
//         height: "27rem",
//       },
//     },
//     artistBox: {
//       marginBottom: "80px",
//       [theme.breakpoints.down("tab")]: {
//         marginBottom: "43px",
//       },
//       [theme.breakpoints.down("iph")]: {
//         marginBottom: "35px",
//       },
//     },
//     marTmarR: {
//       marginRight: "50px",
//       marginTop: "50px",
//       [theme.breakpoints.down("mobile")]: {
//         marginRight: "0px",
//         marginTop: "53px",
//         img: {
//           width: "130px",
//         },
//       },
//       [theme.breakpoints.down("iph")]: {
//         marginRight: "0px",
//         marginTop: "-30px",
//         img: {
//           width: "115px",
//           height: "115px",
//         },
//       },
//     },
//   };
// });
// function ArtistCollection({data}) {
//   const navigate = useNavigate()
//   const { classes } = useStyles();
//   useEffect(() => {
//     Aos.init({ duration: 2000 });
//   }, []);
//   useEffect(() => {
//     window.addEventListener("scroll", () => {
//       if (window.innerWidth > 500) {
//         if (window.scrollY < 3800) {
//           document.getElementById("abcd").style.display = "flex";
//         } else if (window.scrollY > 3800 && window.scrollY < 4300) {
//           setTimeout(() => {
//             document.getElementById("abcd").style.display = "none";
//           }, 4000);
//         } else if (window.scrollY > 4500) {
//           document.getElementById("abcd").style.display = "flex";
//         }
//       } else {
//         if (window.scrollY < 3000) {
//           document.getElementById("abcd").style.display = "flex";
//         } else if (window.scrollY > 2900 && window.scrollY < 3500) {
//           setTimeout(() => {
//             document.getElementById("abcd").style.display = "none";
//           }, 4000);
//         } else if (window.scrollY > 3600) {
//           document.getElementById("abcd").style.display = "flex";
//         }
//       }
//     });
//   }, []);
//   return (
//     <Box className={classes.artistBox}>
//       <Box component="div" disableGutters className={classes.collection}>
//         <Box component="div" className={classes.colctHeading}>
//           <Typography
//             variant="h4"
//             className={classes.collH4}
//             data-aos="fade-up"
//             data-aos-delay="1500"
//           >
//             Artist's
//           </Typography>
//           <Typography
//             variant="h2"
//             className={classes.collH2}
//             data-aos="fade-up"
//             data-aos-delay="2500"
//           >
//             Collections
//           </Typography>
//           <Box component="div" className={classes.collRing} data-aos="fade-up">
//             <Box
//               component="img"
//               src={newr}
//               alt="ring"
//               className={classes.collRingimg}
//             />
//           </Box>
//           <Box component="div" className={classes.collRing}>
//             <Box
//               data-aos="fade-up"
//               component="img"
//               src={can1}
//               alt="ring"
//               className={classes.collRingimg1}
//             />
//             <Box
//               data-aos="fade-down"
//               component="img"
//               src={can2}
//               alt="ring"
//               className={classes.collRingimg2}
//             />
//           </Box>
//           <Box component="div" className={classes.collRing} id="abcd">
//             <Box className={classes.marTmarR}>
//               <Box
//                 style={{ transform: "rotate(100deg)" }}
//                 data-aos="fade-up"
//                 component="img"
//                 src={pencilRing}
//                 alt="ring"
//                 className={classes.collRingimg3}
//               />
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//       <Box className={classes.content}>
//         <Box display="flex" justifyContent={"center"}>
//           <Typography maxWidth={1150} className={classes.peraText}>
//             {data?.section}
//           </Typography>
//         </Box>
//         <Box display="flex" justifyContent={"center"}>
//           <Box width={225}>
//             <StyledButton2 text="Discover Now" onClick={() => navigate("/artist-collection")}/>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }
// export default ArtistCollection;
import React from 'react'

const ArtistCollection = () => {
  return (
    // <div>ArtistCollection</div>
    <></>
  )
}

export default ArtistCollection
