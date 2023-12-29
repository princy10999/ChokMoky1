import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import ProductPart from "../../Components/ProductPart";
import { productDetailsAPI } from "../../Redux/Actions/AuthUser";
import { isLoader } from "../../Redux/Actions/loaderSlice";
import CompatibleProduct from "./../../Components/CompatibleProduct";
import SimilarProduct from "./../../Components/SimilarProduct";
import { BaseURL } from "../../Api/Api";
import ProductRating from "../../Components/Rating";
import HeaderIcon from "../../Components/HeadarIcon";

const useStyles = makeStyles()((theme) => {
  return {
    ProductPage: {
      margin: "116px auto 0 auto",
      paddingLeft: "15px",
      paddingRight: "15px",
      height: "100%",
      maxWidth: "1200px",
      [theme.breakpoints.down("laptop")]: {
        maxWidth: "767px",
        marginTop: "75px",
      },
      [theme.breakpoints.down("tab")]: {
        marginTop: "75px",
      },
      [theme.breakpoints.down("mobile")]: {
        maxWidth: "575px",
        marginTop: "25px",
      },
    },
  };
});

const ProductDetails = () => {
  const [imageValue, setImageValue] = useState({
    alwaysInPlace: true,
    overlayOpacity: 0.5,
    switchSides: false,
    fillAvailableSpace: true,
    Magnifier: "zoom-in",
  });
  const { classes } = useStyles();
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const productDetails = async () => {
    const body = {
      params: {
        product_id: slug,
      },
    };
    dispatch(isLoader(true));
    const response = await dispatch(productDetailsAPI(body));
    setData(response?.payload);
    dispatch(isLoader(false));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    productDetails();
  }, [slug]);
  return (
    <Box>
      <HeaderIcon />
      <Helmet>
        <title>
          {data?.details?.title ? data?.details?.title : "Product Details"} -
          Chokmoki
        </title>
        <meta
          name="description"
          content={`${data?.details?.title} - Chokmoki`}
        />
        <meta
          property="og:title"
          content={`${data?.details?.title} - Chokmoki`}
        />
        <meta
          property="og:description"
          content={`${data?.details?.title} - Chokmoki`}
        />
        <meta
          property="og:image"
          content={`${BaseURL}${data?.details?.get_all_image?.[0]?.image}`}
        />
        <link
          rel="canonical"
          href={`${BaseURL}dev/product-detail/${data?.details?.slug}`}
        />
      </Helmet>
      <Box className={classes.ProductPage}>
        <ProductPart data={data?.details} />
        {data?.compatible_products?.length !== 0 && (
          <CompatibleProduct
            data={data?.compatible_products}
            defaultImage={data?.details}
          />
        )}
      </Box>
      {data?.related_products?.length !== 0 && (
        <SimilarProduct data={data?.related_products} />
      )}{" "}
      <Box borderTop={"1px solid #EAEAEA"}>
        <ProductRating
          title="Rating"
          bgText="R"
          image_path={data?.image_path}
          review={data?.product_review}
        />
      </Box>
    </Box>
  );
};

export default ProductDetails;
