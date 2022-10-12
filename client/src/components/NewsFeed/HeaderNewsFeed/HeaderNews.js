import * as React from "react";
import Tabs from "@mui/material/Tabs";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import Tooltip from "@mui/material/Tooltip";
import Tab from "@mui/material/Tab";
import { Stack, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useLocation } from "react-router-dom";

const theme = createTheme({
  overrides: {
    MUITabs: {
      justifyContent: "space-around",
    },
  },
});

const tabComponents = [
  {
    icon: <HomeOutlinedIcon sx={{ fontSize: "42px" }} />,
    name: "Recipe Page",
    navlink: "/home/recipe-page",
  },
  {
    icon: <ShoppingBasketOutlinedIcon sx={{ fontSize: "42px" }} />,
    name: "Shopping Page",
    navlink: "/home/shopping-page",
  },
  {
    icon: <LiveTvOutlinedIcon sx={{ fontSize: "42px" }} />,
    name: "Livestreams",
    navlink: "/home/livestream-page",
  },
  {
    icon: <BookmarksOutlinedIcon sx={{ fontSize: "42px" }} />,
    name: "Saved Recipe",
    navlink: "/home/saved-recipe-page",
  },
];

function HeaderNews() {
  const location = useLocation();
  let currentPathIndex = tabComponents.findIndex(
    (item) => item.navlink === location.pathname
  );

  if (currentPathIndex === -1) {
    currentPathIndex = 0;
  }

  const [value, setValue] = React.useState(currentPathIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabList = tabComponents.map((tab, index) => (
    <Tooltip title={tab.name} arrow key={index}>
      <Tab
        label={tab.icon}
        sx={{ width: "0.2" }}
        to={tab.navlink}
        component={NavLink}
      />
    </Tooltip>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Box
        maxWidth='xs'
        sx={{
          // backgroundColor: "turquoise",
          position: "fixed",
          top: 0,
          right: "0",
          left: 0,
          zIndex: 1000,
          //   width: "70%",
        }}
      >
        <Box>
          <Stack
            direction='row'
            justifyContent='space-around'
            alignItems='center'
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              //   backgroundColor: "crimson",
              padding: 0,
            }}
          >
            <Tabs
              component='nav'
              sx={{
                width: "0.47",
                display: "flex",
                justifyContent: "space-around",
                "&& .Mui-selected": {
                  color: "#F57328",
                },
                "& button:hover": {
                  backgroundColor: "#cecece61",
                },
                bgcolor: "#F3F1F1",
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
              {tabList}
            </Tabs>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HeaderNews;
