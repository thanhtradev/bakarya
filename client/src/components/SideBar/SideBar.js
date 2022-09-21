import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Stack } from "@mui/system";
import SideBarLeftContent from "./SideBarLeft";

const SideBar = (props) => {
  return (
    <Grid
      xs={3}
      md={3}
      rowSpacing={3}
      position='relative'
      sx={{
        display: { xs: "none", md: "flex" },
        justifyContent: "flex-start",
        bgcolor: "transparent",
        // bgcolor: "darkcyan",
      }}
    >
      <Stack
        position='fixed'
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-start",
          bgcolor: "#f3F1F1",
          marginTop: "8px",
        }}
      >
        <Stack direction='row' alignItems='flex-start' sx={{ height: "40rem" }}>
          <Box
            component='div'
            position='relative'
            sx={{
              display: "flex",
              width: "90%",
              height: "100%",
              left: "10px",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "20px 0",
            }}
          >
            {props.children}
          </Box>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default SideBar;
