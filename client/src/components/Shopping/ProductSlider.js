import { Box, Stack } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import ProductCard from "./ProductCard";

function ProductSlider(props) {
  // const slideCount = Math.ceil(props.items.length / 3);

  let productGroup = [];
  let i = 0;

  while (i < props.items.length) {
    let toAddProduct = props.items.length - i;
    //? each slide has 3 and a half
    if (toAddProduct >= 4) {
      productGroup.push(props.items.slice(i, i + 4));
      i += 3;
    } else {
      productGroup.push(props.items.slice(i));
      i += toAddProduct;
    }
  }
  console.log(productGroup);
  const slides = [];
  productGroup.forEach((group) => {
    slides.push(
      <Box sx={{ display: "-webkit-box" }}>
        {group.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </Box>
    );
  });

  return (
    <Carousel
      sx={{ width: "1" }}
      navButtonsAlwaysVisible='true'
      cycleNavigation='true'
      animation='slide'
      indicators={false}
    >
      {slides.map((slide) => slide)}
    </Carousel>
  );
}

export default ProductSlider;
