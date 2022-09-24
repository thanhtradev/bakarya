import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Stack } from "@mui/system";
import SideBarLeftContent from "./SideBarLeft";

const SideBar = (props) => {
  return (
    <Grid
      xs={4}
      md={4}
      lg={3}
      rowSpacing={3}
      sx={{
        display: { xs: props.xs ?? "flex", md: props.md ?? "flex" },
        justifyContent: "flex-start",
        // bgcolor: "transparent",
        // bgcolor: "darkcyan",
        zIndex: "0",
        overflow: "auto",
      }}
    >
      <Stack
        position='fixed'
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-start",
          marginTop: "8px",
        }}
      >
        <Stack
          direction='row'
          alignItems='flex-start'
          justifyContent='center'
          sx={{ height: "100%", backgroundColor: "#f3f1f1", width: "100%" }}
        >
          <Box
            component='div'
            sx={{
              display: "flex",
              width: "90%",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "20px 0",
              height: "100%",
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
