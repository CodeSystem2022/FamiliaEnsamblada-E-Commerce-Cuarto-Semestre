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
        <button type="button" class="btn btn-primary mx-auto d-block  mb-2"  onclick='addToCart(${element.id_product})' style="bottom:10px; left:0px">Agregar</button>
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
  const productFound = arrayProducts.find(
    (element) => parseInt(element.id_product) === parseInt(product)
  );
  if (!productFound) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productFound);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Producto agregado al carrito");
}
