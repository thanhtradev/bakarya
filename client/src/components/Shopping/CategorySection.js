import { Stack, Typography } from "@mui/material";

const CategorySection = (props) => {
  const ingredients = props.items.map((item) => {
    return;
  });

  return (
    <Stack
      justifyContent='space-evenly'
      alignItems='flex-start'
      sx={{ backgroundColor: "bisque", width: "100%", height: "18rem" }}
    >
      <Stack
        alignItems='flex-start'
        justifyContent='center'
        sx={{
          height: "2rem",
          minWidth: "25%",
          backgroundColor: "brown",
        }}
      >
        <Typography
          align='center'
          sx={{ fontSize: "1.3em", paddingLeft: "7px" }}
          variant='caption'
        >
          {props.title}
        </Typography>
        <Stack></Stack>
      </Stack>
    </Stack>
  );
};

export default CategorySection;
