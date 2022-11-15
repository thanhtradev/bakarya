const express = require("express");
const cors = require("cors");

require("dotenv").config({
  path: "./.env",
});

const dbConfig = require('./config/db.config');

const db = require("./models");
const ROLE = db.role;
const RECIPECATEGORY = db.recipeCategory;

const app = express();

var corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:3000", "http://admin.bakarya.com", "http://www.admin.bakarya.com", "http://bakarya.com", "http://www.bakarya.com", "http://192.168.1.11:8081", "http://192.168.1.6:8081", "http://192.168.100.159:8081"],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

db.mongoose
  .connect(process.env.ATLAS_URI, {
    // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  ROLE.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new ROLE({
        name: "baker",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'baker' to roles collection");
      });

      new ROLE({
        name: "retail",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'retail' to roles collection");
      });

      new ROLE({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });

  RECIPECATEGORY.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      db.RECIPECATEGORIES.forEach((category) => {
        new RECIPECATEGORY({
          name: category,
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log(
            "added '" + category + "' to recipe categories collection"
          );
        });
      });
    }
  });
}

// simple route
// app.get("/", (req, res) => {
//     res.json({
//         message: "Welcome to bakarya application."
//     });
// });

//route
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/recipe.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/product.routes")(app);
require("./routes/cart.routes")(app);
require("./routes/order.routes")(app);
require("./routes/comment.routes")(app);
require("./routes/mlem.routes")(app);
require("./routes/recipeReport.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});