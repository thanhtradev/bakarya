import React from "react";
import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Stack, alpha, Paper } from "@mui/material";
import Interactions from "../PostInteraction/Interactions";
import PostSetting from "../PostInteraction/PostSetting";
import classes from "../RecipePost.module.scss";
import User from "../AvatarUserGroup/User";
import Pic from "../../../../Assets/Demo.jpg";

const imgSize = "21rem";

const RecipeBox = () => {
  const [isFollow, setIsFollow] = useState(false);
  const followRef = useRef();

  useEffect(() => {
    if (isFollow) {
      followRef.current.textContent = "Following";
      console.dir(followRef.current.textContent);
    } else {
      followRef.current.textContent = "Follow";
    }
  }, [isFollow]);

  const handleFollowButton = () => {
    if (isFollow) {
      setIsFollow(false);
    } else {
      setIsFollow(true);
    }
  };

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
          <Box
            sx={{
              borderRadius: "16px",
              width: "46%",
              height: "1",
              backgroundColor: "blueviolet",
              backgroundImage: `url(${Pic})`,
              backgroundSize: "cover",
              backgroundPositionX: "35%",
            }}
          >
            {" "}
          </Box>
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
                <Stack
                  direction='row'
                  spacing={2}
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{ width: "76%" }}
                >
                  <User />
                  <Button
                    ref={followRef}
                    disableElevation
                    variant='text'
                    sx={{
                      ":hover": { backgroundColor: alpha("#FDEEDC", 0.7) },
                      width: 70,
                      height: 30,
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                    onClick={handleFollowButton}
                  >
                    Follow
                  </Button>
                </Stack>

                <Stack>
                  <PostSetting />
                </Stack>
              </Stack>
              <Box
                className={classes["post-content"]}
                sx={{ fontSize: "14px" }}
              >
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
              </Box>
              <Interactions buttonWidth='2em' />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RecipeBox;
