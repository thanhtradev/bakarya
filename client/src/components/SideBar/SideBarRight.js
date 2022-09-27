import React, { useState, useEffect } from "react";
import Cart from "../Header/Cart/Cart";
import Notification from "../Header/Notification/Notific";
import HeaderAvatar from "../Header/HeaderAvatar";
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
      setIsLoading(false);
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
      return;
    }
    setIsLoading(false);
  };

  return (
    <SideBar>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='flex-start'
        sx={{ width: "0.89", height: "5rem" }}
      >
        <Cart />
        <Notification />
        <HeaderAvatar />
      </Stack>
      {productList ? (
        <Stack
          alignItems='center'
          spacing={1}
          sx={{ width: "22rem", height: "84vh", overflow: "auto" }}
        >
          <Product title={pro1?.title} price={pro1?.price} img={pro1?.image} />
          <Product title={pro2?.title} price={pro2?.price} img={pro2?.image} />
        </Stack>
      ) : (
        <Stack sx={{ width: "21rem", height: "84vh" }}></Stack>
      )}
      {/* {isLoading ? console.log("loading") : console.log("not")} */}
    </SideBar>
  );
};

export default SideBarRight;
