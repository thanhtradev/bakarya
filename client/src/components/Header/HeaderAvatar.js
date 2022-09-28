import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import LoginContext from "../../store/auth-context";

const logginedSettings = ["Profile", "Account", "Dashboard", "Logout"];
const notLogginSetting = ["Login"];

const HeaderAvatar = () => {
  const isLoggined = React.useContext(LoginContext);

  const settings = isLoggined ? logginedSettings : notLogginSetting;

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const settingList = () => {
    if (settings.length === 1) {
      return (
        <MenuItem onClick={handleCloseUserMenu}>
          <Link
            to='/login-page'
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography textAlign='center'>{settings[0]}</Typography>
          </Link>
        </MenuItem>
      );
    } else {
      return settings.map((setting) => (
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
          <Typography textAlign='center'>{setting}</Typography>
        </MenuItem>
      ));
    }
  };

  return (
    <React.Fragment>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt='Remy Sharp'
            src='/static/images/avatar/2.jpg'
            sx={{
              height: "50px",
              width: "50px",
              fontSize: "1.3em",
            }}
          >
            <PersonIcon sx={{ fontSize: "1em" }} />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settingList()}
      </Menu>
    </React.Fragment>
  );
};

export default HeaderAvatar;
