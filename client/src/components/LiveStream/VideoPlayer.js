import { CardMedia } from "@mui/material";
import React, { useRef } from "react";

const VideoPlayer = ({ url }) => {
  const videoRef = useRef();

  const handlePlayVideo = (event) => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <React.Fragment>
      <CardMedia
        ref={videoRef}
        component='video'
        src={url}
        autoPlay
        muted
        width='50%'
        height='50%'
        onClick={handlePlayVideo}
        sx={{
          width: "50%",
          height: "50%",
          cursor: "pointer",
        }}
      >
        <source src={url} type='video/mp4' />
      </CardMedia>
    </React.Fragment>
  );
};

export default VideoPlayer;
