import React from "react";
import ShareRecipe from "./ShareRecipe";
import { Paper } from "@mui/material";
import Actions from "./Actions";
//* SIZE CONFIG
const width = "100%";

const CreateRecipe = () => {
  return (
    <Paper
      elevation={9}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "15%",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <ShareRecipe width={width} />
      <Actions width='100%' />
    </Paper>
  );
};

export default CreateRecipe;
