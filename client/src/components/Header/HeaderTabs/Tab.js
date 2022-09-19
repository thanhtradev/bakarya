import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Tab from "@mui/material/Tab";

const HTab = (props) => {
  return (
    <Tooltip title={props.title} arrow>
      <Tab label={props.label} sx={{ width: "0.25" }} />
    </Tooltip>
  );
};

export default HTab;
