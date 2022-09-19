import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Stack, alpha } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import classes from "./RecipePost.module.scss";
import User from "./AvatarUserGroup/User";
import Pic from "../../Assets/Demo.jpg";
import Interactions from "./PostInteraction/Interactions";
import PostSetting from "./PostInteraction/PostSetting";

const RecipePost = () => {
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
    <Box className={classes.post}>
      <Stack sx={{ padding: "7px 13px" }} spacing={1.5}>
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
            sx={{ width: "33%" }}
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
