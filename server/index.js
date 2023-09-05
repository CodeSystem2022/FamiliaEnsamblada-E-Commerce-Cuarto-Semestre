const express = require("express");
const app = express();
const cors = require("cors");
const { lista } = require("./endpoints/lista");
const { guardar } = require("./endpoints/guardar");
app.use(express.json());
app.use(cors());
app.get("/api/lista", lista);
app.post("/api/guardar", guardar);
// GET, POST , PUT, DELETE
// https://familia-ensamblada.com/api/lista
//http://localhost:3400/api/lista
app.listen(3400, function () {
  console.log("Listening on port 3400!");
});
