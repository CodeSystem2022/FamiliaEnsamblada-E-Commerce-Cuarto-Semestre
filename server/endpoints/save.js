const { functionMysql } = require("../utils/mysql");

exports.save = async (req, res) => {
  try {
    const { brand, model, quantity, accesories } = req.body;

    const conn = await functionMysql();
    const query = `INSERT INTO products (brand, model, quantity, accesories) VALUES (?, ?, ?, ?)`;
    conn.query(query, [brand, model, quantity, accesories], function (error, results, fields) {
      if (error) return res.status(304).json({message:'error'})
      res.status(200).json({ message: "ok" });
      conn.end((err) => {
        //   console.log("Conexión a DB cerrada");
      });
    });
  } catch (error) {
    console.log("error es, ", error);
  }
};
