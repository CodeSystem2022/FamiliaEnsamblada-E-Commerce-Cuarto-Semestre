let arrayProducts = [];
window.onload = async function () {
  try {
    const resp = await fetch("http://localhost:3400/api/list");
    const json = await resp.json();
    if (!json.data) return;
    arrayProducts = json.data;
    const divContainer = document.getElementById("colCard");
    json.data.forEach((element) => {
      const div = document.createElement("div");
      div.className = "col-md-4 mt-3 mb-3";
      div.innerHTML = `
        <div class="card h-100">
        <img src="http://localhost:3400/images/${element.image}" class="img-fluid card-img-top me-3 ms-3 mt-3 mb-3" style='width:60px'>
        <div class="card-body position-relative" style="padding-bottom:50px">
        <h5 class="card-title">${element.brand} ${element.model}</h5>
        <p class="card-text">${element.accesories}</p>
        <p class="card-text">$${element.price}</p>
        <button type="button" class="btn btn-primary  position-absolute mb-2 boton1"  onclick='addToCart(${element.id_product})' style="bottom:1px; left:10px;">Agregar</button>
        </div>
        </div>`;
      //
      divContainer.append(div);
    });
  } catch (error) {
    console.log("error ", error);
  }
};

function addToCart(product) {
  let state = false;
  const productFound = arrayProducts.find(
    (element) => parseInt(element.id_product) === parseInt(product)
  );
  if (!productFound) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productFoundInCart = cart.find(
    (element) => parseInt(element.id_product) === parseInt(product)
  );
  if (productFoundInCart) {
    // productFoundInCart.quantity += 1;
    cart.forEach((element) => {
      if (element.id_product === productFoundInCart.id_product) {
        if (parseInt(element.quantity) === parseInt(element.quantitySelected)) {
          alert("No hay mas stock");
          state = true;
          return;
        }
        if (element.quantitySelected) {
          element.quantitySelected = parseInt(element.quantitySelected) + 1;
        } else {
          element.quantitySelected = 1;
        }
      }
    });
    if (state) return;
    // console.log("cart", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Se sumo 1 en cantidad al producto");
    return;
  }
  productFound.quantitySelected = 1;
  cart.push(productFound);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Producto agregado al carrito");
}
