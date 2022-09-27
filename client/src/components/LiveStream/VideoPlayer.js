import { CardMedia, IconButton, Slider, Stack } from "@mui/material";
import React, { useEffect, useReducer, useRef, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const initVolume = {
  volumeValue: 0.1,
  icon: <VolumeDown sx={{ color: "white" }} />,
};

const volumeReducer = (state, action) => {
  if (action.type === "mute") {
    if (!action.muted) {
      return {
        icon: <VolumeDown sx={{ color: "white" }} />,
        volumeValue: state.volumeValue,
      };
    } else {
      console.log(state.volumeValue);
      return {
        volumeValue: state.volumeValue,
        icon: <VolumeOffIcon sx={{ color: "white" }} />,
      };
    }
  } else {
    if (action.volumeValue <= 0) {
      return {
        // volumeValue: 0,
        volumeValue: 0,
        icon: <VolumeOffIcon sx={{ color: "white" }} />,
      };
    } else {
      return {
        volumeValue: action.volumeValue,
        icon: <VolumeDown sx={{ color: "white" }} />,
      };
    }
  }
};

const VideoPlayer = ({ url }) => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeState, dispatchVolume] = useReducer(volumeReducer, initVolume);

  const handleVolumeChange = (event, newValue) => {
    if (videoRef.current.muted) {
      videoRef.current.muted = !videoRef.current.muted;
    } else {
      dispatchVolume({ volumeValue: newValue });
    }
    videoRef.current.volume = newValue;
  };

  useEffect(() => {
    videoRef.current.volume = volumeState.volumeValue;
    dispatchVolume({ type: "mute", muted: videoRef.current.muted });
  }, []);

  const handlePlayVideo = () => {
    setIsPlaying((prevState) => !prevState);
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleMute = () => {
    let isMuted = videoRef.current.muted;
    videoRef.current.muted = !isMuted;
    dispatchVolume({ type: "mute", muted: videoRef.current.muted });
  };

  return (
    <React.Fragment>
      <CardMedia
        ref={videoRef}
        component='video'
        src={url}
        position='relative'
        width='100%'
        height='50%'
        muted
        onClick={handlePlayVideo}
        sx={{
          width: "1",
          height: "1",
          cursor: "pointer",
          borderRadius: "10px",
        }}
        loop
      >
        <source src={url} type='video/mp4' />
      </CardMedia>
      <IconButton
        onClick={handlePlayVideo}
        sx={{
          position: "absolute",
          left: "0.33rem",
          bottom: "0.2rem",
          fontSize: "1.76em",
          color: "white",
        }}
      >
        {isPlaying ? (
          <PauseIcon fontSize='1em' />
        ) : (
          <PlayArrowIcon fontSize='1em' />
        )}
      </IconButton>
      <Stack
        alignItems='center'
        position='absolute'
        sx={{
          right: "0.33rem",
          bottom: "0.5rem",
          height: "0.17",
          "& .MuiSlider-thumb": {
            width: "15.5px",
            height: "15.5px",
          },
          "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
            boxShadow: "none",
          },
          "& :hover": {
            boxShadow: "none",
          },
          "& :before": {
            display: "none",
          },
        }}
      >
        <Slider
          defaultValue={30}
          orientation='vertical'
          aria-label='Volume'
          size='medium'
          max={0.5}
          step={0.01}
          min={0}
          onChange={handleVolumeChange}
          value={volumeState.volumeValue}
          sx={{ color: "white", height: "0.9" }}
        />
        <IconButton onClick={handleMute}>{volumeState.icon}</IconButton>
      </Stack>
    </React.Fragment>
  );
};

export default VideoPlayer;
