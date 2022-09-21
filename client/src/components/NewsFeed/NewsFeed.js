import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CreateRecipe from "./CreateRecipe/CreateRecipe";
import { Box, Stack } from "@mui/system";
import RecipePost from "./RecipePost/RecipePost";
import HeaderNews from "./HeaderNewsFeed/HeaderNews";
const NewsFeed = () => {
  return (
    <Grid
      xs={3}
      md={6}
      sx={{
        bgcolor: "white",
        height: `${40 * 2.4}rem`,
      }}
    >
      <Stack
        justifyContent='space-around'
        spacing={2}
        sx={{
          backgroundColor: "transparent",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ height: "100%", height: "6.1rem" }}>
          <HeaderNews />
        </Box>
        <CreateRecipe />
        {/* <RecipePost /> */}
        <RecipePost />
        <RecipePost />
      </Stack>
    </Grid>
  );
};

export default NewsFeed;
