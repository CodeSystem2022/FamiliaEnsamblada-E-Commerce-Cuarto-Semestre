let arrayProducts = [];
window.onload = async function () {
  try {
    console.log("hola")
    const resp = await fetch("http://localhost:3400/api/list");
    const json = await resp.json();
    console.log("json es: ",json)
    if (!json.data) return;
    arrayProducts = json.data;
    const divContainer = document.getElementById("colCard");
    json.data.forEach((element) => {
      const div = document.createElement("div");
      div.className = "col-md-4";
      div.innerHTML = `
        <div class="card" >
        <img src="http://localhost:3400/images/${element.image}" class="img-fluid card-img-top" style='width:60px'>
        <div class="card-body">
        <h5 class="card-title">${element.brand} ${element.model}</h5>
        <p class="card-text">${element.accesories}</p>
        <button type="button" class="btn btn-primary" onclick='addToCart(${element.id_product})'>Agregar</button>
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
