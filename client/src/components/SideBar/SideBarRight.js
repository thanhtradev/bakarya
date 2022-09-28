import React, { useState, useEffect, useContext } from "react";
import Cart from "../Header/Cart/Cart";
import Notification from "../Header/Notification/Notific";
import HeaderAvatar from "../Header/HeaderAvatar";
import SideBar from "./SideBar";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Product from "../Suggestions/Product";
import AuthContext from "../../store/auth-context";
import { Container } from "@mui/system";

let pro1;
let pro2;

const SideBarRight = ({ stackAlignItem }) => {
  const loggined = useContext(AuthContext);

  console.log(loggined);
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

  if (!isLoading) {
    console.log("not loading");
  } else {
    console.log("loading");
  }

  return (
    <SideBar
      stackAlignItems={stackAlignItem}
      width='78%'
      boxShadow='5px 2px 5px 2px #323232'
    >
      <Stack
        height='1'
        spacing={1}
        alignItems='center'
        justifyContent='space-between'
        sx={{
          height: "0.78",
          paddingTop: "10px",
          // backgroundColor: "crimson",
        }}
      >
        <Stack
          sx={{
            height: "0.7",
            // backgroundColor: "cyan"
          }}
        >
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
            sx={{
              width: "0.95",
              height: "5rem",
              justifyContent: `${loggined ? "space-between" : "flex-end"}`,
            }}
          >
            {loggined && <Cart />}
            {loggined && <Notification />}
            <HeaderAvatar />
          </Stack>
          {productList ? (
            <Stack
              alignItems='center'
              spacing={1.2}
              sx={{
                width: "1",
                height: "1",
                overflow: "auto",
                // backgroundColor: "crimson",
              }}
            >
              <Product
                title={pro1?.title}
                subtitle={"shop123@vn.doc"}
                price={pro1?.price}
                img={pro1?.image}
              />
              <Product
                title={pro2?.title}
                subtitle={"shop123@vn.doc"}
                price={pro2?.price}
                img={pro2?.image}
              />
            </Stack>
          ) : (
            <Stack sx={{ width: "21rem", height: "84vh" }}></Stack>
          )}
        </Stack>
        <Box
          sx={{
            width: "1",
            height: "10rem",
            // backgroundColor: "coral",
          }}
        >
          <Container component='footer' sx={{ width: "1" }}>
            <Typography
              sx={{
                // backgroundColor: "cyan",
                width: "1",
                fontSize: "0.7em",
              }}
              noWrap={true}
              textAlign='center'
            >
              Copyright 2022 ©BakaryaTeam
            </Typography>
            <Typography
              sx={{ width: "1", fontSize: "0.7em" }}
              textAlign='center'
            >
              Support | Privacy Policy | Term of Use
            </Typography>
          </Container>
        </Box>
      </Stack>
    </SideBar>
  );
};

export default SideBarRight;
