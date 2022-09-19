import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import classes from "./Product.module.css";
const Product = (props) => {
  return (
    <Stack
      justifyContent='stretch'
      sx={{ width: "80%", height: "50%", bgcolor: "#FFD8A9" }}
    >
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        sx={{ width: "100%", height: "10%" }}
      >
        <Typography variant='subtitle1'>{"@someshop.vn"}</Typography>
      </Stack>
      <Box sx={{ width: "100%", height: "65%" }}>
        <img src={props.img} className={classes["product-img"]} />
      </Box>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        sx={{ width: "100%", height: "25%" }}
      >
        <Stack>
          <Stack>
            <Typography variant='subtitle1' textAlign='center'>
              {props.title}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant='subtitle1' textAlign='center'>
              {`${props.price}$ `}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Product;
