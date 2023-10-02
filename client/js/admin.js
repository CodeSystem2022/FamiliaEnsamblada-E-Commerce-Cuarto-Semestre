document.querySelector("#btnLogin").addEventListener("click", () => {
  const user = document.querySelector("#user").value;
  const password = document.querySelector("#pass").value;

  fetch("http://localhost:3400/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, password }),
  })
    .then((response) => {
      console.log("response es, ", response);
      if (response.status === 200) {
        // document.cookie = "loggedIn=true"; // set the cookie if the response status is 200
        document.cookie =
          "loggedIn=true; expires=Thu, 18 Dec 2030 12:00:00 UTC";
        window.location.href = "panel.html";
      } else {
        alert("Credenciales incorrectas");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred");
    });
});
