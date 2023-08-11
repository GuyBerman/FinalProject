const register = document.getElementById("register");
register.addEventListener("click", async () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const confirmPassword = document.getElementById("confirmpassword");

  // Password validation
  if (password.value !== confirmPassword.value) {
    alert("Password and Confirm Password do not match.");
    return;
  }

  // Send user registration data to the server
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

  // Clear input fields after successful registration
  email.value = "";
  password.value = "";
  firstname.value = "";
  lastname.value = "";
  confirmpassword.value="";
  alert("New user created successfully!");

});
