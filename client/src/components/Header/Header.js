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
import HeaderTabs from "./HeaderTabs/HeaderTabs";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

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
              {/* <HeaderTabs /> */}
            </Grid>
          </Toolbar>
        </Grid>
      </AppBar>
    </Container>
  );
};

export default Header;
