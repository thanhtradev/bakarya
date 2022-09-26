import { Stack, IconButton, alpha } from "@mui/material";
import NormalHeartIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import LikedIcon from "@mui/icons-material/Favorite";
import { useReducer } from "react";

const iconSize = "1em";

const initLikeState = {
  icon: <NormalHeartIcon fontSize={iconSize} />,
  isLiked: false,
};

const likeStateReducer = (state) => {
  if (state.isLiked) {
    return {
      icon: <NormalHeartIcon fontSize={iconSize} />,
      isLiked: false,
    };
  } else {
    return {
      icon: <LikedIcon fontSize={iconSize} sx={{ color: "red" }} />,
      isLiked: true,
    };
  }
};

const VideoInteraction = () => {
  //? temporary first state of all like button is not like
  const [likeState, dispatchLikeState] = useReducer(
    likeStateReducer,
    initLikeState
  );

  const handleLike = () => {
    dispatchLikeState({ type: "like" });
  };

  const handleViewComment = () => {};

  const icons = [
    {
      icon: likeState.icon,
      action: handleLike,
    },
    { icon: <CommentIcon fontSize={iconSize} />, action: handleViewComment },
  ];

  const actions = icons.map((btn, i) => (
    <IconButton
      key={i}
      size='large'
      onClick={btn.action}
      sx={{
        backgroundColor: alpha("#aaa5a5", 0.5),
        fontSize: "2em",
        "&.MuiIconButton-root:hover": {
          color: "white",
          backgroundColor: "#f57328",
        },
      }}
    >
      {btn.icon}
    </IconButton>
  ));

  return (
    <Stack
      alignItems='flex-end'
      justifyContent='flex-end'
      spacing={2}
      sx={{ height: "1", paddingBottom: "1.3rem" }}
    >
      {actions}
    </Stack>
  );
};

export default VideoInteraction;
