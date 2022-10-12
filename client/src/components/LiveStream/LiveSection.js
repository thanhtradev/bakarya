import {
  alpha,
  Avatar,
  Stack,
  Button,
  Card,
  CardHeader,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import demo from "../../Assets/livestream.mp4";
import VideoPlayer from "./VideoPlayer";
import VideoInteraction from "./VideoInteraction";

const LiveSection = ({ isPlaying }) => {
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
    <Card sx={{ width: "0.9", boxShadow: "none" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: "46", height: "46", backgroundColor: "crimson" }}
          >
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
                width: 80,
                height: 30,
                padding: "0 4px",
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
        subheader='26 September, 2022'
      />
      <Stack
        direction='row'
        alignItems='flex-end'
        justifyContent='center'
        spacing={2}
        sx={{
          width: "1",
          //   backgroundColor: "darkcyan"
        }}
      >
        <Box
          component='div'
          sx={{
            width: "50%",
            height: "1",
            position: "relative",
          }}
        >
          <VideoPlayer url={demo} />
        </Box>
        <VideoInteraction />
      </Stack>
    </Card>
  );
};

export default LiveSection;
