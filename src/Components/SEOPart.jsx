import React from "react";
import { Helmet } from "react-helmet";

function SEOPart({ data, seo }) {
  return (
    <Helmet>
      <title>{seo?.seo_title ? seo?.seo_title : data?.title}</title>
      <meta
        name="description"
        content={`${
          seo?.seo_description ? seo?.seo_description : data?.description
        }`}
      />
      <meta
        property="og:title"
        content={`${seo?.seo_title ? seo?.seo_title : data?.title}`}
      />
      <meta
        property="og:description"
        content={`${
          seo?.seo_description ? seo?.seo_description : data?.description
        }`}
      />
      <meta property="og:image" content={data?.image} />
      <link rel="canonical" href={`${data?.canonical}`} />
    </Helmet>
  );
}

export default SEOPart;
