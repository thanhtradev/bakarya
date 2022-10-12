import React, { useState } from "react";
import RecipeBox from "./RecipeBox/RecipeBox";
import RecipeContent from "./RecipeContent";

const RecipePost = () => {
  const [isViewContent, setIsViewContent] = useState(false);

  const viewContentHandler = () => {
    console.log(false);
    setIsViewContent((prevState) => true);
  };

  return (
    <div onClick={viewContentHandler}>
      {isViewContent === true ? <RecipeContent /> : <RecipeBox />}
    </div>
  );
};

export default RecipePost;
