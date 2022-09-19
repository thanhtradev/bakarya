import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "./SideBar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SearchBar from "../../UI/InputBar";

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
        borderTopRightRadius: "15px",
        borderBottomLeftRadius: "15px",
      }}
    >
      <ListItemText
        primary={cate}
        sx={{
          pointerEvents: "none",
          ".MuiTypography-root": {
            fontSize: "1.3rem",
            fontWeight: "bold",
          },
        }}
      />
    </ListItemButton>
  ));

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <SideBar>
      <SearchBar placeholder='Search....' icon={<SearchIcon />} />
      <List
        component='nav'
        aria-label='Categories'
        sx={{
          width: "80%",
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
    </SideBar>
  );
};

export default SideBarLeft;
