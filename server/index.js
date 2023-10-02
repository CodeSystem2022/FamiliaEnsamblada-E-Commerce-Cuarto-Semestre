const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const { list } = require("./endpoints/list");
const { update } = require("./endpoints/update");
const { erase } = require("./endpoints/delete");
const { save } = require("./endpoints/save");
const { login } = require("./endpoints/login");
const { isAuthenticated } = require("./middlewares/isAuthenticated");
const { functionMercadoPago } = require("./endpoints/mercadopago");
app.use(express.json());

app.use(cors());
app.get("/api/list", list);
app.post("/api/admin/save", isAuthenticated, save);
app.put("/api/admin/update", isAuthenticated, update);
app.delete("/api/admin/delete", isAuthenticated, erase);
app.use("/images", express.static(path.join(__dirname, "images"))); // serve the images/ directory as a static directory
app.post("/api/login", login);
app.post("/api/mercadopago", functionMercadoPago);

app.listen(3400, function () {
  console.log("Listening on port 3400!");
});
