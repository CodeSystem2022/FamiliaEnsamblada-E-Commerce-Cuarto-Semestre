const { functionMysql } = require("../utils/mysql");
const fs = require("fs");
exports.save = async (req, res) => {
  try {
    // console.log("req file is, ", req.file);
    // console.log("req body is, ", req.body);

    const { brand, model, quantity, accesories } = req.body;

    const conn = await functionMysql();
    const query = `INSERT INTO products (brand, model, quantity, accesories) VALUES (?, ?, ?, ?)`;
    conn.query(
      query,
      [brand, model, quantity, accesories],
      async function (error, results, fields) {
        if (error) return res.status(304).json({ message: "error" });
        const productId = results.insertId;
        if (req.file) {
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

// const { functionMysql } = require("../utils/mysql");

// exports.save = async (req, res) => {
//   try {
//     const { brand, model, quantity, accesories } = req.body;

//     const conn = await functionMysql();
//     const query = `INSERT INTO products (brand, model, quantity, accesories) VALUES (?, ?, ?, ?)`;
//     conn.query(query, [brand, model, quantity, accesories], function (error, results, fields) {
//       if (error) return res.status(304).json({message:'error'})
//       res.status(200).json({ message: "ok" });
//       conn.end((err) => {
//         //   console.log("Conexión a DB cerrada");
//       });
//     });
//   } catch (error) {
//     console.log("error es, ", error);
//   }
// };
