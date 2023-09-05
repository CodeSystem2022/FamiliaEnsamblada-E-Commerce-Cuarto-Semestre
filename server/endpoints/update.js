const { functionMysql } = require("../utils/mysql");

exports.update = async (req, res) => {
  try {
    const {brand, model, quantity, accesories, id_product} = req.body;
    const conn = await functionMysql();
    const query = 'UPDATE products SET brand = ?, model = ?, quantity = ?, accesories = ? WHERE id_product = ? LIMIT 1';
    conn.query(query, [brand, model, quantity, accesories, id_product], function (error, results, fields) {
      if (error) return res.status(304).json({message:'error'})
      res.status(200).json({
        message: "ok",
        
      });
      conn.end((err) => {
        //   console.log("Conexión a DB cerrada");
      });
    });
  } catch (error) {
    console.log("error es, ", error);
  }
};