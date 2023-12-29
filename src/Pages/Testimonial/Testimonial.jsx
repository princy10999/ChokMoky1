import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import TestimonialCard from "../../Components/TestiminialCard";
import { makeStyles } from "tss-react/mui";
import Masonry from "react-masonry-css";
import Heading from "../../Components/Common/Heading";
import testiback from "../../Assests/images/testiback.webp";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { ApiPost, BaseURL } from "../../Api/Api";
import noRecord from "../../Assests/images/no-record.webp";

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
    masonCont: {
      width: "90%",
      margin: "0px auto",
      padding: "70px 0px 90px 0px",
      [theme.breakpoints.down("laptop")]: {
        width: "98%",
      },
      [theme.breakpoints.down("iph")]: {
        // width: "80%",
      },
    },
    testi: {
      paddingTop: "90px",
      backgroundImage: `url(${testiback})`,
      backgroundColor: "#fff2f275",
      backgroundPosition: "bottom center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    noRec: {
      width: "22em",
      height: "15em",
      marginTop: "10px",
      [theme.breakpoints.down("iph")]: {
        width: "15em",
        height: "10em",
        marginTop: "0px",
      },
    },
  };
});

function Testimonial({ seo, key }) {
  const { classes } = useStyles();
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    480: 2,
  };

  const [testimonial, setTestimonial] = useState([]);
  const [ImagePath, setImagePath] = useState("");
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    dispatch(isLoader(true));
    setLoader(true);
    ApiPost("testimonials").then((res) => {
      setTestimonial(res?.data?.testimonials);
      setImagePath(res?.data?.image_path);
      dispatch(isLoader(false));
      setLoader(false);
    });
  }, []);

  const TestimonialPath = BaseURL + ImagePath;

  return (
    <>
      <SEOPart data={SeoData?.testimonial} seo={seo} />
      <Box key={key}>
        <Box className={classes.testi}>
          <Heading
            title="Testimonial"
            bgText="T"
            fontFamily="Playfair Display, serif"
            subTitle=""
            size="52px"
            tabsize="57px"
            iphsize="35px"
            h="120px"
            tabh="105px"
            iphh="84px"
            stabbott="62px"
            lapbott="65px"
            iphbott="71px"
            tabbott="75px"
          />
          <Container className={classes.cont}>
            {testimonial?.length > 0 ? (
              <Box className={classes.masonCont}>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {testimonial?.map((item, index) => (
                    <Box component="div" key={index}>
                      <TestimonialCard
                        cardData={item}
                        imagePath={TestimonialPath}
                      />
                    </Box>
                  ))}
                </Masonry>
              </Box>
            ) : (
              <>
                {!loader && (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box
                      component="img"
                      src={noRecord}
                      className={classes.noRec}
                    />
                  </Box>
                )}
              </>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Testimonial;
