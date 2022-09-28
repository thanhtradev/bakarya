import React from "react";
import {
  Typography,
  Box,
  CardMedia,
  CardHeader,
  Card,
  Divider,
  CardActionArea,
} from "@mui/material";
import classes from "./Product.module.css";
const Product = (props) => {
  return (
    <Card
      elevation={0}
      sx={{ width: "0.9", height: "0.36", marginBottom: "20px" }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "1",
          height: "1",
          borderBottom: "1px solid #888",
          padding: "5px",
        }}
      >
        <CardMedia
          component='img'
          image={props.img}
          src={props.img}
          sx={{ width: "0.6", height: "0.95" }}
        />
        <CardHeader
          title={props.title}
          titleTypographyProps={{
            fontSize: "1.13em",
          }}
          subheader={
            <React.Fragment>
              <Typography sx={{ fontSize: "1em" }}>{props.subtitle}</Typography>
              <Typography
                sx={{ fontSize: "1em" }}
              >{`${props.price}$`}</Typography>
            </React.Fragment>
          }
          subheaderTypographyProps={{
            fontSize: "1em",
          }}
        />
      </CardActionArea>
      <Divider variant='fullWidth' />
    </Card>
  );
};

export default Product;
