import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import classes from "./RecipePost.module.scss";
import PostHeader from "./AvatarUserGroup/PostHeader";
import Pic from "../../../Assets/Demo.jpg";
import Interactions from "./PostInteraction/Interactions";

const RecipePost = (props) => {
  return (
    <Box className={classes.post}>
      <Stack sx={{ padding: "7px 13px" }} spacing={1.5}>
        <Stack
          direction='row'
          spacing={2}
          justifyContent='space-between'
          alignItems='center'
          sx={{ width: "100%" }}
        >
          <PostHeader />
          {/* <Stack
            direction='row'
            spacing={2}
            justifyContent='space-between'
            alignItems='center'
            sx={{ width: "33%" }}
          ></Stack> */}
        </Stack>
        <Box className={classes["post-content"]}>
          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </Box>
        <Box className={classes["post-media"]}>
          <img src={Pic} className={classes["post-media"]} />
        </Box>
        <Interactions />
      </Stack>
    </Box>
  );
};

export default RecipePost;
