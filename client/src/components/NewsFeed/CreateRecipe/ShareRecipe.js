import React from "react";
import { Avatar } from "@mui/material";
import InputBar from "../../UI/InputBar";
import { Box, Stack } from "@mui/system";

const ShareRecipe = (props) => {
  return (
    <Stack
      justifyContent='center'
      alignContent='flex-start'
      sx={{ width: "100%", height: "100%" }}
    >
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
    </Stack>
  );
};

export default ShareRecipe;
