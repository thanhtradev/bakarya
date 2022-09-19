import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CreateRecipe from "./CreateRecipe/CreateRecipe";
import { Box } from "@mui/system";
import RecipePost from "./RecipePost/RecipePost";

const NewsFeed = () => {
  return (
    <Grid
      xs={3}
      md={6}
      sx={{
        width: "100vh",
        bgcolor: "#F3F1F1",
        border: "1px solid",
        height: "60rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#F6F6F6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <CreateRecipe />
        <RecipePost />
      </Box>
    </Grid>
  );
};

export default NewsFeed;
