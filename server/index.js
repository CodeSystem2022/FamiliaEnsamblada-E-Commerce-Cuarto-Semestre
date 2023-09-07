const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const { list } = require("./endpoints/list");
const { update } = require("./endpoints/update");
const { erase } = require("./endpoints/delete");
const { save } = require("./endpoints/save");
const { login } = require("./endpoints/login");
const { isAuthenticated } = require("./middlewares/isAuthenticated");
app.use(express.json());
// define a middleware to check if the user is authenticated
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const upload = multer({ dest: "images/" });
app.use(cors());
app.get("/api/list", list);
app.post("/api/admin/save", upload.single("image"), isAuthenticated, save);
app.put("/api/admin/update", upload.single("image"), isAuthenticated, update);
app.delete("/api/admin/delete", isAuthenticated, erase);
app.use("/images", express.static(path.join(__dirname, "images"))); // serve the images/ directory as a static directory
app.post("/api/login", login);
// GET, POST , PUT, DELETE
// https://familia-ensamblada.com/api/lista
//http://localhost:3400/api/lista
app.listen(3400, function () {
  console.log("Listening on port 3400!");
});
//Para correr el server usar nodemon index.js o node index.js
