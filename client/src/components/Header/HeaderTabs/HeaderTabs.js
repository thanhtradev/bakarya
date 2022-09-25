import * as React from "react";
import Tabs from "@mui/material/Tabs";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import Tooltip from "@mui/material/Tooltip";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  overrides: {
    MUITabs: {
      justifyContent: "space-around",
    },
  },
});

const tabNames = [
  "Recipe Page",
  "Shopping Page",
  "Livestreams",
  "Saved Recipe",
];

const tabComponents = [
  <HomeOutlinedIcon sx={{ height: "42px" }} />,
  <ShoppingBasketOutlinedIcon sx={{ height: "42px" }} />,
  <LiveTvOutlinedIcon sx={{ height: "42px" }} />,
  <BookmarksOutlinedIcon sx={{ height: "42px" }} />,
];

function HeaderTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Tabs
        component='nav'
        sx={{
          width: "1",
          display: "flex",
          justifyContent: "space-around",
          "&& .Mui-selected": {
            color: "#F57328",
          },
          "& button:hover": {
            backgroundColor: "#cecece61",
          },
          bgcolor: "#F3F1F1",
          margin: "4px 0 ",
          borderBottomLeftRadius: "14px",
          borderBottomRightRadius: "14px",
        }}
        value={value}
        TabIndicatorProps={{
          sx: {
            backgroundColor: "#F57328",
            borderBottom: "5px solid",
            color: "#F57328",
            height: 1.5,
            borderRadius: "10px",
          },
        }}
        aria-label='Tabs of pages'
        onChange={handleChange}
        centered
      >
        {/* {tabsList} */}
        <Tooltip title='Recipe Page' arrow>
          <Tab
            label={<HomeOutlinedIcon sx={{ fontSize: "42px" }} />}
            sx={{ width: "0.2" }}
          />
        </Tooltip>
        <Tooltip title='Shopping Page' arrow>
          <Tab
            label={<ShoppingBasketOutlinedIcon sx={{ fontSize: "42px" }} />}
            sx={{ width: "0.2" }}
          />
        </Tooltip>
        <Tooltip title='Livestreams' arrow>
          <Tab
            label={<LiveTvOutlinedIcon sx={{ fontSize: "42px" }} />}
            sx={{ width: "0.2" }}
          />
        </Tooltip>
        <Tooltip title='Saved Recipe' arrow>
          <Tab
            label={<BookmarksOutlinedIcon sx={{ fontSize: "42px" }} />}
            sx={{ width: "0.2" }}
          />
        </Tooltip>
      </Tabs>
    </ThemeProvider>
  );
}

export default HeaderTabs;
