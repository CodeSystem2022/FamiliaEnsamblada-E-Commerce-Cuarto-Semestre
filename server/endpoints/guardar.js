const { funcionMysql } = require("../utils/mysql");

exports.guardar = async (req, res) => {
  try {
    const { nombre } = req.body;

    const conn = await funcionMysql();
    const query = `INSERT INTO producto (nombre) VALUES (?)`;
    conn.query(query, [nombre], function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({ message: "ok" });
      conn.end((err) => {
        //   console.log("Conexión a DB cerrada");
      });
    });
  } catch (error) {
    console.log("error es, ", error);
  }
};
