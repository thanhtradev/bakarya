import React from "react";
import { Avatar, Paper } from "@mui/material";
import InputBar from "../../UI/InputBar";
import { Box } from "@mui/system";

const ShareRecipe = (props) => {
  return (
    <Box
      sx={{
        width: props?.width ?? "100%",
        height: "60%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ width: 45, height: 45 }}>TT</Avatar>
      <InputBar
        placeholder='Hello Thanh Tu, What do you want to share ?'
        width='70%'
        height='2.3rem'
        backgroundColor='#D9D9D9'
        backgroundColorOnHover='#FFD8A9'
        fontSize='17px'
      />
    </Box>
  );
};

export default ShareRecipe;
