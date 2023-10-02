const mercadopago = new MercadoPago(
  "TEST-e1fe11ca-79a5-4117-be9a-28bdddc30ead",
  {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  }
);

document.getElementById("btnComprar").addEventListener("click", function () {
  $("#btnComprar").attr("disabled", true);

  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const orderData = {
    quantity: 1,
    description: "Productos",
    price: cartItems.reduce(
      (acc, item) => acc + item.price * item.quantitySelected,
      0
    ),
  };

  fetch("http://localhost:3400/api/mercadopago", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (preference) {
      createCheckoutButton(preference.id);
    })
    .catch(function () {
      alert("Unexpected error");
      $("#checkout-btn").attr("disabled", false);
    });
});

function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  const bricksBuilder = mercadopago.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create(
      "wallet",
      "button-checkout", // class/id where the payment button will be displayed
      {
        initialization: {
          preferenceId: preferenceId,
        },
        callbacks: {
          onError: (error) => console.error(error),
          onReady: () => {},
        },
      }
    );
  };
  window.checkoutButton = renderComponent(bricksBuilder);
}
