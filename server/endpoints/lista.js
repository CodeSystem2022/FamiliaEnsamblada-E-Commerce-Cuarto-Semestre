const { funcionMysql } = require("../utils/mysql");

exports.lista = async (req, res) => {
  console.log("hola");
  try {
    const conn = await funcionMysql();
    const query = `SELECT * FROM productos`;
    conn.query(query, function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({
        message: "ok",
        data: results,
      });
      conn.end((err) => {
        //   console.log("Conexión a DB cerrada");
      });
    });
  } catch (error) {
    console.log("error es, ", error);
  }
};
