import classes from "./logo.module.css";
import React from "react";
import LogoImg from "../../Assets/logo-Final.png";
const Logo = () => {
  return (
    <div className={classes["logo-container"]}>
      <img src={LogoImg} alt='Logo Bakarya' className={classes["logo-img"]} />
    </div>
  );
};

export default Logo;
