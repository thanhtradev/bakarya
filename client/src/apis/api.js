const DOMAIN = "";

export const getIngredient = async () => {
  const response = await fetch(`${DOMAIN}/ingredients.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Some thing went wrong");
  }

  const loadedIngredients = [];
  data.forEach((key) => {
    loadedIngredients.push({
      id: key,
      ...data[key],
    });
  });

  return loadedIngredients;
};
