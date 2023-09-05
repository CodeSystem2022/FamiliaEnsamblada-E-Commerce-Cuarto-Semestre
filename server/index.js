const express = require("express");
const app = express();
const cors = require("cors");
const { list } = require("./endpoints/list");
const { update } = require("./endpoints/update");
const { erase } = require("./endpoints/delete");
const { save } = require("./endpoints/save");
app.use(express.json());
app.use(cors());
app.get("/api/list", list);
app.post("/api/admin/save", save);
app.put("/api/admin/update", update);
app.delete("/api/admin/delete", erase);
// GET, POST , PUT, DELETE
// https://familia-ensamblada.com/api/lista
//http://localhost:3400/api/lista
app.listen(3400, function () {
  console.log("Listening on port 3400!");
});
