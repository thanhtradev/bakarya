import React from "react";
import Badge from "@mui/material/Badge";
import Fab from "@mui/material/Fab";

const HeaderFloatButton = (props) => {
  return (
    <Fab
      color='primary'
      aria-label='add'
      size='small'
      sx={{
        boxShadow: 0,
        bgcolor: "#bdbdbd",
        "&:hover": {
          backgroundColor: "#F57328",
        },
        height: "50px",
        width: "50px",
      }}
    >
      <Badge
        badgeContent={3}
        sx={{
          "& .MuiBadge-badge": {
            color: "white",
            backgroundColor: "#F57328",
          },
        }}
      >
        {props.children}
      </Badge>
    </Fab>
  );
};

export default HeaderFloatButton;
