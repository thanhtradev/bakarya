import * as React from "react";
import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";

const SearchBar = (props) => {
  const SearchBarWidth = props?.width ?? "80%";
  const SearchBarHeight = props?.height ?? "2.4rem";
  const borderRadius = props?.borderRadius ?? "20px";

  const Search = styled("div")(({ theme }) => ({
    borderRadius: borderRadius,
    display: "flex",
    flexDirection: "row",
    backgroundColor: props?.backgroundColor ?? "#FFD8A9",
    "&:hover": {
      backgroundColor: props?.backgroundColorOnHover ?? "#ffc5a4",
    },
    [theme.breakpoints.up("sm")]: {
      width: SearchBarWidth,
    },
    height: SearchBarHeight,
  }));

  const IconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1.3),
    height: "100%",
    width: "15%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      // vertical padding + font size from searchIcon
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("md")]: {
        width: props.icon === undefined ? "100%" : "85%",
        paddingLeft: props.icon == null ? "14px" : "none",
      },
      height: "100%",
      fontSize: props?.fontSize ?? "24px",
    },
  }));

  return (
    <Search>
      {props.icon !== undefined && <IconWrapper>{props.icon}</IconWrapper>}
      <StyledInputBase
        placeholder={props?.placeholder ?? "Enter something here"}
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchBar;
