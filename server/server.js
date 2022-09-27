const express = require("express");
const cors = require("cors");

require("dotenv").config({
  path: "./.env",
});

const db = require("./models");
const ROLE = db.role;

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
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
}

// simple route
// app.get("/", (req, res) => {
//     res.json({
//         message: "Welcome to bakarya application."
//     });
// });

//route
require("./routes/auth.routes")(app);
require("./routes/user.router")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const port = process.env.PORT || 5000;
// app.use(express.json());
// app.use(require('./routes/record'));
// // get driver connection
// const dbo = require('./db/conn');

// app.listen(port, () => {
//     // perform a database connection when server starts
//     dbo.connectToServer(function (err) {
//         if (err) console.error(err);
//     });
//     console.log(`Server is running on port: ${port}`);
// });
