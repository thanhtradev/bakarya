import { Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const LiveStreamPage = () => {
  return (
    <Grid
      xs={12}
      md={8}
      lg={6}
      sx={{
        bgcolor: "white",
        height: `${24 * (1 + 0.4)}rem`,
        zIndex: "0",
      }}
    >
      <Stack
        justifyContent='center'
        alignItems='center'
        sx={{ width: "1", height: "1" }}
      >
        <h1>COMMING SOON</h1>
      </Stack>
    </Grid>
  );
};

export default LiveStreamPage;
