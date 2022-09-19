import * as React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HeaderFloatButton from "../../HeaderFloatButton";
const Cart = () => {
  return (
    <HeaderFloatButton>
      <ShoppingCartOutlinedIcon sx={{ color: "#767171", fontSize: "1.9em" }} />
    </HeaderFloatButton>
  );
};

export default Cart;
