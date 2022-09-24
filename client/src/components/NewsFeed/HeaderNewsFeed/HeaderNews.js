import * as React from "react";
import Tabs from "@mui/material/Tabs";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import Tooltip from "@mui/material/Tooltip";
import Tab from "@mui/material/Tab";
import { Stack, Container, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { spacing } from "@mui/system";

const theme = createTheme({
  overrides: {
    MUITabs: {
      justifyContent: "space-around",
    },
  },
});

const HeaderContainer = styled("div")({
  position: "fixed",
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

function HeaderNews() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              {/* {tabsList} */}
              <Tooltip title='Recipe Page' arrow>
                <Tab
                  label={<HomeOutlinedIcon sx={{ fontSize: "42px" }} />}
                  sx={{ width: "0.2" }}
                />
              </Tooltip>
              <Tooltip title='Shopping Page' arrow>
                <Tab
                  label={
                    <ShoppingBasketOutlinedIcon sx={{ fontSize: "42px" }} />
                  }
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
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HeaderNews;
