import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const MainLayout = (props) => {
  return (
    <Grid
      xs={12}
      md={8}
      lg={6}
      sx={{
        bgcolor: "white",
        zIndex: "0",
      }}
    >
      <Box sx={{ height: "100%", height: "5.1rem" }} />
      {props.children}
    </Grid>
  );
};

export default MainLayout;
