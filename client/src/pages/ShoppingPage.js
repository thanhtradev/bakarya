import { Stack } from "@mui/material";
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
      rating: 2,
    },
    {
      id: 3,
      img: "",
      name: "egg",
      price: "20000",
      metric: "kg",
      rating: 4.7,
    },
    {
      id: 4,
      img: "",
      name: "Butter",
      price: "20000",
      metric: "kg",
      rating: 2.4,
    },
    {
      id: 5,
      img: "",
      name: "Butter",
      price: "20000",
      metric: "kg",
      rating: 2.4,
    },
  ];

  const categorySections = DUMMY_CATEGORY.map((cate, index) => {
    return (
      <CategorySection key={index} title={cate} items={DUMMY_INGREDIENT} />
    );
  });

  return (
    <MainLayout>
      <Stack
        justifyContent='space-evenly'
        sx={{
          height: `${DUMMY_CATEGORY.length + 3 * 20.3}rem`,
          width: "100%",
          // backgroundColor: "blueviolet",
        }}
      >
        {categorySections}
      </Stack>
    </MainLayout>
  );
};

export default ShoppingPage;
