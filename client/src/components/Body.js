import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

const Body = (props) => {
  return (
    <Grid
      container
      rowSpacing={4}
      position='sticky'
      columnSpacing={2}
      sx={{
        margin: 0,
        height: "43.3rem",
        justifyContent: "center",
      }}
    >
      {props.children}
    </Grid>
  );
};

export default Body;
