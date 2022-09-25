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
      <h1>Live Stream Page</h1>
    </Grid>
  );
};

export default LiveStreamPage;
