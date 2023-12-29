import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import girl from "../../Assests/images/recyle.webp";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useState } from "react";
import LazyLoad from "react-lazyload";

const CircleSocial = () => {
  const [isShow, setIsShow] = useState(false);

  const handleClick = () => {
    setIsShow(!isShow);
  };

  return (
    <Box
      component="div"
      id="circularMenu"
      className={`${isShow ? "actives" : ""} circular-menu`}
      onClick={handleClick}
      onMouseUp={() => {
        document?.getElementById("circularMenu").classList?.add("actives");
      }}
      onMouseEnter={() => {
        document?.getElementById("circularMenu").classList?.add("actives");
      }}
      onMouseLeave={() => {
        document?.getElementById("circularMenu").classList?.remove("actives");
      }}
    >
      <Box
        component={Link}
        className="floating-btn"
        onClick={() => {
          document?.getElementById("circularMenu").classList?.remove("active");
        }}
      >
        <LazyLoad offset={200}>
          <Box component="img" src={girl} alt="social icon" className="img" sx={{width:"2.5rem", height:"auto"}}/>
        </LazyLoad>
      </Box>
      <menu class="items-wrapper">
        <FacebookShareButton url={window.location.href}>
          <Box
            component={Link}
            class="menu-item "
            onClick={() => {
              document
                .getElementById("circularMenu")
                .classList.remove("active");
            }}
          >
            <FaFacebookF />
          </Box>
        </FacebookShareButton>

        <Box
          component={Link}
          class="menu-item"
          // style={{padding:"5px"}}
          onClick={() => {
            document.getElementById("circularMenu").classList.remove("active");
          }}
        >
          <TwitterShareButton
            url={window.location.href}
            style={{ paddingTop: "5px" }}
          >
            <FaTwitter />
          </TwitterShareButton>
        </Box>

        <Box
          component={Link}
          class="menu-item "
          onClick={() => {
            document.getElementById("circularMenu").classList.remove("active");
          }}
        >
          <WhatsappShareButton
            url={window.location.href}
            style={{ paddingTop: "5px" }}
          >
            <FaWhatsapp />
          </WhatsappShareButton>
        </Box>

        <Box
          component={Link}
          class="menu-item"
          onClick={() => {
            document.getElementById("circularMenu").classList.remove("active");
          }}
        >
          <LinkedinShareButton
            url={window.location.href}
            style={{ paddingTop: "5px" }}
          >
            <FaLinkedinIn />
          </LinkedinShareButton>
        </Box>
      </menu>
    </Box>
  );
};

export default CircleSocial;
