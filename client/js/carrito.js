window.onload = function () {
  const listCart = document.querySelector("#listCart");
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.length === 0) {
    listCart.innerHTML = `<h5><i>Carrito vacio</i></h5>`;
    document.querySelector("#btnComprar").style.display = "none";
    return;
  }
  // console.log("cart", cart);
  const div2 = document.createElement("li");
  div2.className = "list-group-item";
  div2.innerHTML = `

  <div class="row">
  <div class="col-4">
  <span><b>Producto</b></span>
  </div>
  <div class="col-3">
  <span><b>Cantidad</b></span>
  </div>
  <div class="col-3 d-flex justify-content-center">
  <span><b>Precio</b></span>
  </div>
  <div class="col-2">
  <span><b>Accion</b></span>
  </div>
  </div>
  `;
  listCart.append(div2);

  cart.forEach((element) => {
    const div = document.createElement("li");
    div.className = "list-group-item";
    div.innerHTML = `
    <div class="row">
    <div class="col-4">
    <span>${element.brand} ${element.model}</span> 
    
    </div>
    <div class="col-3">
    <div class="mb-3">
        <input type="number"  class="form-control" onkeydown="checkNumber(event, ${
          element.id_product
        }, this)" id="input-${
      element.id_product
    }" style='width:90px' onchange='updatePrice(${
      element.id_product
    },this.value)' value='${
      !element.quantitySelected ? 1 : element.quantitySelected
    }'
        min='1' max='${element.quantity}' 
        >
    </div>
    </div>
    <div class="col-3 d-flex justify-content-center">
    <span id="${element.id_product}">$${
      element.quantitySelected * element.price
    }</span>
    </div>
        <div class="col-2">
             <button type="button" class="btn btn-danger" style='align-self:center' onclick='deleteFromCart(${
               element.id_product
             })'>X</button>
      </div>
    </div>
    </div>
   
      
        
      

        `;

    listCart.append(div);
  });
  getTotal();
};
function deleteFromCart(id_product) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const newCart = cart.filter(
    (element) => parseInt(element.id_product) !== parseInt(id_product)
  );
  localStorage.setItem("cart", JSON.stringify(newCart));
  window.location.reload();
}

function updatePrice(id_product, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const productFound = cart.find(
    (element) => parseInt(element.id_product) === parseInt(id_product)
  );
  if (!productFound) return;

  cart.forEach((element) => {
    if (element.id_product === id_product) {
      element.priceTotal = element.price * quantity;
      element.quantitySelected = quantity;
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById(id_product).innerHTML = `$${productFound.priceTotal}`;
  getTotal();
}
function getTotal() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let total = 0;
  cart.forEach((element) => {
    total += element.price * element.quantitySelected;
  });
  document.getElementById("total").innerHTML = `Total: $${total}`;
}
