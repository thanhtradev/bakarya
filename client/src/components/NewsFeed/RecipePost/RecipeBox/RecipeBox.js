import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  CardMedia,
  CardContent,
} from "@mui/material";
import Interactions from "../PostInteraction/Interactions";
import classes from "../RecipePost.module.scss";
import PostHeader from "../AvatarUserGroup/PostHeader";
import Pic from "../../../../Assets/Demo.jpg";

const imgSize = "21rem";

const RecipeBox = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        height: "24.7rem",
        width: "100%",
        // backgroundColor: "burlywood",
        backgroundColor: "#f3f1f1",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Stack direction='row' alignItems='center' sx={{ width: "100%" }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-around'
          sx={{ height: imgSize, width: "100%" }}
        >
          <CardMedia
            component='img'
            image={`${Pic}`}
            src={`${Pic}`}
            alt='Picture of a chocolate cake'
            sx={{ width: "46%", height: "1", borderRadius: "16px" }}
          />
          <Box
            className={classes.post}
            sx={{ width: "50%", maxHeight: imgSize }}
          >
            <Stack
              sx={{ padding: "7px 13px", height: "1" }}
              justifyContent='space-evenly'
              spacing={1.5}
            >
              <Stack
                direction='row'
                spacing={2}
                justifyContent='space-between'
                alignItems='center'
                sx={{ width: "100%" }}
              >
                <PostHeader />
              </Stack>
              <CardContent sx={{ padding: 0 }}>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </CardContent>
              <Interactions buttonWidth='2em' />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RecipeBox;
