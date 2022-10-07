const DOMAIN = "";
const API_KEY = "AIzaSyBmAVs5sXUk8CSXLAYqNOkyr2ATRewsD44";
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

// export const SignUp = () => {
//   var raw = {
//     username: "test2da",
//     password: "!wetyqwqytw7676S",
//     email: "thahsaas",
//     returnSecureToken : true,
//   };

//   var requestOptions = {
//     method: "POST",
//     body: JSON.stringify(raw),
//     redirect: "follow",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   fetch(
//     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
//     requestOptions
//   )
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// };
var raw =
  '{\n    "username": "test2da",\n    "password": "!wetyqwqytw7676S",\n    "email": "thahsaas"\n}';

export const SignUp = ({ firstname, lastname, username, pwd }) => {
  const transferData = {
    username: username,
    password: pwd,
    email: username,
    // firstname: firstname,
    // lastname: lastname,
  };

  var optns = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };
  fetch("http://api.bakarya.com/api/auth/signup", optns)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
