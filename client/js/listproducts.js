let arrayProducts = [];
let currentProduct = {};
async function getProducts() {
  try {
    const resp = await fetch("http://localhost:3400/api/list");
    const data = await resp.json();
    console.log("data es", data);
    const listGroup = document.getElementById("list-group");
    listGroup.innerHTML = "";
    if (!data.data) return;
    arrayProducts = data.data;
    data.data.forEach((product) => {
      const div = document.createElement("div");
      div.className = "list-group-item";
      div.innerHTML = `
        <div class="row">
          <div class="col-2">
            <img src="http://localhost:3400/images/${product.image}" alt="..." class="img-thumbnail">
          </div>
          <div class="col-6">
            <h5 class="mb-1">${product.brand} ${product.model}</h5>
            <p class="mb-1">Accesorios: ${product.accesories}</p>
            <p class="mb-1">Cantidad: ${product.quantity}</p>
            <p class="mb-1">Precio: $${product.price}</p>
          </div>
          <div class="col-4">
          <div class="d-flex justify-content-between align-items-center">
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="modal(${product.id_product})">Editar</button>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="setDelete(${product.id_product})">Eliminar</button>
          </div>
          </div>
        </div>
        `;
      listGroup.appendChild(div);
    });
  } catch (error) {
    console.log("error ", error);
  }
}

function modal(id_product) {
  console.log("arrayProducts es", arrayProducts);
  const product = arrayProducts.find(
    (product) => parseInt(product.id_product) === parseInt(id_product)
  );
  if (!product) return;
  currentProduct = product;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  modalBody.innerHTML = `
    <div class="col-md-12 mt-4 mx-auto d-block">
                    <!-- Input Brand -->
                    <div class="mb-3">
                      <label class="form-label">Brand</label>
                      <input
                        type="text"
                        class="form-control"
                        id="brand2"
                        placeholder="Type the brand"
                        value=${product.brand}
                      />
                    </div>
                    <!-- Cierre Brand -->
                    <!-- Input Model -->
                    <div class="mb-3">
                      <label class="form-label">Model</label>
                      <input
                        type="text"
                        class="form-control"
                        id="model2"
                        placeholder="Type the model"
                        value=${product.model}
                      />
                    </div>
                    <!-- Cierre Model -->
                    <!-- Input Quantity -->
                    <div class="mb-3">
                      <label class="form-label">Quantity</label>
                      <input
                        type="number"
                        class="form-control"
                        id="quantity2"
                        placeholder="Type the quantity"
                        value=${product.quantity}
                      />
                    </div>
                    <!-- Cierre Quantity -->
                    <!-- Input Price -->
                    <div class="mb-3">
                      <label class="form-label">Price</label>
                      <input
                        type="number"
                        class="form-control"
                        id="price2"
                        placeholder="Type the price"
                        value=${product.price}
                      />
                    </div>
                    <!-- Cierre Price -->
                    <!-- Input Model -->
                    <div class="mb-3">
                      <label  class="form-label">Accesories</label>
                      <textarea class="form-control" id="accesories2" rows="3" placeholder="Type the accesories"
                      value=
                      >${product.accesories}</textarea>
                    </div>
                    <!-- Imagen -->
                    <img src="http://localhost:3400/images/${product.image}" alt="..." class="img-thumbnail" style='width:60px'>
                    <div class="mb-3">
                      <label for="formFile" class="form-label"
                        >Image of product</label
                      >
                      <input class="form-control" type="file" id="formFile2" />
                    </div>
                    <!-- Cierre Imagen -->
                    <!-- Cierre Model -->
                    </div>
                    `;
}

// <button type="button" class="btn btn-primary" id="save">Save</button>
async function saveEdit() {
  try {
    const brand = document.getElementById("brand2").value;
    const model = document.getElementById("model2").value;
    const quantity = document.getElementById("quantity2").value;
    const accesories = document.getElementById("accesories2").value;
    const price = document.getElementById("price2").value;
    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("quantity", quantity);
    formData.append("accesories", accesories);
    formData.append("id_product", currentProduct.id_product);
    formData.append("price", price);
    formData.append("image", document.getElementById("formFile2").files[0]);
    const resp = await fetch("http://localhost:3400/api/admin/update", {
      method: "PUT",

      body: formData,
    });
    const data = await resp.json();
    console.log("data es", data);
    document.getElementById("btn-close-modal").click();
    getProducts();
  } catch (error) {
    console.log("error ", error);
  }
}

function setDelete(id_product) {
  console.log("111");
  const deleteProduct = document.getElementById("deleteProduct");
  const product = arrayProducts.find(
    (product) => parseInt(product.id_product) === parseInt(id_product)
  );
  if (!product) return;
  currentProduct = product;
  deleteProduct.innerHTML = "";
  deleteProduct.innerHTML = `<b>
  
  ${product.brand} ${product.model}
  </b>`;
}

async function deleteProduct() {
  try {
    const resp = await fetch("http://localhost:3400/api/admin/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_product: currentProduct.id_product,
      }),
    });
    const data = await resp.json();
    console.log("data es", data);
    document.getElementById("btn-close-modal2").click();
    getProducts();
  } catch (error) {
    console.log("error ", error);
  }
}
