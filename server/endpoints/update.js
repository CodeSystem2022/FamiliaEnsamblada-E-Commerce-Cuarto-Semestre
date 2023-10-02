const { functionMysql } = require("../utils/mysql");
const fs = require("fs");

exports.update = async (req, res) => {
  try {
    const { brand, model, quantity, accesories, price, id_product } = req.body;
    const conn = await functionMysql();
    const query =
      "UPDATE products SET brand = ?, model = ?, quantity = ?, accesories = ?, price = ? WHERE id_product = ? LIMIT 1";
    conn.query(
      query,
      [brand, model, quantity, accesories, price, id_product],
      async function (error, results, fields) {
        if (error) return res.status(304).json({ message: "error" });
        const productId = id_product;
        if (req.file) {
          const query = `SELECT * FROM products WHERE id_product = ?`;
          conn.query(
            query,
            [id_product],
            async function (error, results2, fields) {
              if (error) return res.status(304).json({ message: "error" });
              try {
                fs.unlinkSync(`./images/${results2[0].image}`);
              } catch (error) {}
              const image = req.file;
              const imageExtension = image.originalname.split(".").pop();
              const imageName = `${productId}.${imageExtension}`;
              await fs.promises.rename(image.path, `./images/${imageName}`);
              const updateQuery = `UPDATE products SET image = ? WHERE id_product = ?`;
              conn.query(
                updateQuery,
                [imageName, productId],
                function (error, results, fields) {
                  if (error) return res.status(304).json({ message: "error" });
                  res.status(200).json({ message: "ok" });
                  conn.end((err) => {
                    //   console.log("Conexión a DB cerrada");
                  });
                }
              );
            }
          );
        } else {
          res.status(200).json({ message: "ok" });
          conn.end((err) => {
            //   console.log("Conexión a DB cerrada");
          });
        }
      }
    );
  } catch (error) {
    console.log("error es, ", error);
  }
};
