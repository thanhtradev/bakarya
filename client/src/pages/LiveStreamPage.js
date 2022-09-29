import { Stack } from "@mui/material";
import MainLayout from "../components/layout/mainLayout";
import LiveSection from "../components/LiveStream/LiveSection";

const LiveStreamPage = () => {
  return (
    <MainLayout>
      <Stack
        justifyContent='space-between'
        alignItems='center'
        sx={{
          width: "1",
          height: "1",
          // backgroundColor: "blueviolet"
        }}
      >
        <LiveSection />
        <LiveSection />
      </Stack>
    </MainLayout>
  );
};

export default LiveStreamPage;
