import React, { useContext } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import CreateRecipe from "./CreateRecipe/CreateRecipe";
import { Stack } from "@mui/system";
import RecipePost from "./RecipePost/RecipePost";
import { Box } from "@mui/material";
import AuthContext from "../../store/auth-context";

const NewsFeed = () => {
  const loggined = useContext(AuthContext);

  console.log(loggined);
  const numberPost = 4;
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
        <Box sx={{ height: "100%", height: "4.1rem" }} />
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
