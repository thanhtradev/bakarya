import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Stack } from "@mui/system";
// import SideBarLeftContent from "./SideBarLeft";

const SideBar = (props) => {
  return (
    <Grid
      xs={4}
      md={4}
      lg={3}
      rowSpacing={3}
      sx={{
        display: { xs: props.xs ?? "flex", md: props.md ?? "flex" },
        justifyContent: props.justifyContent,
        // flexDirection: props.direction ?? "row",
        // bgcolor: "transparent",
        // bgcolor: "darkcyan",
        zIndex: "1050",
        overflow: "auto",
      }}
    >
      <Stack
        position='fixed'
        alignItems={`${props.stackAlignItems}`}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-start",
          height: "1",
          // marginTop: "8px",
        }}
      >
        <Stack
          direction='row'
          alignItems={`${props.stackAlignItems}`}
          justifyContent='center'
          sx={{
            height: "100%",
            backgroundColor: "#f3f1f1",
            backgroundColor: "transparent",
            boxShadow: props.boxShadow,
            width: props.width ?? "87%",
          }}
        >
          <Box
            component='div'
            sx={{
              display: "flex",
              width: "90%",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              // padding: "20px 0",
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
