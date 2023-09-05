const mysql = require("mysql");
const funcionMysql = async () => {
  const pool = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "e-commerce",
  });
  // pool.on("error", funcionMysql());

  return pool;
};

module.exports = { funcionMysql };
