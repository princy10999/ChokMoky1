import React from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Container, Typography } from "@mui/material";
import CollectionHeader from "../../Components/CollectionHeader";
import CollectionData from "../../Components/CollectionData";
import SelectSection from "../../Components/SelectSection";
import {
  getSearchProductResult,
  categoryList,
  subcategoryList,
} from "../../Redux/Actions/AuthUser";
import filter from "../../Assests/images/filter.webp";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import { useLocation } from "react-router-dom";
import SEOPart from "../../Components/SEOPart";
import { SeoData } from "../../Assests/SEOData/SeoData";

const useStyles = makeStyles()((theme) => {
  return {
    filter: {
      display: "flex",
      justifyContent: "flex-start",
      marginTop: "15px",
    },
    filterimg: {
      width: "14px",
      height: "14px",
      marginRight: "8px",
    },
    filterP: {
      fontFamily: "League Spartan",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "18px",
      letterSpacing: "0.01em",
      color: "#BD3D3D",
      cursor: "pointer",
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
  };
});
const Search = ({ props, seo, key }) => {
  const location = useLocation();
  const [collection, setcollection] = useState();
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(250);
  const [categoryListData, setCategoryListData] = useState([]);
  const [subcategoryListData, setSubcategoryListData] = useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [inputValue2, setInputValue2] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const [valueRange, setValueRange] = React.useState([0, 0]);
  const [shortBy, setShortBy] = React.useState("");
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(1);
  const [productCount, setProductCount] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const getSearchProductResultFunction = async (searchText, p) => {
    const body = {
      params: {
        keywords: searchText ? searchText : keyword,
        category: category?.id,
        sub_category: value2?.id,
        max_price: valueRange[1],
        min_price: valueRange[0],
        sort_by: shortBy?.value,
        page_no: p ? p : page ? page : 0,
        per_page: 12,
      },
    };
    window.scrollTo(0, 0);
    dispatch(isLoader(true));
    setLoader(true);
    const data = await dispatch(getSearchProductResult(body));
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
    setOpen(false);
  };
  const selectCategoryFunction = async () => {
    dispatch(isLoader(true));
    setLoader(true);
    const data = await dispatch(categoryList());
    setCategoryListData(data?.payload?.result?.category_list);
    dispatch(isLoader(false));
    setLoader(false);
  };
  const selectSubCategoryFunction = async () => {
    if (category?.id) {
      dispatch(isLoader(true));
      setLoader(true);
      const data = await dispatch(
        subcategoryList({
          params: {
            category: category?.id,
          },
        })
      );
      setValue2("");
      setSubcategoryListData(data?.payload?.result?.subcategory_list);
      dispatch(isLoader(false));
      setLoader(false);
    }
  };
  const reset = useCallback(() => {
    setKeyword("");
    setCategory(undefined);
    setInputValue("");
    setInputValue2("");
    setValue2(undefined);
    setValueRange([props?.minPrice, props?.maxPrice]);
    setShortBy("");
    setSubcategoryListData([]);
    getSearchProductResultFunction();
  }, []);

  const onPageChange = (e, pageNumber) => {
    setPage(pageNumber);
    getSearchProductResultFunction(keyword, pageNumber);
  };
  useEffect(() => {
    selectCategoryFunction();
  }, []);

  useEffect(() => {
    if (location?.state?.search) {
      setKeyword(location?.state?.search ? location?.state?.search : "");
      getSearchProductResultFunction(location?.state?.search);
    }
  }, [location?.state?.search]);

  useEffect(() => {
    if (!location?.state?.search) {
      getSearchProductResultFunction();
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  useEffect(() => {
    selectSubCategoryFunction();
  }, [category?.id]);

  useEffect(() => {
    if (!category) {
      setSubcategoryListData([]);
      setValue2("");
    }
  }, [category]);

  return (
    <Box key={key}>
      <SEOPart data={SeoData?.search} seo={seo} />
      <Box className={classes.CollectionSection}>
        <CollectionHeader />
        <Container disableGutters className={classes.cont}>
          <Box
            component="div"
            className={classes.filter}
            sx={(theme) => ({
              display: "none !important",
              [theme.breakpoints.down("mobile")]: {
                display: "block !important",
              },
            })}
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
        </Container>
        <Box
          component="div"
          sx={(theme) => ({
            display: "block !important",
            [theme.breakpoints.down("mobile")]: { display: "none !important" },
          })}
        >
          <SelectSection
            categoryShow={true}
            subCategoryShow={true}
            m="2rem 9rem 1rem 9rem"
            b="1px solid #D9D9D9"
            desktopm="2rem 7rem 1rem 7rem"
            laptopm="2rem auto 1rem auto"
            open={true}
            keyword={keyword}
            setKeyword={setKeyword}
            categoryListData={categoryListData}
            subcategoryListData={subcategoryListData}
            subCateApi={selectSubCategoryFunction}
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
            onClick={getSearchProductResultFunction}
            reset={reset}
          />
        </Box>
        {open && (
          <Box
            component="div"
            sx={(theme) => ({
              display: "none !important",
              [theme.breakpoints.down("mobile")]: {
                display: "block !important",
              },
            })}
          >
            <SelectSection
              categoryShow={true}
              subCategoryShow={true}
              m="2rem 9rem 1rem 9rem"
              b="1px solid #D9D9D9"
              desktopm="2rem 7rem 1rem 7rem"
              laptopm="2rem auto 1rem auto"
              open={open}
              keyword={keyword}
              setKeyword={setKeyword}
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
              onClick={getSearchProductResultFunction}
              reset={reset}
            />
          </Box>
        )}
        <CollectionData
          collection={collection}
          count={count}
          onPageChange={onPageChange}
          productCount={productCount}
          loader={loader}
        />
      </Box>
    </Box>
  );
};
export default Search;
