const divNew = document.getElementById("new");
const divList = document.getElementById("list");

function newproduct() {
  divNew.style.display = "block";
  divList.style.display = "none";
}
function listproducts() {
  divNew.style.display = "none";
  divList.style.display = "block";
}
