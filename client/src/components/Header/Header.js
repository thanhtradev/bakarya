import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../Logo/logo";
import HeaderTabs from "./HeaderTabs/HeaderTabs";
import HeaderAvatar from "./HeaderAvatar";
import Cart from "./Cart/Cart";
import Notification from "./Notification/Notific";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Stack from "@mui/material/Stack";

const Header = () => {
  const pages = ["Recipe", "Shops", "Blog"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Container
      maxWidth='xl'
      direction='row'
      position='relative'
      sx={{ height: "66px" }}
    >
      <AppBar
        position='fixed'
        sx={{ bgcolor: "transparent", boxShadow: "none" }}
      >
        <Grid
          maxWidth='xl'
          container
          columnSpacing={3}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "transparent",
          }}
        >
          <Toolbar>
            {/* {Appear in XS screen } */}

            <Grid
              direction='row'
              xs={4}
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
                sx={{ color: "black" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            {/* {Appear in MD screen } */}
            <Grid
              direction='row'
              justifyContent='center'
              alignItems='center'
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                padding: 0,
                bgcolor: "brown",
              }}
            >
              <HeaderTabs />
            </Grid>

            {/* <Grid
              direction='row'
              alignItems='center'
              md={3}
              justifyContent='flex-end'
              sx={{
                display: "flex",
                flexGrow: 0,
                width: "11rem",
              }}
            >
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ width: "80%", backgroundColor: "azure" }}
              >
                <Cart />
                <Notification />
                <HeaderAvatar />
              </Stack>
            </Grid> */}
          </Toolbar>
        </Grid>
      </AppBar>
    </Container>
  );
};

export default Header;
