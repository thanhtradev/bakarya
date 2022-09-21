import React from "react";
import { Avatar } from "@mui/material";
import { Box, Typography, Button, Stack } from "@mui/material";

const User = () => {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ width: "57%" }}
    >
      <Avatar alt="Someone's Avatar" sx={{ width: 55, height: 55 }} />
      <span>
        <Typography variant='subtitle1' sx={{ fontWeight: "bold" }}>
          Thanh Tu
        </Typography>
      </span>
    </Stack>
  );
};

export default User;
