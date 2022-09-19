import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import * as React from "react";
import HeaderFloatButton from "../../HeaderFloatButton";

const Notific = () => {
  return (
    <HeaderFloatButton>
      <NotificationsActiveOutlinedIcon
        sx={{ color: "#767171", fontSize: "1.9em" }}
      />
    </HeaderFloatButton>
  );
};

export default Notific;
