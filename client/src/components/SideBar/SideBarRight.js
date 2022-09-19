import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SideBar from "./SideBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  ...theme.typography.body2,
  textAlign: "center",
  height: "10%",
  color: theme.palette.text.secondary,
}));

const SideBarRight = () => {
  return (
    <SideBar>
      <Item>Category 1</Item>
      <Item>Category 2</Item>
      <Item>Category 3</Item>
      <Item>Category 4</Item>
      <Item>Category 5</Item>
    </SideBar>
  );
};

export default SideBarRight;
