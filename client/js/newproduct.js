const save = document.getElementById("save");
save.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const quantity = document.getElementById("quantity").value;
    const accesories = document.getElementById("accesories").value;
    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("quantity", quantity);
    formData.append("accesories", accesories);
    formData.append("image", document.getElementById("formFile").files[0]);
    fetch("http://localhost:3400/api/admin/save", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log("data es", data))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("error es", error);
  }
});
