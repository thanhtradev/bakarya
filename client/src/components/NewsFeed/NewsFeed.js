import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CreateRecipe from "./CreateRecipe/CreateRecipe";
import { Box, Stack } from "@mui/system";
import RecipeContent from "./RecipePost/RecipeContent";
import HeaderNews from "./HeaderNewsFeed/HeaderNews";
import RecipeBox from "./RecipePost/RecipeBox/RecipeBox";
import RecipePost from "./RecipePost/RecipePost";
const NewsFeed = () => {
  const numberPost = 4;
  const viewRecipeBoxContent = () => {};
  return (
    <Grid
      xs={12}
      md={8}
      lg={6}
      sx={{
        bgcolor: "white",
        height: `${24 * (numberPost + 0.4)}rem`,
        zIndex: "0",
      }}
    >
      <Stack
        justifyContent='space-around'
        spacing={2}
        sx={{
          backgroundColor: "transparent",
          width: "100%",
        }}
      >
        <Box sx={{ height: "100%", height: "4.1rem" }}>
          <HeaderNews />
        </Box>
        <CreateRecipe />
        <RecipePost />
        <RecipePost />
        <RecipePost />
        <RecipePost />
        {/* <RecipePost />
        <RecipePost /> */}
      </Stack>
    </Grid>
  );
};

export default NewsFeed;
