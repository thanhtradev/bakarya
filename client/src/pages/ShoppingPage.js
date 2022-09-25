import { Box, Stack } from "@mui/material";
import MainLayout from "../components/layout/mainLayout";
import CategorySection from "../components/Shopping/CategorySection";

const ShoppingPage = () => {
  const DUMMY_CATEGORY = ["Dry ingredient", "Fresh ingredient", "Baking tools"];
  const DUMMY_INGREDIENT = [
    {
      id: 1,
      img: "",
      name: "sugar",
      price: "20000",
      metric: "kg",
      rating: 3,
    },
    {
      id: 2,
      img: "",
      name: "flour",
      price: "20000",
      metric: "kg",
      rating: 4,
    },
    {
      id: 3,
      img: "",
      name: "egg",
      price: "20000",
      metric: "kg",
      rating: 5,
    },
  ];

  const categorySections = DUMMY_CATEGORY.map((cate) => {
    return <CategorySection title={cate} items={DUMMY_INGREDIENT} />;
  });
  return (
    <MainLayout>
      <Stack
        justifyContent='space-evenly'
        sx={{
          height: `${DUMMY_CATEGORY.length * 20.3}rem`,
          width: "100%",
          backgroundColor: "blueviolet",
        }}
      >
        {categorySections}
      </Stack>
    </MainLayout>
  );
};

export default ShoppingPage;
