if (!document.cookie.includes("loggedIn=true")) {
  // redirect to admin.html
  window.location.href = "admin.html";
}

document.querySelector("#btnLogout").addEventListener("click", () => {
  // delete the cookie by setting its expiration date to a past date
  document.cookie =
    "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/client;";
  //Cambiar el path cuando este en produccion
  // redirect to the login page
  window.location.href = "admin.html";
});
