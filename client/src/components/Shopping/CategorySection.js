import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ProductCard from "./ProductCard";
import ProductSlider from "./ProductSlider";

const CategorySection = (props) => {
  const productCards = props.items.map((item) => {
    return <ProductCard item={item} />;
  });

  return (
    <Stack
      justifyContent='space-between'
      alignItems='flex-start'
      sx={{
        // backgroundColor: "bisque",
        width: "100%",
        height: "20rem",
      }}
    >
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          height: "2rem",
          minWidth: "25%",
          backgroundColor: "#E6A9A0",
          borderRadius: "16px",
        }}
      >
        <Typography
          align='center'
          sx={{ fontSize: "1.3em", paddingLeft: "7px", color: "white" }}
          variant='caption'
        >
          {props.title}
        </Typography>
      </Stack>
      <Box
        sx={{
          height: "0.85",
          display: "-webkit-box",
          width: "1",
          //   backgroundColor: "coral",
        }}
      >
        {/* {productCards} */}
        <ProductSlider items={props.items} />
      </Box>
    </Stack>
  );
};

export default CategorySection;
