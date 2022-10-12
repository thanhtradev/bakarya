import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "./SideBar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SearchBar from "../UI/InputBar";
import { Box, Stack } from "@mui/material";
import Logo from "../Logo/logo";
const Categories = [
  "Birthday cake",
  "Bread",
  "Biscuit",
  "Mini Cake",
  "Cookie",
  "Crepe",
  "Pastry",
];

const SideBarLeft = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const listItems = Categories.map((cate, index) => (
    <ListItemButton
      key={index}
      selected={selectedIndex === index}
      onClick={(event) => handleListItemClick(event, index)}
      sx={{
        fontSize: "2rem",
        height: "2.5rem",
      }}
    >
      <ListItemText
        primary={cate}
        sx={{
          pointerEvents: "none",
          ".MuiTypography-root": {
            fontSize: "1.3rem",
          },
        }}
      />
    </ListItemButton>
  ));

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <SideBar boxShadow='-5px 3px 5px 2px #323232'>
      <Box
        sx={{
          height: "0.6",
          width: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Stack justifyContent='center' sx={{ height: "7rem" }}>
          <Logo />
        </Stack>
        <SearchBar placeholder='Search....' icon={<SearchIcon />} />
        <Box sx={{ width: "80%" }}>
          <List
            component='nav'
            aria-label='Categories'
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              width: "1",
              "&& .Mui-selected": {
                backgroundColor: "#F57328",
              },
              "&&:not(.Mui-selected) :hover": {
                backgroundColor: "#FFD8A9",
              },
            }}
          >
            {listItems}
          </List>
        </Box>
      </Box>
    </SideBar>
  );
};

export default SideBarLeft;
