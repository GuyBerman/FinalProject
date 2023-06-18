const register = document.getElementById("register");
register.addEventListener("click", async () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");

  await fetch("/api/createUser", {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      firstname: firstname.value,
      lastname: lastname.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  email.value = "";
  password.value = "";
  firstname.value = "";
  lastname.value = "";
});
