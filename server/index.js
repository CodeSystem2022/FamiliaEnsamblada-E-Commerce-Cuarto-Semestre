const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const { list } = require("./endpoints/list");
const { update } = require("./endpoints/update");
const { erase } = require("./endpoints/delete");
const { save } = require("./endpoints/save");
const path = require("path");
app.use(express.json());

const upload = multer({ dest: "images/" });
app.use(cors());
app.get("/api/list", list);
app.post("/api/admin/save", upload.single("image"), save);
app.put("/api/admin/update", update);
app.delete("/api/admin/delete", erase);
app.use("/images", express.static(path.join(__dirname, "images"))); // serve the images/ directory as a static directory

// GET, POST , PUT, DELETE
// https://familia-ensamblada.com/api/lista
//http://localhost:3400/api/lista
app.listen(3400, function () {
  console.log("Listening on port 3400!");
});
//Para correr el server usar nodemon index.js o node index.js
