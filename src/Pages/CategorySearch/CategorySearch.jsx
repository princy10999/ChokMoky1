import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Container, Grid, Typography } from "@mui/material";
import catRing from "../../Assests/images/search_ring.webp";
import catBan from "../../Assests/images/catBan.webp";
import Heading from "../../Components/Common/Heading";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import tabback from "../../Assests/images/tab.webp";
import actab from "../../Assests/images/active_tab.webp";
import filter from "../../Assests/images/filter.webp";
import SelectSection from "../../Components/SelectSection";
import Collectioncard from "../../Components/Common/Collectioncard";
import LoadButton from "../../Components/Common/LoadButton";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import {
  getSearchProductCategory,
  subcategoryList,
} from "../../Redux/Actions/AuthUser";
import { useState } from "react";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    catBox: {
      width: "100%",
      height: "300px",
      position: "relative",
      backgroundPosition: "center",
      backgroundImage: `url(${catBan})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      overFlow: "hidden",
      marginBottom: "45px",
      [theme.breakpoints.down("laptop")]: {
        height: "236px",
      },
      [theme.breakpoints.down("tab")]: {
        height: "186px",
        marginBottom: "20px",
      },
      [theme.breakpoints.down("mobile")]: {
        height: "152px",
      },
      [theme.breakpoints.down("iph")]: {
        marginBottom: "15px",
      },
      [theme.breakpoints.down("small")]: {
        height: "142px",
      },
    },
    bnrRing: {
      position: "absolute",
      height: "264px",
      top: "36px",
      left: "40%",
      transform: "translateX(-50%)",
      display: "block",
      animation: "bnrring 8s infinite ease-in-out",
      "@keyframes bnrring": {
        "0%": {
          transform: "translateY(0px) scale(0.9)",
        },
        "25%": {
          transform: "translateY(5px) scale(0.95)",
        },
        "50%": {
          transform: "translateY(0px) scale(1)",
        },
        "75%": {
          transform: "translateY(-5px) scale(0.95)",
        },
        "100%": {
          transform: "translateY(0px) scale(0.9)",
        },
      },
      [theme.breakpoints.down("laptop")]: {
        height: "200px",
      },
      [theme.breakpoints.down("tab")]: {
        height: "150px",
      },
      [theme.breakpoints.down("mobile")]: {
        height: "130px",
        top: "20px",
        left: "38%",
      },
      [theme.breakpoints.down("small")]: {
        height: "120px",
        left: "32%",
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
      "div div div div": {
        opacity: "1 !important",
      },
    },
    tabCont: {
      marginTop: "40px",
      [theme.breakpoints.down("tab")]: {
        marginTop: "20px",
      },
      [theme.breakpoints.down("mobile")]: {
        marginTop: "10px",
      },
      [theme.breakpoints.down("iph")]: {
        marginTop: "0px",
      },
    },
    tabs: {
      backgroundImage: `url(${tabback})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      width: "70%",
      margin: "0 auto",
      "& .MuiTabs-indicator": {
        backgroundColor: "transparent",
      },
      "& .MuiTab-root": {
        backgroundImage: `url(${actab})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "0% 100%",
        backgroundPosition: "center",
        transition: "all 0.3s ease-in-out",
        width: "33.33%",
      },
      "& .MuiTab-root.Mui-selected": {
        backgroundImage: `url(${actab})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        color: "#FFF",
        transition: "all 0.3s ease-in-out",
      },
      [theme.breakpoints.down("tab")]: {
        width: "95%",
      },
      [theme.breakpoints.down("mobile")]: {
        minHeight: "30px",
      },
      [theme.breakpoints.down("iph")]: {
        minHeight: "15px",
      },
      [theme.breakpoints.down("small")]: {
        width: "100%",
      },
    },
    tab: {
      width: "272px",
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "27px",
      lineHeight: "25px",
      textAlign: "center",
      letterSpacing: "0.02em",
      color: "#35364F",
      textTransform: "none",
      "&:hover": {
        color: "#BD3D3D",
      },
      [theme.breakpoints.down("smallLaptop")]: {
        fontSize: "25px",
        lineHeight: "24px",
      },
      [theme.breakpoints.down("tab")]: {
        fontSize: "20px",
        lineHeight: "22px",
      },
      [theme.breakpoints.down("mobile")]: {
        minHeight: "30px",
        fontSize: "18px",
        padding: "10px",
      },
      [theme.breakpoints.down("iph")]: {
        minHeight: "15px",
        fontSize: "15px",
        padding: "6px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "14px",
      },
    },
    filter: {
      display: "flex",
      justifyContent: "flex-start",
      marginTop: "32px",
      marginBottom: "29px",
      [theme.breakpoints.down("mobile")]: {
        marginTop: "12px",
        marginBottom: "10px",
      },
    },
    filterimg: {
      width: "24px",
      height: "24px",
      marginRight: "14px",
      cursor: "pointer",
      [theme.breakpoints.down("laptop")]: {
        width: "20px",
        height: "20px",
      },
      [theme.breakpoints.down("mobile")]: {
        width: "15px",
        height: "15px",
        marginRight: "10px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "12px",
        height: "12px",
        marginRight: "7px",
      },
    },
    filterP: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "26px",
      lineHeight: "24px",
      letterSpacing: "0.01em",
      cursor: "pointer",
      color: "#BD3D3D",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "24px",
      },
      [theme.breakpoints.down("mobile")]: {
        fontSize: "18px",
        lineHeight: "18px",
      },
      [theme.breakpoints.down("iph")]: {
        fontSize: "15px",
        lineHeight: "15px",
      },
    },
    loadbutcont: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "50px",
      [theme.breakpoints.down("mobile")]: {
        marginBottom: "20px",
        marginTop: "20px",
      },
    },
  };
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="tab-content">{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CategorySearch() {
  const { classes } = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [value, setValue] = React.useState(0);
  const [collection, setcollection] = useState();
  const [open, setOpen] = React.useState(false);
  const [categoryListData, setCategoryListData] = useState([]);
  const [subcategoryListData, setSubcategoryListData] = useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [inputValue2, setInputValue2] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const [valueRange, setValueRange] = React.useState([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(1);
  const [shortBy, setShortBy] = React.useState("");
  const [productCount, setProductCount] = useState(0);
  const [limit, setLimit] = useState(12);
  const [seo, setSeo] = useState([]);
  const [loader, setLoader] = useState(false);

  const selectSubCategoryFunction = async () => {
    if (location?.state?.data?.id) {
      dispatch(isLoader(true));
      setLoader(true);
      const data = await dispatch(
        subcategoryList({
          params: {
            category: location?.state?.data?.id,
          },
        })
      );
      setSubcategoryListData(data?.payload?.result?.subcategory_list);
      dispatch(isLoader(false));
      setLoader(false);
    }
  };

  const getSearchProductResultFunction = async (pages, reset) => {
    if (subcategoryListData?.[value]?.id) {
      setLimit(pages);
      const body = {
        params: {
          keywords: keyword,
          category: slug,
          sub_category: subcategoryListData?.[value]?.id,
          max_price: valueRange[1],
          min_price: valueRange[0],
          sort_by: shortBy?.value,
          page_no: 1,
          per_page: pages,
        },
      };
      const resetBody = {
        params: {
          keywords: "",
          category: slug,
          sub_category: subcategoryListData?.[value]?.id,
          max_price: 0,
          min_price: 0,
          sort_by: "",
          page_no: 1,
          per_page: pages,
        },
      };
      dispatch(isLoader(true));
      setLoader(true);
      const data = await dispatch(
        getSearchProductCategory(reset ? resetBody : body)
      );
      setSeo(data?.payload?.cat_seo);
      setcollection(data?.payload?.details);
      setValueRange([
        data?.payload?.keys?.min_price
          ? data?.payload?.keys?.min_price
          : data?.payload?.min_price,
        data?.payload?.keys?.max_price
          ? data?.payload?.keys?.max_price
          : data?.payload?.max_price,
      ]);
      setMinPrice(+data?.payload?.min_price);
      setMaxPrice(+data?.payload?.max_price);
      setCount(+data?.payload?.page_count);
      setProductCount(data?.payload?.product_count);
      dispatch(isLoader(false));
      setLoader(false);
    }
  };

  useEffect(() => {
    selectSubCategoryFunction();
  }, [location?.state?.data?.id]);
  useEffect(() => {
    if (subcategoryListData) {
      getSearchProductResultFunction(12);
    }
  }, [value, subcategoryListData]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  const reset = () => {
    setInputValue("");
    setInputValue2("");
    setValue2(undefined);
    setValueRange([minPrice, maxPrice]);
    setShortBy("");
    setKeyword("");
    getSearchProductResultFunction(12, true);
  };

  return (
    <Box>
      <Helmet>
        <title>{`${
          seo?.seo_title ? seo?.seo_title : "Category"
        } - Chokmoki`}</title>
        <meta
          name="description"
          content={`${
            seo?.seo_description ? seo?.seo_description : "Category"
          } - Chokmoki`}
        />
        <meta
          property="og:title"
          content={`${seo?.seo_title ? seo?.seo_title : "Category"} - Chokmoki`}
        />
        <meta
          property="og:description"
          content={`${
            seo?.seo_description ? seo?.seo_description : "Category"
          } - Chokmoki`}
        />
        <meta
          property="og:image"
          content="https://chokmoki.com/dev/storage/app/public/banner_image/1674655451.webp"
        />
        <link
          rel="canonical"
          href={`https://chokmoki.com/dev/category/${slug}`}
        />
      </Helmet>
      <Box component="div" disableGutters className={classes.category}>
        <Box component="div" disableGutters className={classes.catBox}>
          <LazyLoad offset={200}>
            <Box
              component="img"
              src={catRing}
              alt="ring"
              className={classes.bnrRing}
            />
          </LazyLoad>
        </Box>
        <Heading
          title={location?.state?.data?.name}
          bgText={location?.state?.data?.name?.slice(0, 1)}
          fontFamily="Playfair Display, serif"
          size="56px"
          tabsize="50px"
          iphsize="35px"
          h="140px"
        />
        <Box component="div" className={classes.tabCont}>
          <Container disableGutters className={classes.cont}>
            <Box component="div" className={classes.tablist}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                component="div"
                className={classes.tablistCont}
              >
                <Tabs
                  className={classes.tabs}
                  value={value}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  onChange={handleChange}
                  allowScrollButtonsMobile
                  centered
                >
                  {subcategoryListData.map((item, index) => {
                    return (
                      <Tab
                        label={item?.name}
                        {...a11yProps(index)}
                        key={index}
                        disableRipple
                        className={classes.tab}
                      />
                    );
                  })}
                </Tabs>
              </Box>
              <Box
                component="div"
                className={classes.filter}
                onClick={() => handleOpen()}
              >
                <Box
                  component="img"
                  src={filter}
                  alt="filter"
                  className={classes.filterimg}
                />
                <Typography variant="p" className={classes.filterP}>
                  Filter all Products
                </Typography>
              </Box>
              {open && (
                <SelectSection
                  categoryShow={false}
                  subCategoryShow={false}
                  m="0px"
                  b="none"
                  open={open}
                  categoryListData={categoryListData}
                  subcategoryListData={subcategoryListData}
                  setCategory={setCategory}
                  category={category}
                  setInputValue={setInputValue}
                  inputValue={inputValue}
                  setValue2={setValue2}
                  value2={value2}
                  setInputValue2={setInputValue2}
                  inputValue2={inputValue2}
                  setValueRange={setValueRange}
                  valueRange={valueRange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  shortBy={shortBy}
                  setShortBy={setShortBy}
                  setKeyword={setKeyword}
                  keyword={keyword}
                  onClick={() => getSearchProductResultFunction(12)}
                  reset={reset}
                  handleOpen={handleOpen}
                />
              )}

              {subcategoryListData.map((item, index) => {
                return (
                  <TabPanel value={value} index={index}>
                    <Grid
                      container
                      columnSpacing={{
                        xSmall: 2,
                        laptop: 5,
                        smallLaptop: 8,
                        desktop: 8,
                      }}
                      spacing={{ xSmall: 2, iph: 2, laptop: 2, xDesktop: 3 }}
                      columns={{ xSmall: 4, mobile: 12, laptop: 12 }}
                      className={classes.mainGrid}
                    >
                      <Collectioncard
                        cardData={collection}
                        fontSize="25px"
                        lineHeight="23px"
                        loader={loader}
                      />
                    </Grid>
                  </TabPanel>
                );
              })}
              {collection?.length !== 0 && limit < productCount && (
                <Box
                  component="div"
                  className={classes.loadbutcont}
                  onClick={() => getSearchProductResultFunction(limit + 12)}
                >
                  <LoadButton />
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default CategorySearch;
