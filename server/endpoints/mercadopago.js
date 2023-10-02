const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    "TEST-2481465225912260-041120-de681ea0041372deeb6828e1c26fe894-403652262",
});
exports.functionMercadoPago = (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],

    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
