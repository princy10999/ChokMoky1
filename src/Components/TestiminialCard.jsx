import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import moment from "moment";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles()((theme) => {
  return {
    card: {
      maxWidth: 335,
      border: "1px solid #eaeaea",
      borderRadius: 0,
      boxShadow: "none",
      [theme.breakpoints.down("iph")]: {
        maxWidth: "100%",
      },
    },
    cardhead: {
      borderTop: "1px solid #eaeaea",
      [theme.breakpoints.down("laptop")]: {
        padding: "14px",
      },
      [theme.breakpoints.down("iph")]: {
        padding: "3px",
        display: "block",
        textAlign: "center",
      },
      "& .MuiCardHeader-content": {
        "& .MuiCardHeader-title": {
          fontFamily: "League Spartan",
          color: "#61616A",
          fontWeight: 400,
          fontSize: "20px",
          lineHeight: "28px",
          [theme.breakpoints.down("laptop")]: {
            fontSize: "18px",
            lineHeight: "24px",
          },
          [theme.breakpoints.down("iph")]: {
            fontSize: "16px",
            lineHeight: "20px",
          },
        },
        "& .MuiCardHeader-subheader": {
          fontFamily: "Nunito",
          color: "#61616A",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "16px",
          [theme.breakpoints.down("laptop")]: {
            fontSize: "12px",
            lineHeight: "16px",
          },
        },
      },
    },
    reviewText: {
      fontFamily: "Playfair Display",
      color: "#494A5A",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "24px",
      textAlign: "center",
      [theme.breakpoints.down("laptop")]: {
        fontSize: "16px",
        lineHeight: "20px",
      },
    },
    avatar: {
      width: "45px",
      height: "45px",
      [theme.breakpoints.down("laptop")]: {
        width: "38px",
        height: "38px",
      },
      [theme.breakpoints.down("iph")]: {
        width: "38px",
        height: "38px",
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
  };
});

export default function TestimonialCard({ cardData, imagePath }) {
  const { classes } = useStyles();
  return (
    <Card className={classes.card}>
      {cardData?.testimonial_image && (
        <LazyLoad offset={200}>
          <CardMedia
            component="img"
            sx={(theme) => ({
              height: "250px",
              [theme.breakpoints.down("laptop")]: {
                height: "190px",
              },
              [theme.breakpoints.down("iph")]: {
                height: "138px",
              },
            })}
            image={imagePath + cardData?.testimonial_image}
            alt="review"
          />
        </LazyLoad>
      )}
      {cardData?.description && (
        <CardContent
          sx={(theme) => ({
            [theme.breakpoints.down("laptop")]: {
              padding: "14px",
            },
            [theme.breakpoints.down("iph")]: {
              padding: "4px",
            },
          })}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.reviewText}
          >
            {cardData?.description}
          </Typography>
        </CardContent>
      )}
      <CardHeader
        className={classes.cardhead}
        avatar={
          !cardData.image ? (
            <Avatar sx={{ bgcolor: "#bd3d3d" }} className={classes.avatar}>
              {cardData?.user_name.charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              src={imagePath + cardData?.image}
              alt="user"
              className={classes.avatar}
            />
          )
        }
        title={cardData?.user_name}
        subheader={`Posted on: ${moment(cardData?.submitted_at).format(
          "MMMM Do YYYY"
        )}`}
      />
    </Card>
  );
}
