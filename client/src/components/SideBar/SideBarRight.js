import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SideBar from "./SideBar";
import { Stack } from "@mui/material";
import Product from "../Suggestions/Product";

let pro1;
let pro2;
const SideBarRight = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSuggestHandler();
  }, []);

  const fetchSuggestHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      const productList = data.map((product) => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          description: product.description,
          image: product.image,
        };
      });
      setProductList(productList);
      pro1 = productList[0];
      pro2 = productList[1];
      setIsLoading(false);
    } catch (error) {
      console.log(error.messages);
    }
    setIsLoading(false);
  };

  console.log(productList);
  console.log(pro1);
  console.log(isLoading);
  if (!isLoading) {
    console.log("not loading");
  } else {
    console.log("loading");
  }
  return (
    <SideBar>
      {isLoading === false ? (
        <Stack
          alignItems='center'
          spacing={1}
          sx={{ width: "22rem", height: "100%" }}
        >
          <Product title={pro1.title} price={pro1.price} img={pro1.image} />
          <Product title={pro2.title} price={pro2.price} img={pro2.image} />
        </Stack>
      ) : (
        <Stack></Stack>
      )}
      {/* {isLoading ? console.log("loading") : console.log("not")} */}
    </SideBar>
  );
};

export default SideBarRight;
