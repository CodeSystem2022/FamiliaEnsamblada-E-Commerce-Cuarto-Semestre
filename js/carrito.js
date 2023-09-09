window.onload = function () {
  const listCart = document.querySelector("#listCart");
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.length === 0) return;
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
        <input type="number" class="form-control" style='width:90px' value='${
          !element.cartQuantity ? 1 : element.cartQuantity
        }'
        min='1' max='${element.quantity}' 
        >
    </div>
    </div>
    <div class="col-3">
    <span>$${element.price}</span>
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
};
// onchange='updateQuantity(${element.id_product},this.value)'
function deleteFromCart(id_product) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const newCart = cart.filter(
    (element) => parseInt(element.id_product) !== parseInt(id_product)
  );
  localStorage.setItem("cart", JSON.stringify(newCart));
  window.location.reload();
}
function updateQuantity(id_product, quantity2) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const productFound = cart.find(
    (element) => parseInt(element.id_product) === parseInt(id_product)
  );
  console.log(productFound);
  if (!productFound) return;
  if (quantity2 <= parseInt(productFound.quantity)) {
    productFound.cartQuantity = parseInt(quantity2);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  }
}
