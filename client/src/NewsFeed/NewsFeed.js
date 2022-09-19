import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CreateRecipe from "./CreateRecipe/CreateRecipe";
import { Box, Stack } from "@mui/system";
import RecipePost from "./RecipePost/RecipePost";

const NewsFeed = () => {
  return (
    <Grid
      xs={3}
      md={6}
      sx={{
        width: "100vh",
        bgcolor: "#f6f6f6",
        height: `${40 * 2.3}rem`,
      }}
    >
      <Stack
        justifyContent='space-around'
        spacing={2}
        sx={{
          backgroundColor: "#f6f6f6",
          width: "100%",
          height: "100%",
        }}
      >
        <CreateRecipe />
        {/* <RecipePost /> */}
        <RecipePost />
        <RecipePost />
      </Stack>
    </Grid>
  );
};

export default NewsFeed;
