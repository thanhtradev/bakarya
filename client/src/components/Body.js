import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

const Body = (props) => {
  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={6}
      sx={{
        margin: 0,
        height: "43.3rem",
        justifyContent: "center",
        // bgcolor: "#f3F1F1",
        bgcolor: "transparent",
      }}
    >
      {props.children}
    </Grid>
  );
};

export default Body;
