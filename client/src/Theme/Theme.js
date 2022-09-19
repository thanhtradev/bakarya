import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F57328",
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

export default function Palette(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
