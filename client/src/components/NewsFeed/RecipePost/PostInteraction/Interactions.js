import React from "react";
import { Typography, Button, Stack, alpha, Divider } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import classes from "../RecipePost.module.scss";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";

const interactionsObj = [
  {
    icon: (
      <GradeOutlinedIcon sx={{ minHeight: "0.64rem", fontSize: "1.56rem" }} />
    ),
    title: "Mlem",
  },
  {
    icon: (
      <ChatBubbleOutlineOutlinedIcon
        sx={{ minHeight: "0.64rem", fontSize: "1.56rem" }}
      />
    ),
    title: "Comment",
  },
  {
    icon: (
      <BookmarkAddOutlinedIcon
        sx={{ minHeight: "0.64rem", fontSize: "1.56rem" }}
      />
    ),
    title: "Save",
  },
];

const NewDivider = () => {
  return (
    <Stack
      component='span'
      justifyContent='center'
      alignItems='center'
      sx={{ width: "100%", height: "2rem" }}
    >
      <Divider
        variant='middle'
        sx={{ width: "100%", marginBottom: "13px", height: "100%" }}
      />
    </Stack>
  );
};
const Interactions = (props) => {
  const interactionTabs = interactionsObj.map((obj, index) => (
    <Stack
      key={obj.title}
      direction='row'
      className={classes["interaction-content"]}
    >
      <Button
        variant='text'
        fullWidth
        sx={{
          borderRadius: "5px",
          ":hover": { backgroundColor: alpha("#FDEEA1", 0.46) },
          backgroundColor: alpha("#FDEEDC", 0.46),
          // backgroundColor: "aquamarine",
          textTransform: "capitalize",
          padding: "none",
          "&&.MuiButton-root": {
            // padding: "0 10px",
            height: "2rem",
            fontSize: "0.8em",
          },
          width: "100%",
        }}
      >
        {obj.icon}
        <Typography
          component='span'
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 5px",
            minWidth: props.buttonWidth ?? "4em",
            fontSize: "1.3em",
          }}
        >
          {obj.title}
        </Typography>
      </Button>
    </Stack>
  ));

  return (
    <Stack className={classes["post-interaction"]}>
      <NewDivider />
      <Stack
        direction='row'
        justifyContent='space-evenly'
        alignItems='center'
        sx={{
          width: "90%",
          height: "100%",
          // backgroundColor: alpha("#F58", 0.3),
        }}
      >
        {interactionTabs}
      </Stack>
      <NewDivider />
    </Stack>
  );
};

export default Interactions;
