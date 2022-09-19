import React from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import classes from "./Actions.module.css";

//* ICON SIZE
const iconWidth = "30px";
const iconHeight = "30px";
const Icons = [
  <Box component='span' className={classes["button-icon"]}>
    <AddAPhotoOutlinedIcon
      sx={{
        width: iconWidth,
        height: iconHeight,
      }}
    />
  </Box>,
  <Box component='span' className={classes["button-icon"]}>
    <OndemandVideoOutlinedIcon
      sx={{
        width: iconWidth,
        height: iconHeight,
      }}
    />
  </Box>,
  <Box component='span' className={classes["button-icon"]}>
    <EventOutlinedIcon
      sx={{
        width: iconWidth,
        height: iconHeight,
      }}
    />
  </Box>,
];

const IconTitle = ["Ảnh/Video", "Livestream", "Event"];

const actionList = Icons.map((icon, index) => (
  <Box
    key={index}
    component='div'
    sx={{
      display: "flex",
      width: "30%",
      height: "65%",
      justifyContent: "space-around",
      alignItems: "center",
      borderRadius: "10px",
    }}
  >
    <Button
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
        borderRadius: "inherit",
        alignItems: "center",
        padding: 0,
        "& .MuiTouchRipple-child": {
          backgroundColor: "black",
        },
        "&:hover": {
          backgroundColor: "burlywood",
        },
      }}
    >
      <Box component='div' className={classes["button-content__container"]}>
        <Box
          component='div'
          //   sx={{ width: "60%" }}
          className={classes["button-content"]}
        >
          {icon}
          <Box
            component='span'
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                height: "fit-content",
                color: "white",
                fontSize: "1.3em",
                padding: "0 10px",
              }}
            >
              <Typography
                component='p'
                sx={{
                  color: "white",
                }}
              >
                {IconTitle[index]}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Button>
  </Box>
));

const Actions = (props) => {
  return (
    <Box
      component='nav'
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: props?.width ?? "100%",
        height: "55%",
        backgroundColor: "#F57328",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      }}
    >
      {actionList}
    </Box>
  );
};

export default Actions;
