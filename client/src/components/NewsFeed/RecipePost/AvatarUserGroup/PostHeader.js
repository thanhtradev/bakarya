import React, { useEffect, useState } from "react";
import { alpha, Avatar, Button, CardHeader } from "@mui/material";
import { Typography, Stack } from "@mui/material";
import { useRef } from "react";
import PostSetting from "../PostInteraction/PostSetting";

const User = () => {
  const [isFollow, setIsFollow] = useState(false);
  const followRef = useRef();

  useEffect(() => {
    if (isFollow) {
      followRef.current.textContent = "Following";
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
    <CardHeader
      avatar={
        <Avatar alt="Someone's Avatar" sx={{ width: 55, height: 55 }}>
          TT
        </Avatar>
      }
      title={
        <React.Fragment>
          <Typography>Thanh Tu</Typography>
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
        </React.Fragment>
      }
      titleTypographyProps={{
        display: "flex",
        width: "fit-content",
        alignItems: "center",
      }}
      subheader='25 September, 2022'
      action={
        <React.Fragment>
          <PostSetting />
        </React.Fragment>
      }
      sx={{ width: "100%", padding: 0 }}
    />
    //   <Stack
    //     direction='row'
    //     justifyContent='space-between'
    //     alignItems='center'
    //     sx={{ width: "57%" }}
    //   >
    //     <Avatar alt="Someone's Avatar" sx={{ width: 55, height: 55 }} />
    //     <span>
    //       <Typography variant='subtitle1' sx={{ fontWeight: "bold" }}>
    //         Thanh Tu
    //       </Typography>
    //     </span>
    //   </Stack>
    // );
  );
};

export default User;
